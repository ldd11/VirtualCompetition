/*
 * @Author: dkingwang
 * @Date: 2019-03-25 14:41:48
 * @Last Modified by: dkingwang
 * @Last Modified time: 2021-11-30 14:40:56
 */
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import * as store from './store';

import EventUtil from './utils/EventUtil';
import Tabs from './components/Tabs/index';
import Panels from './components/Panels/index';
import UnityCallHandler from './handler/UnityCallHandler';

import './assets/style/index.less';
import { jsCallNative, JS_UNITY_CMD } from './utils/NativeCall';
import { EventMsg } from './utils/EventMsg';


const prefixCls = 'page';

class App extends Component {
  state = {
    expandPanel: false,
    hidePage: false,
    isHover: false
  };


  toggleExpand = () => {
    const { expandPanel } = this.state;
    this.setState({
      expandPanel: !expandPanel
    }, () => {
      jsCallNative(expandPanel ? JS_UNITY_CMD.ExpandMultiPanels : JS_UNITY_CMD.CollapseMultiPanels);
    });
  };

  componentDidMount() {
    this.unityCallHandler = new UnityCallHandler();
    this.unityCallHandler.init();

    EventUtil.on(EventMsg.HIDE_PAGE, this.hidePage);
    EventUtil.on(EventMsg.SHOW_PAGE, this.showPage);
    EventUtil.on(EventMsg.MOUSE_LEAVE_MULTI_PANELS, this.adjustHover);
  }

  hidePage = () => {
    this.setState({
      hidePage: true
    });
  };

  showPage = () => {
    this.setState({
      hidePage: false
    });
  };

  adjustHover = () => {
    this.setState({
      isHover: false
    });
  };

  render() {
    const {
      expandPanel,
      hidePage,
      isHover
    } = this.state;
    return (
      <Provider {...store}>
        <div className={`${prefixCls} ${expandPanel ? ' expand' : ''}`} style={{ display: `${hidePage ? 'none' : 'flex'}` }}>
          <div className={`${prefixCls}-aside`}>
            <div
              onMouseMove={() => {
                this.setState({ isHover: true });
              }}
              onMouseLeave={() => {
                this.setState({ isHover: false });
              }}
              className={`${prefixCls}-aside-ctrls ${isHover ? 'hoverStyle' : ''} ${expandPanel ? 'expand' : ''}`}
              onClick={this.toggleExpand}
            >
              <span className={`${prefixCls}-aside-ctrls-tooltip`}>{expandPanel ? '展开' : '收起'}</span>
            </div>
            <Tabs expandPanel={expandPanel} toggleExpand={this.toggleExpand} />
          </div>
          <div className={`${prefixCls}-main`}><Panels /></div>
        </div>
      </Provider>
    );
  }
}

export default App;
