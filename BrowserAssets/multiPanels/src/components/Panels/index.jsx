import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { defaultTabIndexes, defaultTabNames } from '@/config/tabConfig';
import TaskPanel from '../TaskPanel/index';
import ExercisePanel from '../ExercisePanel/index';
import SensorPanel from '../SensorPanel/index';
import DataPanel from '../DataPanel/index';
import ExamPanel from '../ExamPanel/index';
import RobotPanel from '../RobotPanel/index';
import PlanetPanel from '../PlanetPanel/index'
// 数据面板
const prefixCls = 'panels';

@inject('tabStore')
@observer
class Panels extends Component {
  constructor() {
    super();
  }

  render() {
    const { tabStore } = this.props;
    const isOtherStyle = tabStore.selectedTabIndex === defaultTabIndexes.Exam;
    const isRobotStyle = tabStore.selectedTabIndex === defaultTabIndexes.Robot;
    return (
      <div className={`${prefixCls} ${isOtherStyle ? 'panels-example' : ''} ${isRobotStyle ? 'panels-robot' : ''}`}>
        {
          tabStore.selectedTabIndex !== defaultTabIndexes.Exam && (
            <div className={`${prefixCls}-hd`}>
              <div className={`${prefixCls}-title`}>
                <i className={`icon-spr icon-spr-icon${tabStore.selectedTabIndex}`} />
                <p className={`${prefixCls}-title-text`}>{defaultTabNames[tabStore.selectedTabIndex]}</p>
              </div>
              {/* icon1-icon6分别为：任务、习题、传感器、变量、机器人、星球 */}
            </div>
          )
        }
        <div className={`${prefixCls}-bd`}>
          <ExamPanel show={tabStore.selectedTabIndex === defaultTabIndexes.Exam} />
          <TaskPanel show={tabStore.selectedTabIndex === defaultTabIndexes.Task} />
          <ExercisePanel show={tabStore.selectedTabIndex === defaultTabIndexes.Exercise} />
          <SensorPanel show={tabStore.selectedTabIndex === defaultTabIndexes.Sensor} />
          <DataPanel show={tabStore.selectedTabIndex === defaultTabIndexes.Data} />
          <RobotPanel show={tabStore.selectedTabIndex === defaultTabIndexes.Robot} />
          <PlanetPanel show={tabStore.selectedTabIndex === defaultTabIndexes.Planet} />
        </div>
      </div>
    );
  }
}

export default Panels;
