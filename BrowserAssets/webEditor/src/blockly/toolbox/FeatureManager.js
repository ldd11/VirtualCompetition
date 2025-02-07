import { xml2js, js2xml } from 'xml-js';
import xml from './toolbox.xml';
import featureToolbox from './featureToolbox';
import BlockFuncApi from '@/runtime/BlockFuncApi';
import { JS_UNITY_CMD } from '@/utils/NativeCall';
import EventUtil from '@/utils/EventUtil';
import { EDITOR_CALL } from '@/runtime/constant/index';
import { editorStore, projectStore } from '@/store/index';
import userBlockController from '@/controller/userBlockController';
import robotMax2Xml from './RobotMax2.xml';
import extensions from '@/blockly/toolbox/extensions/index';

class FeatureManager {
  featureRespCallbacks = {};

  robotDogType = '';

  robotName = '';

  featureToolboxs = {};

  forbidCategories = [];

  forbidBlocks = [];

  curToolbox = '';

  presetToolbox = '';

  presetUserBlock = '';
  
  robotType2Runtime = {
    RobotMaxSeries: 'RobotMaxRuntime',
    RobotGogoSeries: 'RobotGogoRuntime',
    RobotQQCarSeries: 'RobotCarRuntime',
    RobotPlanetSeries: 'RobotPlanetRuntime',
    RobotDroneSeries: 'RobotDroneRuntime',
  };

  clearFeature = () => {
    this.featureToolboxs = {};
  }

  registerFeature(name, toolbox, insertMark) {
    console.log(`[Featuremanager.registerFeature] resgister ${name}`);
    if (!this.featureToolboxs[name]) {
      this.featureToolboxs[name] = { toolbox, insertMark };
    }
  }

  initialize = () => {
    EventUtil.on(EDITOR_CALL.RESP_FEATURE_PEMISSION, this.handleRespFeaturePermission);
  }

  unInitialize = () => {
    EventUtil.off(EDITOR_CALL.RESP_FEATURE_PEMISSION, this.handleRespFeaturePermission);
  }

  getRobotRuntimeName() {
    return this.robotType2Runtime[this.robotDogType] || 'RobotMaxRuntime';
  }

  setFeaturePermission = (robotType,robotName, featureMap, blocks, categories, toolbox, userBlock) => {

    console.log('robotDogType and type', this.robotDogType, robotType, featureMap);
    
    this.robotName = robotName;
    
    EventUtil.emit(EDITOR_CALL.UPDATE_SHOW_EXTENSION_PARAMS, { robotType, toolbox });

    if (this.robotDogType !== robotType) {
      this.robotDogType = robotType;
      if (featureMap) {
        this.updateFeaturePermission(featureMap);
      }
    }

    this.setForbidBlocks(blocks);
    this.setForbidCategories(categories);

    this.presetToolbox = toolbox;
    editorStore.setPresetToolbox(toolbox);

    this.presetUserBlock = userBlock;
    editorStore.setPresetUserBlock(userBlock);

    EventUtil.emit(EDITOR_CALL.UPDATE_TOOLBOX_AND_XML);
  }

  setRobotType(type, featureMap) {
    console.log(`[FeatureManager.setRobotType] ${type}`);

    console.log(`robotDogType and type ${this.robotDogType} ${type} ${featureMap ? Object.keys(featureMap).length : ''}`, featureMap);

    if (this.robotDogType !== type) {
      this.robotDogType = type;

      if (featureMap) {
        this.updateFeaturePermission(featureMap);
      }
      EventUtil.emit(EDITOR_CALL.REFRESH_FEATURE_PERMISSIONS);
    }
  }

  setForbidCategories(categories) {
    this.forbidCategories = !categories ? [] : categories.split(',');
  }

  setForbidBlocks(blocks) {
    this.forbidBlocks = !blocks ? [] : blocks.split(',');
  }

  queryFeaturePermission(featureName) {
    // const isDebug = window.location.host.includes('localhost') && featureName === 'RobotGogo';
    return new Promise((resolve, reject) => {
      console.log(
        '[FeatureManager].queryFeaturePermission: call query feature permission'
      );
      // if (isDebug) {
      //   resolve(true);
      // }
      BlockFuncApi.callUnityApi(
        JS_UNITY_CMD.QueryFeaturePermission,
        featureName
      );
      const timeout = setTimeout(() => {
        this.featureRespCallbacks[featureName] = null;
        console.log('[FeatureManager] query permission timeout');
        reject();
      }, 5000);
      this.featureRespCallbacks[featureName] = (result) => {
        clearTimeout(timeout);
        resolve(result);
      };
    });
  }

  handleRespFeaturePermission = (data) => {
    console.log('[FeatureManager.handleRespFeaturePermission]');
    const { feature, permission } = data;
    const cb = this.featureRespCallbacks[feature];
    if (cb) {
      console.log('[FeatureManager.handleRespFeaturePermission] cb called');
      cb(permission);
      this.featureRespCallbacks[feature] = null;
    }
  };

