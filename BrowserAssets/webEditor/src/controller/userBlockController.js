const USER_FUNCTION_TYPE_HEAD = 'lesson_user_';

class UserBlockController {
  constructor() {
    this.userBlockList = [];
    this.userBlockData = '[]';
    this.userFunctionCode = '';
    this.userFunctionXml = '<xml></xml>';
    this.hiddenWorkspace = null;
    this.codeLanguage = '';
    this.specialDealCodeFunc = null;
    this.userBlockDefineList = [];
  }

  setUserBlockData(userBlockListData, codeLanguage = 'JavaScript', specialDealCodeFunc = null) {
    this.codeLanguage = codeLanguage;
    this.specialDealCodeFunc = specialDealCodeFunc;
    const codeLanguageRet = this.getCodeLanguage();
    if (!codeLanguageRet) {
      this.userBlockList = [];
      this.userFunctionCode = '';
      this.userFunctionXml = '<xml></xml>';
      this.specialDealCodeFunc = null;
      this.userBlockDefineList = [];
      return;
    }
    this.userBlockData = userBlockListData || '[]';
    this.userBlockList = JSON.parse(this.userBlockData);
    this.userBlockList.forEach((userBlock) => {
      if (userBlock.functionData) {
        const defCode = this.defineFunctionBlock(userBlock.functionData);
        const stubCode = this.generateFunctionBlockStub(userBlock.functionData, userBlock.isSyncFunc);
        this.userBlockDefineList.push({
          defCode,
          stubCode
        });
      }
    });
  }

  getUserBlockData() {
    return this.userBlockData;
  }

  getUserBlockList() {
    return this.userBlockList;
  }

  getUserFunctionCode() {
    this.parseUserBlockData();
    return this.userFunctionCode;
  }

  getUserFunctionXml() {
    this.parseUserBlockData();
    return this.userFunctionXml;
  }

  getUserBlockDefineList() {
    return this.userBlockDefineList;
  }

  getRunCode() {
    let runCode = this.getUserFunctionCode();
    if (runCode) {
      runCode += '\r\n';
    }
    return runCode;
  }

  getRunCodeFromXml(srcXml) {
    const userFunctionXml = this.getUserFunctionXml();
    const specialDealCodeFunc = this.getSpecialDealCodeFunc();
    console.log('[UserBlockController][getRunCodeFromXml] srcXml:', srcXml);
    console.log('[UserBlockController][getRunCodeFromXml] userFunctionXml:', userFunctionXml);
    const srcXmlDom = Blockly.Xml.textToDom(srcXml);
    const userXmlDom = Blockly.Xml.textToDom(userFunctionXml);

    const hiddenWorkspace = this.getHiddenWorkspace();
    hiddenWorkspace.clear();
    Blockly.Xml.appendDomToWorkspace(userXmlDom, hiddenWorkspace);
    Blockly.Xml.appendDomToWorkspace(srcXmlDom, hiddenWorkspace);
    const runXml = this.getBlocksXmlFromWorkspace(hiddenWorkspace);
    console.log('[UserBlockController][getRunCodeFromXml] runXml:', runXml);
    let runCode = this.workspaceToCode(hiddenWorkspace);
    if (specialDealCodeFunc) {
      runCode = specialDealCodeFunc(runCode);
    }
    hiddenWorkspace.clear();

    return runCode;
  }

  getRunXml(srcXml) {
    const userFunctionXml = this.getUserFunctionXml();
    console.log('[UserBlockController][getRunXml] srcXml:', srcXml);
    console.log('[UserBlockController][getRunXml] userFunctionXml:', userFunctionXml);
    const srcXmlDom = Blockly.Xml.textToDom(srcXml);
    const userXmlDom = Blockly.Xml.textToDom(userFunctionXml);

    const hiddenWorkspace = this.getHiddenWorkspace();
    hiddenWorkspace.clear();
    Blockly.Xml.appendDomToWorkspace(userXmlDom, hiddenWorkspace);
    Blockly.Xml.appendDomToWorkspace(srcXmlDom, hiddenWorkspace);
    const runXml = this.getBlocksXmlFromWorkspace(hiddenWorkspace);
    console.log('[UserBlockController][getRunXml] runXml:', runXml);
    hiddenWorkspace.clear();

    return runXml;
  }


