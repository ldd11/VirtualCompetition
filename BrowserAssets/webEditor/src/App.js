/*
 * @Author: dkingwang
 * @Date: 2019-03-25 14:41:48
 * @Last Modified by: dkingwang
 * @Last Modified time: 2021-11-30 14:40:56
 */
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import '@tencent/ec-blockly';
import * as store from './store';
import { JS_UNITY_CMD } from './utils/NativeCall';
import './blockly/msg/Javascript/message';
import './blockly/blocks/index';
import './blockly/generators/index';
import './blockly/OverrideBlockly';
import './blockly/generators/FreeBuild/index';

// 基础公共重置样式
import BlocklyEditor from './components/BlocklyEditor/index';
import BlockFuncApi from './runtime/BlockFuncApi';
import EventUtil from './utils/EventUtil';
import { EDITOR_CALL } from './runtime/constant/index';

class App extends Component {
  constructor() {
    super();
    console.log('app render');
    this.overrideBlocklyConfirm();
  }

  overrideBlocklyConfirm() {
    if (Blockly.confirm) {
      console.log('[bootstrap] override Blockly.confirm');
      Blockly.confirm = function (message, callback) {
        BlockFuncApi.callUnityApi(JS_UNITY_CMD.ShowDialog, message);

        EventUtil.on(EDITOR_CALL.RESP_CONFIRM, callback);
      };
    }
  }


  /*
  componentDidMount() {
    console.log('store = ', store);
  }
  */

  render() {
    return (
      <div className="App" id="App">
        <Provider {...store}>
          <BlocklyEditor />
        </Provider>
      </div>
    );
  }
}

export default App;
