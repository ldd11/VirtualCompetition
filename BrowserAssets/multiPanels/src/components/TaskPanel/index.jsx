import React, { Component } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import EventUtil from '@/utils/EventUtil';
import { EventMsg } from '@/utils/EventMsg';
import PanelItem from '../PanelItem/index';
import { defaultItemKeys } from '@/config/itemConfig';
import Countdown from '../Countdown/index';
import VideoPlayer from '../VideoPlayer/index';
import VideoDialog from '../VideoDialog/index';

const DragHandle = sortableHandle(() => <div className="module-ctrls"><i className="icon-spr icon-spr-panle" /></div>);

const SortableItem = sortableElement(({
  itemKey, showTask, showScore, background, scoring, tasks, dragging
}) => (
  <div className="module-wrapper">
    <PanelItem itemKey={itemKey} showTask={showTask} showScore={showScore} background={background} scoring={scoring} tasks={tasks} dragging={dragging} />
    <DragHandle />
  </div>
));

const SortableList = sortableContainer(({
  itemKeys, showTask, showScore, background, scoring, tasks, dragIndex
}) => (
  <div>
    {itemKeys.map((itemKey, index) => <SortableItem index={index} key={itemKey} itemKey={itemKey} showTask={showTask} showScore={showScore} background={background} scoring={scoring} tasks={tasks} dragging={index === dragIndex} />)}
  </div>
));

class TaskPanel extends Component {
  constructor() {
    super();

    this.state = {
      itemKeys: [],
      showTask: false,
      showScore: false,
      background: '',
      scoring: '',
      tasks: [],
      dragIndex: -1,
    };
  }

  componentDidMount() {
    EventUtil.on(EventMsg.SET_TASK_CONFIG, this.setTaskConfig);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.SET_TASK_CONFIG, this.setTaskConfig);
  }

  setTaskConfig = (data) => {
    if (!data) {
      return;
    }
    const newItemKeys = [];
    if (data.showTask) {
      newItemKeys.push(defaultItemKeys.BackgroundAndRule);
      newItemKeys.push(defaultItemKeys.TaskDetail);
    } else if (data.showScore) {
      newItemKeys.push(defaultItemKeys.TaskDetail);
    }
    this.setState({
      itemKeys: newItemKeys,
      showTask: data.showTask,
      showScore: data.showScore,
      background: data.background,
      scoring: data.scoring,
      tasks: data.tasks
    });
  };

  updateBeforeSortStart = ({ index }) => {
    this.setState({
      dragIndex: index
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { itemKeys } = this.state;
    this.setState({
      itemKeys: arrayMoveImmutable(itemKeys.slice(), oldIndex, newIndex),
      dragIndex: -1
    });
  };

  render() {
    const { show } = this.props;
    const {
      itemKeys, showTask, showScore, background, scoring, tasks, dragIndex, nowTime, endSubmitTime
    } = this.state;

    return (
      <div className="panels-content" style={{ display: show ? 'block' : 'none' }}>
        {/* {
          (nowTime > 0 && endSubmitTime > 0 && nowTime < endSubmitTime && endSubmitTime - nowTime < 86400) && <Countdown />
        } */}
        <Countdown />
        <SortableList
          itemKeys={itemKeys}
          showTask={showTask}
          showScore={showScore}
          background={background}
          scoring={scoring}
          tasks={tasks}
          dragIndex={dragIndex}
          lockAxis="y"
          updateBeforeSortStart={this.updateBeforeSortStart}
          onSortEnd={this.onSortEnd}
          useDragHandle
        />
      </div>
    );
  }
}

export default TaskPanel;
