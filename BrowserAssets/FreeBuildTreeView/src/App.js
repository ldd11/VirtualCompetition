/*
 * @Author: dkingwang
 * @Date: 2019-03-25 14:41:48
 * @Last Modified by: dkingwang
 * @Last Modified time: 2021-11-30 14:40:56
 */
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Resizable } from 're-resizable';
import * as store from './store';

import EventUtil from './utils/EventUtil';
import Panels from './components/Panels/index';
import UnityCallHandler from './handler/UnityCallHandler';

import './assets/style/index.less';
import { jsCallNative, JS_UNITY_CMD } from './utils/NativeCall';
import { EventMsg } from './utils/EventMsg';
import MockData from './utils/mockData';
import TreeDataController from './controller/TreeDataController';

const prefixCls = 'page';
const panelConfig = {
  minWidth: 320,
  maxWidth: 700
};

class App extends Component {
  state = {
    expandPanel: false,
    hidePage: false,
    width: 320,
    actualWidth: 320
  };

  toggleExpand = () => {
    const { expandPanel, width } = this.state;
    this.setState({
      expandPanel: !expandPanel
    }, () => {
      jsCallNative(expandPanel ? JS_UNITY_CMD.TreeViewExpand : JS_UNITY_CMD.TreeViewCollapse, {
        width
      });
    });
  };

  handleClick = (e) => {
    e.preventDefault();
  }

  componentDidMount() {
    this.unityCallHandler = new UnityCallHandler();
    this.unityCallHandler.init();

    EventUtil.on(EventMsg.HIDE_PAGE, this.hidePage);
    EventUtil.on(EventMsg.SHOW_PAGE, this.showPage);

    // 测试数据
    // MockData();
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
  }

  onResize = (e, direction, ref, d) => {
    const { actualWidth } = this.state;
    const finalWidth = actualWidth + d.width;
    if (finalWidth < panelConfig.minWidth || finalWidth > panelConfig.maxWidth) return;
    // 中间拖拽过程更新，避免右侧白屏
    this.setState({
      width: finalWidth
    });

    TreeDataController.Resize(finalWidth);
  }

  onResizeStop = (e, direction, ref, d) => {
    const { actualWidth } = this.state;
    // 结束时使用actualWidth, 避免之前resize过程中的叠加上去
    const finalWidth = actualWidth + d.width;
    if (finalWidth < panelConfig.minWidth || finalWidth > panelConfig.maxWidth) return;
    this.setState({
      width: finalWidth,
      actualWidth: finalWidth
    });
  }

  get CalMaxWidth() {
    // return document.body.offsetWidth/2;
    return panelConfig.maxWidth;
  }

  get CalEnbale() {
    const { expandPanel } = this.state;
    return expandPanel
      ? {
        top: false, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
      }
      : {
        top: false, right: false, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
      };
  }

  get CalStyle() {
    const { hidePage, expandPanel, width } = this.state;
    return {
      display: `${hidePage ? 'none' : 'flex'}`,
      transform: expandPanel ? `translateX(${width - 4}px)` : ''
    };
  }

  render() {
    const {
      expandPanel,
      width
    } = this.state;
    return (
      <Provider
        {...store}
        oncontextmenu={this.handleClick}
      >
        <div className={`${prefixCls}${expandPanel ? ' expand' : ''}`} style={this.CalStyle}>
          <div className={`${prefixCls}-aside`}>
            <div className={`${prefixCls}-aside-ctrls ${expandPanel ? 'expand' : ''}`} onClick={this.toggleExpand}>
              <span className={`${prefixCls}-aside-ctrls-tooltip`}>{expandPanel ? '展开' : '收起'}</span>
            </div>
          </div>
          <div className={`${prefixCls}-main`}>
            <Resizable
              defaultSize={{ width: panelConfig.minWidth }}
              size={{ width }}
              minWidth={panelConfig.minWidth}
              maxWidth={this.CalMaxWidth}
              grid={[5, 5]}
              enable={this.CalEnbale}
              onResize={this.onResize}
              onResizeStop={this.onResizeStop}
            >
              <div
                className={`${prefixCls}-main-inner`}
                style={{ width: `${width}px` }}
              >
                <Panels />
              </div>
            </Resizable>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
