import React, { Component } from 'react';
import { EventMsg } from '@/utils/EventMsg';
import './index.less';

const prefixCls = 'task';

class TaskDetailItem extends Component {
  constructor() {
    super();

    this.state = {
      expandItem: true
    };
  }

  toggleExpand = () => {
    const { expandItem } = this.state;
    this.setState({
      expandItem: !expandItem
    });
  };

  getSerialNumber = () => {
    const { index, showSerialNumber } = this.props;
    if (showSerialNumber) {
      const tens = (index < 9 ? '0' : '');
      const ones = index + 1;
      return `${tens + ones}.`;
    }
    return '';
  };

  render() {
    const { task } = this.props;
    const { expandItem } = this.state;

    return (
      <div className={`${prefixCls}-details-item ${expandItem ? 'expand' : ''}`} key={task.taskID}>
        <div className={`${prefixCls}-details-item-hd`} onClick={this.toggleExpand}>
          <div className={`${prefixCls}-details-item-ctrls`}>
            <i className="icon-spr icon-spr-arrow1" />
          </div>
          <p className={`${prefixCls}-details-item-title`}>{this.getSerialNumber()}{task.taskName}</p>
        </div>
        <div className={`${prefixCls}-details-item-bd`}>
          {task.taskDesc}
        </div>
      </div>
    );
  }
}

class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskScore: props.task.taskScore,
      completed: false,
    };
  }

  componentDidMount() {
    EventUtil.on(EventMsg.UPDATE_TASK_SCORE, this.updateTaskScore);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.UPDATE_TASK_SCORE, this.updateTaskScore);
  }

  updateTaskScore = (data) => {
    if (!data) {
      return;
    }

    if (data.taskID != this.props.task.taskID) {
      return;
    }

    this.setState({
      completed: data.completed,
      taskScore: data.taskScore
    });
  };

  render() {
    const { index, task } = this.props;
    const { completed, taskScore } = this.state;

    return (
      <div className={`${prefixCls}-item${completed ? ' current' : ''}`} key={task.taskID}>
        <span className={`${prefixCls}-item-icon`} />
        <p className={`${prefixCls}-item-text`}>{index < 9 ? '0' : ''}{index + 1}.{task.taskName}</p>
        <span className={`${prefixCls}-item-score label`}>{taskScore}</span>
      </div>
    );
  }
}

// 图文组件
class TaskDetails extends Component {
  constructor() {
    super();

    this.state = {
      runningTime: '00:00:00',
      score: 0,
    };
  }

  componentDidMount() {
    EventUtil.on(EventMsg.UPDATE_RUNNING_TIME, this.updateRunningTime);
    EventUtil.on(EventMsg.UPDATE_SCORE, this.updateScore);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.UPDATE_RUNNING_TIME, this.updateRunningTime);
    EventUtil.off(EventMsg.UPDATE_SCORE, this.updateScore);
  }

  updateRunningTime = (data) => {
    if (!data) {
      return;
    }

    this.setState({
      runningTime: data
    });
  };

  updateScore = (data) => {
    if (!data) {
      return;
    }

    const { score } = data;
    this.setState({
      score
    });
  };

  render() {
    const { expandItem, runningTime, score } = this.state;
    const {
      showTask, showScore, tasks, showSerialNumber
    } = this.props;
    return (
      <div className={`${prefixCls}`}>
        {showScore ? (
          <div>
            <div className={`${prefixCls}-timing`}>
              <p className={`${prefixCls}-timing-time`}>{runningTime}</p>
              <p className={`${prefixCls}-timing-score`}>{score}</p>
            </div>
            <div className={`${prefixCls}-list`}>
              <span className={`${prefixCls}-list-xiushi`} />
              {
              tasks.map((task, index) => <TaskItem key={task.taskID} index={index} task={task} />)
            }
            </div>
          </div>
        ) : null}
        {showTask ? (
          <div className={`${prefixCls}-details`}>
            {
            tasks.map((task, index) => <TaskDetailItem key={task.taskID} index={index} task={task} showSerialNumber={showSerialNumber} />)
          }
          </div>
        ) : null}
      </div>
    );
  }
}

export default TaskDetails;