  updateFeaturePermission = (map) => {
    console.log('[FeatureManager] update feature permission');
    const keys = Object.keys(map);
    const len = keys.length;
    projectStore.clearPermission();

    for (let i = 0; i < len; ++i) {
      const key = keys[i];
      const hasPermission = map[key];
      projectStore.setPermission(key, hasPermission);
    }

    this.clearFeature();

    featureToolbox.forEach((item) => {
      const { feature, toolbox, insertMark } = item;
      const hasPermission = projectStore.permissionDict[feature];
      if (hasPermission) {
        var tool=toolbox;
        if(this.robotName=="RobotMax2"&&feature=='RobotMaxSeries')
        {
          tool=robotMax2Xml;
        }
        
        //console.log(`[FeatureManager.setRobotType] ${this.robotName}`);
        this.registerFeature(feature, tool, insertMark);
      }
    });
  };

  initFeaturePermissions() {
    this.clearFeature();
    projectStore.clearPermission();

    return Promise.all(
      featureToolbox.map((item) => {
        const { feature, toolbox, insertMark } = item;
        return this.queryFeaturePermission(feature).then((hasPermission) => {
          projectStore.setPermission(feature, hasPermission);
          if (hasPermission) {
            this.registerFeature(feature, toolbox, insertMark);
          }
        });
      })
    );
  }

  combineToolbox(srcToolbox, subToolbox, insertMark) {
    if (insertMark) {
      return srcToolbox.replace(`<${insertMark}></${insertMark}>`, subToolbox);
    }
    const index = srcToolbox.lastIndexOf('</xml>');
    return `${srcToolbox.substring(0, index) + subToolbox}</xml>`;
  }

  combineFeatureExtensionsToolbox() {
    let extensionInfo = JSON.parse(JSON.stringify(extensions));
    if (this.forbidCategories.length > 0) {
      const xmlElement = extensions[0].categories;
      extensionInfo[0].categories = xmlElement.filter(blockElement => {
        return !this.forbidCategories.includes(blockElement.name);
      });
    }
    if (this.forbidBlocks.length > 0) {
      const categoriesList = extensionInfo[0].categories;
  
      for (let i = 0; i < categoriesList.length; i++) {
          const categoryElement = categoriesList[i];
  
          // 将 XML 转换为 JavaScript 对象
          const toolboxJsObj = xml2js(categoryElement.xml);
          const xmlElement = toolboxJsObj.elements[0];
          // 遍历对象并删除包含在 this.forbidBlocks 数组中的元素
          for (let j = 0; j < xmlElement.elements.length; j++) {
              const categoryElement = xmlElement.elements[j];
              if (categoryElement.name != 'category') {
                continue;
              }

              for (let m = categoryElement.elements.length - 1; m >= 0; m--) {
                const blockElement = categoryElement.elements[m];
                if (blockElement.name != 'block') {
                  continue;
                }
    
                if (this.forbidBlocks.includes(blockElement.attributes.type)) {
                  categoryElement.elements.splice(m, 1);
                }
              }
          }
          // 将修改后的对象转换回 XML 并赋值给 xml 字段
          categoryElement.xml = js2xml(toolboxJsObj);

      }
    }
    return extensionInfo;
  }

  combineFeatureToolbox() {
    if (this.presetToolbox != '') {
      userBlockController.setUserBlockData(this.presetUserBlock);
      return this.presetToolbox;
    }

    if (this.robotDogType === 'RobotPlanetSeries') {
      this.curToolbox = this.featureToolboxs.RobotPlanetSeries.toolbox;
      return this.featureToolboxs.RobotPlanetSeries.toolbox;
    }

    const keys = Object.keys(this.featureToolboxs);
    const len = keys.length;
    let finalToolbox = xml;

    // 调试积木块
    if (this.robotDogType === 'RobotDroneSeries') {
      finalToolbox = finalToolbox.replace(/<!-- setRobotInitialPosBegin -->([\s\S]*?)<!-- setRobotInitialPosEnd -->/g, "");
    }
    else {
      finalToolbox = finalToolbox.replace(/<!-- setRobotDroneInitialPosBegin -->([\s\S]*?)<!-- setRobotDroneInitialPosEnd -->/g, "");
    }

    for (let i = 0; i < len; i += 1) {
      const item = this.featureToolboxs[keys[i]];
      const { toolbox, insertMark } = item;
      finalToolbox = this.combineToolbox(finalToolbox, toolbox, insertMark);
    }

    if (this.forbidCategories.length > 0 || this.forbidBlocks.length > 0) {
      
      const toolboxJsObj = xml2js(finalToolbox);
      const xmlElement = toolboxJsObj.elements[0];

      for (let i = xmlElement.elements.length - 1; i >= 0; i--) {
        const categoryElement = xmlElement.elements[i];
        if (categoryElement.name != 'category') {
          continue;
        }

        if (this.forbidCategories.includes(categoryElement.attributes.name)) {
          xmlElement.elements.splice(i, 1);
        } else {
          for (let j = categoryElement.elements.length - 1; j >= 0; j--) {
            const blockElement = categoryElement.elements[j];
            if (blockElement.name != 'block') {
              continue;
            }

            if (this.forbidBlocks.includes(blockElement.attributes.type)) {
              categoryElement.elements.splice(j, 1);
            }
          }
        }
      }

      finalToolbox = js2xml(toolboxJsObj);
    }
    this.curToolbox = finalToolbox;
    console.log(`final toolbox: ${finalToolbox}`);
    return finalToolbox;
  }
}

export default new FeatureManager();
