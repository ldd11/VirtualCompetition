import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Tree } from 'tdesign-react/lib/';
import 'tdesign-react/dist/tdesign.css';
import { Icon } from 'tdesign-icons-react';
import { generateIconName, isEqualArray, nameValidate } from '@/utils/NameUtil';
import {
  findTreeItemElement,
  getElementPosition, NewInputDom, scrollIntoViewById, throttle
} from '@/utils/domUtil';
import { jsCallNative, JS_UNITY_CMD } from '@/utils/NativeCall';
import EventUtil from '@/utils/EventUtil';
import { EventMsg } from '@/utils/EventMsg';
import TreeDataController from '@/controller/TreeDataController';
import { GROUP, ErrorClassName } from '@/config/TypeConfig';
import Empty from '../Empty/index';
import RightMenu from '../RightMenu/index';
import ToolTips from '../ToolTips/index';
import '../../assets/style/variables.less';

const CustomUrlIconFont = ({ name, size, style }) => (
  <Icon
    name={name}
    size={size}
    style={style}
    url="https://cdn3.codesign.qq.com/icons/akv8398Ld29nKeg/latest/iconfont.js"
  />
);

let editTarget;
let editTargetParent;
let inputObj;
let ctrlPressed = false;

@inject('TreeDataStore')
@observer
class TreeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastClickTime: 0,
      Multiple: false,
      selectedItem: '',
      selectedItems: [],
      showRightMenu: false,
      showPack: false,
      showDelete: false,
      showRename: false,
      showUnpack: false,
      rx: 0,
      ry: 0,
      editing: false,
      showErrorTip: false,
      errorTip: '',
      errorTipLeft: 0,
      errorTipTop: 0,
      activable: true,
    };

    this.handleInputBlur = this.throttleHandleBlur.bind(this);
  }

  componentDidMount() {
    document.onmousedown = this.onBodyMouseDown;
    EventUtil.on(EventMsg.SELECT_ITEM, this.forceSelectItem);
    EventUtil.on(EventMsg.ADD_ITEM, this.forceAddItem);
    EventUtil.on(EventMsg.REMOVE_ITEM, this.forceRemoveItem);
    EventUtil.on(EventMsg.UPDATE_ITEM_LABEL, this.forceUpdateItemLabel);
    EventUtil.on(EventMsg.UPDATE_CTRL_STATUS, this.forceUpdateCtrlStatus);
    EventUtil.on(EventMsg.UPDATE_SCENE_DRAG_STATUS, this.updateSceneDragFlag);

    // handle keyboard events when page losing focus（only for win）
    // 按住key，win系统持续响应，mac系统只响应一次
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleBlur);
    window.addEventListener('focus', this.handleFocus);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.SELECT_ITEM, this.forceSelectItem);
    EventUtil.off(EventMsg.ADD_ITEM, this.forceAddItem);
    EventUtil.off(EventMsg.REMOVE_ITEM, this.forceRemoveItem);
    EventUtil.off(EventMsg.UPDATE_ITEM_LABEL, this.forceUpdateItemLabel);
    EventUtil.off(EventMsg.UPDATE_CTRL_STATUS, this.forceUpdateCtrlStatus);
    EventUtil.off(EventMsg.UPDATE_SCENE_DRAG_STATUS, this.updateSceneDragFlag);

    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('blur', this.handleBlur);
    window.removeEventListener('focus', this.handleFocus);
  }

  forceSelectItem = (data) => {
    this.closeInputEditing();
    const { id, isExpand, multiFlag } = data;
    this.setState({
      Multiple: multiFlag,
      showRightMenu: false
    });

    const { selectedItems } = this.state;
    if (!isEqualArray(selectedItems, id)) {
      console.log('execute unity force select');
      if (isExpand) scrollIntoViewById(id);
      this.setState({
        selectedItem: id.length ? id[id.length - 1] : '',
        selectedItems: [...id]
      });
    }
  }

  forceAddItem = (data) => {
    const { TreeDataStore } = this.props;
    const { treeRef } = TreeDataStore;
    treeRef.current.appendTo('', data);
  }

  forceRemoveItem = (data) => {
    const { TreeDataStore } = this.props;
    const { treeRef } = TreeDataStore;
    data.forEach(id => treeRef.current.remove(id));
  }

  forceUpdateItemLabel = (data) => {
    const { id, label } = data;
    const node = this.getNodeById(id);
    node?.setData({ label });
    // Tdesign bug
    this.forceUpdate();
  }

  forceUpdateCtrlStatus = (data) => {
    const focusEvent = new Event('focus');
    window.dispatchEvent(focusEvent);
    const { ctrlKey } = data;
    ctrlPressed = ctrlKey;
  }

  closeInputEditing = () => {
    const { selectedItem, editing } = this.state;
    if (editing) {
      const node = this.getNodeById(selectedItem);
      this.domRemoveInput(node, editTarget, inputObj.value.trim());
      node.setData({ label: editTarget.textContent });
      this.setState({
        editing: false
      });
      this.hideErrorTip();
    }
  }

  updateSceneDragFlag = (data) => {
    const { sceneDrag } = data;
    this.setState({
      activable: !sceneDrag
    });
  }

  handleKeyDown = (event) => {
    const keyName = navigator.platform.match('Mac') ? ['Meta', 'Control'] : ['Control'];
    if (event.key !== '' && keyName.includes(event.key) && !ctrlPressed) {
      // console.log('treeview page keydown ctrl');
      ctrlPressed = true;
    }
  }

  handleKeyUp = (event) => {
    const keyName = navigator.platform.match('Mac') ? ['Meta', 'Control'] : ['Control'];
    if (event.key !== '' && keyName.includes(event.key)) {
      // console.log('treeview page keyup ctrl');
      ctrlPressed = false;
    }
  }

  handleBlur = () => {
    // console.log('treeview page blur');
    ctrlPressed = false;
    this.closeInputEditing();
  }

  handleFocus = () => {
    // console.log('treeview page focus');
  }

  checkConnected = (str) => {
    const { selectedItems } = this.state;
    let arr = [...selectedItems];
    const index = arr.indexOf(str);
    if (arr.length == 1 && index == 0) return;
    let plus = false;// 是否是减选
    if (index !== -1) {
      arr.splice(index, 1);
      plus = true;
    } else {
      arr = [...arr, str];
    }

    // 去重
    arr = Array.from(new Set(arr));

    if (arr.length === 0) {
      this.updateSelectedItems(arr, str, plus);
      return;
    }

    if (arr.length === 1) {
      this.updateSelectedItems(arr, arr[0], false);
      return;
    }

    const that = this;
    const cb = (ret) => {
      if (ret) {
        // console.log('数据是连贯的');
        that.updateSelectedItems(arr, str, plus);
      } else {
        // console.log('3d中非连贯数据不可多选');
      }
    };
    TreeDataController.isConnected(arr, cb);
  }

  updateSelectedItems = (arr, str, plus) => {
    this.setState({
      selectedItem: plus ? '' : str,
      selectedItems: [...arr]
    });

    TreeDataController.selectedItems(arr, true);
  }

  handleClick = (context) => {
    // 没有双击事件，只能通过这个模拟,一般都是300ms范围做判读
    const currentTime = new Date().getTime();
    const { lastClickTime, editing } = this.state;
    if (currentTime - lastClickTime < 300) {
      if (editing) return;
      // console.log('Double clicked!');
      const node = this.getNodeById(context.node.value);
      const innerSpan = this.findEditSpan(node.value);
      if (innerSpan) { this.switchEditing(innerSpan, node); }
    } else {
      // console.log('Single clicked');
    }

    this.setState({
      lastClickTime: currentTime,
    });
  };

  handleActive = (value, context) => {
    const { editing } = this.state;
    if (editing || value.length === 0) return;

    const isCtrl = navigator.platform.match('Mac') ? context.e.ctrlKey || context.e.metaKey : ctrlPressed;
    this.setState({
      Multiple: isCtrl,
    });

    console.info('onActive', value, context, isCtrl);

    if (isCtrl) {
      this.handleMultiSelect(context.node);
    } else {
      this.handleSingleSelect(context.node);
    }
  };

  handleSingleSelect = (targetNode) => {
    this.setState({
      selectedItem: targetNode.value,
      selectedItems: [targetNode.value]
    });
    jsCallNative(JS_UNITY_CMD.TreeViewSelectUnit,
      { datas: [Object.assign({}, targetNode.data)], multiFlag: false });
  };

  handleMultiSelect = (targetNode) => {
    const { selectedItems } = this.state;
    if (selectedItems.length > 0) {
      // 已入选节点的层级
      const node = this.getNodeById(selectedItems[0]);
      // 当前待入选节点层级对比
      if (node.getLevel() !== targetNode.getLevel()) {
        // console.log('非同层级数据不可多选');
        jsCallNative(JS_UNITY_CMD.TreeViewErrorToast, { content: '非同层级数据不可多选' });
        return;
      }

      if (node.getParent() !== targetNode.getParent()) {
        // console.log('跨组数据不可多选');
        jsCallNative(JS_UNITY_CMD.TreeViewErrorToast, { content: '跨组数据不可多选' });
        return;
      }
      this.checkConnected(targetNode.value);
    } else {
      this.setState({
        selectedItem: targetNode.value,
        selectedItems: [targetNode.value]
      });
      jsCallNative(JS_UNITY_CMD.TreeViewSelectUnit,
        { datas: [Object.assign({}, targetNode.data)], multiFlag: true });
    }
  }

  handleRightClick = (e) => {
    e.preventDefault();

    const { selectedItems, editing, activable } = this.state;
    if (!activable) return;
    // 不允许多选同时右键，且兼容mac系统ctrl+点击触发右键菜单功能
    if (navigator.platform.match('Mac')) {
      if (e.ctrlKey) {
        if (e.target.classList.contains('t-tree')) {
          return;
        }
        const targetDom = findTreeItemElement(e.target, 't-tree__item');
        if (!targetDom) return;
        const id = targetDom.dataset.value;
        if (!id) return;
        const targetNode = this.getNodeById(id);
        if (!targetNode) return;

        if (!ctrlPressed) {
          this.setState({
            Multiple: false,
          });
          this.handleSingleSelect(targetNode);
        } else {
          this.setState({
            Multiple: true,
          });
          this.handleMultiSelect(targetNode);
        }
        return;
      }
    } else if (ctrlPressed) return;
    // console.log('Right clicked!');
    if (selectedItems.length <= 0 || editing) return;
    this.showRMenu(e.clientX, e.clientY, selectedItems);
  }

  showRMenu = (x, y, datas) => {
    const menuOpts = TreeDataController.GetMenuOptsFromSelections(datas);
    const {
      isDelete, isPack, isRename, isUnpack
    } = menuOpts;
    y += document.body.scrollTop;
    x += document.body.scrollLeft;
    this.setState({
      showRightMenu: (isDelete || isPack || isRename || isUnpack),
      rx: x,
      ry: y,
      showDelete: isDelete,
      showPack: isPack,
      showUnpack: isUnpack,
      showRename: isRename,
    });
  }

  handleDelete = () => {
    this.setState({
      showRightMenu: false
    });
    // console.log('delete');
    const { selectedItems } = this.state;
    TreeDataController.removeItems(selectedItems);
  }

  handleRename = () => {
    this.setState({
      showRightMenu: false
    });
    // console.log('rename');
    // 首先找到当前要进行编辑的span dom 然后再进入编辑状态进行后续的编辑工作
    const { selectedItems } = this.state;
    if (selectedItems.length === 1) {
      const innerSpan = this.findEditSpan(selectedItems[0]);
      const node = this.getNodeById(selectedItems[0]);
      if (innerSpan) { this.switchEditing(innerSpan, node); }
    }
  }

  handlePack = () => {
    this.setState({
      showRightMenu: false
    });
    const { selectedItems } = this.state;
    TreeDataController.PackItems(selectedItems);
  }

  handleUnpack = () => {
    this.setState({
      showRightMenu: false
    });
    const { selectedItems } = this.state;
    TreeDataController.UnpackItems(selectedItems);
  }

  findEditSpan = (id) => {
    const node = this.getNodeById(id);
    const tTree = document.querySelector('.t-tree');
    // 节点的id都是唯一的
    editTargetParent = tTree.querySelector(`[data-value="${node?.value}"]`);
    return editTargetParent.querySelector('[date-target="label"]').children[0];
  }

  switchEditing = (target, node) => {
    // console.log('editing ', node);

    this.setState({
      editing: true
    });

    editTarget = target;
    inputObj = NewInputDom(target, node);
    target.innerHTML = '';
    target.appendChild(inputObj);
    inputObj.focus();
    inputObj.addEventListener('keydown', this.handleInputKeyEnter);
    inputObj.addEventListener('blur', this.handleInputBlur.bind(this, node));
    inputObj.addEventListener('input', this.handleInput);
  }

  throttleHandleBlur = throttle((node, event) => {
    // console.log('````````````````````blur');
    this.hideErrorTip();

    const inputValue = inputObj.value.trim();
    if (node.data.label === inputValue) {
      // console.log('名称未发生变化，不做处理');
      this.domRemoveInput(node, editTarget, inputValue);
      this.setState({
        editing: false
      });
      return;
    }
    const validRes = this.checkNameValid(node.data, inputValue);
    if (!validRes) {
      const updateNameCB = (ret) => {
        console.log('[treeContainer][editName][updateNameCB]ret:', ret);
        if (ret) {
          this.domRemoveInput(node, editTarget, inputValue);
          node.setData({ label: inputValue });
          // console.log('客户端通知：重命名成功');
          this.setState({
            editing: false
          });
        } else {
          this.showErrorTip('与当前类型其他名称重名，请重新命名');
          inputObj.value = node?.label;
          inputObj.focus();
        }
      };
      TreeDataController.nameUpdate(node.data, inputValue, updateNameCB);
    } else {
      this.showErrorTip(validRes);
      inputObj.value = node?.label;
      inputObj.focus();
    }
  }, 100);

  domRemoveInput = (node, target, inputValue) => {
    if (inputObj) {
      inputObj.removeEventListener('keydown', this.handleInputKeyEnter);
      inputObj.removeEventListener('blur', this.handleInputBlur.bind(this, node));
      inputObj.removeEventListener('input', this.handleInput);
      let value = inputValue;
      if (nameValidate(inputValue)) {
        value = node.label;
      }
      target.removeChild(inputObj);
      inputObj = null;
      target.textContent = value;
    }
  }

  checkNameValid = (data, str) => {
    const res = nameValidate(str);
    return res;
  }

  handleInput = (event) => {
    this.hideErrorTip();
    const { target } = event;
    const inputVal = target.value;
    if (inputVal.length >= 10) {
      this.showErrorTip('自定义名称请限制在10字符以内');
      target.value = inputVal.slice(0, 10);
    }
  }

  handleInputKeyEnter = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
      return false;
    }
  }

  showErrorTip = (msg) => {
    editTargetParent.classList.add(ErrorClassName);
    const { x, y } = getElementPosition(editTargetParent);
    this.setState({
      showErrorTip: true,
      errorTip: msg,
      errorTipLeft: y,
      errorTipTop: x
    });
  }

  hideErrorTip = () => {
    if (editTargetParent) {
      editTargetParent.classList.remove(ErrorClassName);
    }
    this.setState({
      showErrorTip: false,
      errorTip: ''
    });
  }

  renderIcon = (node) => {
    if (node.getChildren() || node.data.type == GROUP) {
      return (
        <span className="t-tree-other">
          <CustomUrlIconFont name="t-icon-arrow" size="20px" />
          <CustomUrlIconFont name="t-icon-group" size="20px" />
        </span>
      );
    }

    return <CustomUrlIconFont name={generateIconName(node.data.panelType)} size="20px" style={{ color: '#95C1FF' }} />;
  };

  onBodyMouseDown = (e) => {
    const { showRightMenu } = this.state;
    if (!showRightMenu) return;
    if (!(e.target.id === 'rMenu'
      || e.path.some(item => item.id === 'rMenu'))) {
      this.setState({
        showRightMenu: false
      });
    }
  }

  renderEmpty = () => <Empty />;

  getNodeById = (id) => {
    const { TreeDataStore } = this.props;
    const { treeRef } = TreeDataStore;
    return treeRef.current.getItem(id);
  }

  render() {
    const { TreeDataStore } = this.props;
    const { treeRef, treeNodes } = TreeDataStore;
    const {
      Multiple, selectedItems, showRightMenu, rx, ry,
      showPack, showUnpack, showDelete, showRename,
      showErrorTip, errorTip, errorTipLeft, errorTipTop,
      activable
    } = this.state;
    return (
      <div onContextMenu={this.handleRightClick}>
        {/* 树形结构 https://tdesign.woa.com/react/components/tree?tab=demo */}
        <Tree
          ref={treeRef}
          data={treeNodes}
          expandAll
          activable={activable}
          transition
          activeMultiple={Multiple}
          line
          actived={selectedItems}
          icon={this.renderIcon}
          onClick={this.handleClick}
          onActive={this.handleActive}
          hover={false}
          empty={this.renderEmpty}
        />

        {/* 右键菜单 */}
        { showRightMenu
          ? (
            <RightMenu
              Pack={showPack}
              Unpack={showUnpack}
              Delete={showDelete}
              Rename={showRename}
              x={rx}
              y={ry}
              rightMenuRename={this.handleRename}
              rightMenuPack={this.handlePack}
              rightMenuUnpack={this.handleUnpack}
              rightMenuDelete={this.handleDelete}
            />
          ) : null }
        {/* 命名错误提示 */}
        { showErrorTip ? (<ToolTips msg={errorTip} left={errorTipLeft} top={errorTipTop} />) : null }
      </div>
    );
  }
}

export default TreeContainer;
