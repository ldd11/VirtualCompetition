import React, { Component } from 'react';
import { defaultDevices } from '@/config/deviceConfig';
import { defaultItemKeys } from '@/config/itemConfig';
import Camera from '../Camera/index';
import GraphicItem from '../GraphicItem/index';
import TaskDetails from '../TaskDetails/index';
import Variable from '../Variable/index';
import TMAudio from '../TMAudio/index';

import './index.less';

const prefixCls = 'module';

class PanelItem extends Component {
  state = {
    expandItem: false
  };

  toggleExpand = () => {
    const { expandItem } = this.state;
    this.setState({
      expandItem: !expandItem
    });
  };

  // 这里所有面板的模块组件
  render() {
    const { expandItem } = this.state;
    const {
      itemKey, showTask, showScore, background, scoring, tasks, dragging
    } = this.props;
    return (
      <div className={`${prefixCls}${(expandItem || dragging) ? ' expand' : ''}`}>
        <div className={`${prefixCls}-hd`} onClick={this.toggleExpand}>
          <i className="icon-spr icon-spr-arrow1 " />
          <p className={`${prefixCls}-hd-title`}>{itemKey}</p>
        </div>
        <div className={`${prefixCls}-bd`}>
          {itemKey == defaultItemKeys.BackgroundAndRule ? <TaskDetails showTask showScore={false} tasks={[{ taskID: 'BackgroundAndRule-background', taskName: '任务背景', taskDesc: background }, { taskID: 'BackgroundAndRule-rule', taskName: '任务评分', taskDesc: scoring }]} showSerialNumber={false} /> : null}
          {itemKey == defaultItemKeys.TaskDetail ? <TaskDetails showTask={showTask} showScore={showScore} tasks={tasks} showSerialNumber /> : null}
          {itemKey == defaultItemKeys.VirtualCamera ? <Camera type={defaultDevices.VirtualCamera} /> : null}
          {itemKey == defaultItemKeys.UsbCamera ? <Camera type={defaultDevices.UsbCamera} /> : null}
          {itemKey == defaultItemKeys.TMAudio ? <TMAudio type={defaultDevices.TMAudio} /> : null}
        </div>
      </div>
    );
  }
}

export default PanelItem;