  /**
  * private
  */
  getHiddenWorkspace() {
    if (!this.hiddenWorkspace) {
      this.hiddenWorkspace = this.createHiddenWorkspace();
    }
    return this.hiddenWorkspace;
  }

  getBlocksXmlFromWorkspace(blocklyWorkspace) {
    if (blocklyWorkspace == null) {
      return '';
    }

    const blocksXml = Blockly.Xml.workspaceToDom(blocklyWorkspace, true);
    if (blocksXml == null) {
      return '';
    }

    return Blockly.Xml.domToText(blocksXml);
  }

  generateUserFunctionData(userFunctionBlockList) {
    const hiddenWorkspace = this.getHiddenWorkspace();
    hiddenWorkspace.clear();
    userFunctionBlockList.forEach((userBlock) => {
      const dom = Blockly.Xml.textToDom(`<xml xmlns="http://www.w3.org/1999/xhtml">${userBlock.srcCode}</xml>`);
      // eslint-disable-next-line no-cond-assign
      for (let i = 0, blockDom; blockDom = dom.children[i]; i += 1) {
        if (blockDom.tagName === 'block') {
          // eslint-disable-next-line no-cond-assign
          for (let j = 0, item; item = blockDom.children[j]; j += 1) {
            if ((item.tagName.toLowerCase() === 'field') && (item.getAttribute('name').toLowerCase() === 'name')) {
              item.textContent = this.generateUserFunctionBlockType(userBlock.functionData.functionName);
              break;
            }
          }
          break;
        }
      }
      Blockly.Xml.appendDomToWorkspace(dom, hiddenWorkspace);
    });
    const data = {
      code: this.workspaceToCode(hiddenWorkspace),
      xml: this.getBlocksXmlFromWorkspace(hiddenWorkspace)
    };
    hiddenWorkspace.clear();
    return data;
  }

  workspaceToCode(workspace) {
    if (!workspace) {
      return '';
    }

    const codeLanguage = this.getCodeLanguage();
    console.log('[UserBlockController][workspaceToCode] codeLanguage:', codeLanguage);
    if (!Blockly[codeLanguage]) {
      console.error('[UserBlockController][workspaceToCode] Blockly not define codeLanguage');
      return '';
    }

    let code = '';
    try {
      code = Blockly[codeLanguage].workspaceToCode(workspace, true);
    } catch (err) {
      console.error('[UserBlockController][workspaceToCode] error:', err);
    }

    return code;
  }

  createHiddenWorkspace() {
    // Create hidden workspace to load saved XML to generate toolbox XML.
    const hiddenBlocks = document.createElement('div');
    // Generate a globally unique ID for the hidden div element to avoid
    // collisions.
    const hiddenBlocksId = Blockly.utils.genUid();
    hiddenBlocks.id = hiddenBlocksId;
    hiddenBlocks.style.display = 'none';
    document.body.appendChild(hiddenBlocks);
    return Blockly.inject(hiddenBlocksId, {
      media: 'https://coding.qq.com/thirdparty/blockly/1.0.1/media/',
    });
  }

  defineFunctionBlock(functionData) {
    const blockDefJson = {
      message0: functionData.functionName,
      args0: [],
      inputsInline: true,
      colour: '#69c12e',
    };
    blockDefJson.message0 += '( ';
    if (Object.prototype.hasOwnProperty.call(functionData, 'argsList')) {
      for (let i = 0; i < functionData.argsList.length; i += 1) {
        blockDefJson.message0 += `${functionData.argsList[i]}:`;
        blockDefJson.message0 += ' %';
        blockDefJson.message0 += i + 1;
        blockDefJson.message0 += ' ,';
        const arg = {
          type: 'input_value',
          name: this.generateArgName(i),
        };
        blockDefJson.args0.push(arg);
      }
    } else {
      for (let i = 0; i < functionData.argsCount; i += 1) {
        blockDefJson.message0 += ' %';
        blockDefJson.message0 += i + 1;
        const arg = {
          type: 'input_value',
          name: this.generateArgName(i),
        };
        blockDefJson.args0.push(arg);
      }
    }
    blockDefJson.message0 = blockDefJson.message0.slice(0, -1);
    blockDefJson.message0 += ')';
    if (!functionData.returnValue) {
      blockDefJson.previousStatement = null;
      blockDefJson.nextStatement = null;
    }

    const defCode = `Blockly.Blocks.${this.generateUserFunctionBlockType(functionData.functionName)} = { init() { this.jsonInit(${JSON.stringify(blockDefJson)});} };`;
    try {
      eval(defCode);
    } catch (error) {
      console.warn('[UserBlockController][defineFunctionBlock] error', error);
    }

    return defCode;
  }

  generateFunctionBlockStub(functionData, isSyncFunc) {
    const codeLanguage = this.getCodeLanguage();
    let stubCode = `Blockly.${codeLanguage}.${this.generateUserFunctionBlockType(functionData.functionName)} = function (block) { `;
    for (let i = 0; i < functionData.argsCount; i += 1) {
      const argName = this.generateArgName(i);
      let argCode = 'const ';
      argCode += argName;
      argCode += ` = Blockly.${codeLanguage}.valueToCode(block, '`;
      argCode += argName;
      argCode += `', Blockly.${codeLanguage}.ORDER_NONE);`;
      stubCode += argCode;
    }
    stubCode += 'const code = `';
    if (isSyncFunc && this.checkIsSupportASyncFunc()) {
      stubCode += 'yield return ';
    }
    stubCode += `${this.generateUserFunctionBlockType(functionData.functionName)}(`;
    const argParamList = [];
    for (let i = 0; i < functionData.argsCount; i += 1) {
      let argCode = '${';
      argCode += this.generateArgName(i);
      argCode += '}';
      argParamList.push(argCode);
    }
    stubCode += argParamList.toString();
    stubCode += ');\n`;';
    stubCode += 'return code; };';// `return [code, Blockly.${codeLanguage}.ORDER_FUNCTION_CALL]; };`;
    try {
      eval(stubCode);
    } catch (error) {
      console.warn('[UserBlockController][generateFunctionBlockStub] error', error);
    }
    return stubCode;
  }

  generateArgName(index) {
    let argName = 'arg';
    argName += (index + 1).toString();
    return argName;
  }

  generateUserFunctionBlockType(functionName) {
    return USER_FUNCTION_TYPE_HEAD + functionName;
  }

  getCodeLanguage() {
    if (this.codeLanguage) {
      return this.codeLanguage;
    }
    return 'JavaScript';
    // const { codeLanguage } = IdeCommonStore;
    // return CodeLanguageMap[codeLanguage].blockly;
  }

  getSpecialDealCodeFunc() {
    if (this.specialDealCodeFunc) {
      return this.specialDealCodeFunc;
    }
    return null;
    // const { projectModeDataMap, projectMode } = IdeCommonStore;
    // return projectModeDataMap[projectMode].userCodeTrainsform;
  }

  parseUserBlockData() {
    const userFunctionBlockList = [];
    this.userBlockList.forEach((userBlock) => {
      if (userBlock.functionData) {
        userFunctionBlockList.push(userBlock);
      }
    });
    const userFunctionData = this.generateUserFunctionData(userFunctionBlockList);
    this.userFunctionCode = userFunctionData.code;
    this.userFunctionXml = userFunctionData.xml;
    const specialDealCodeFuncRet = this.getSpecialDealCodeFunc();
    if (specialDealCodeFuncRet) {
      this.userFunctionCode = specialDealCodeFuncRet(this.userFunctionCode);
    }
  }

  checkIsSupportASyncFunc() {
    return true;
    // const { projectModeDataMap, projectMode } = IdeCommonStore;
    // const projectModeData = projectModeDataMap[projectMode];
    // return Boolean(projectModeData.hasAsyncFunction);
  }
}

export default new UserBlockController();
