import React, { Component } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import PanelItem from '../PanelItem/index';
import { defaultItemKeys } from '@/config/itemConfig';
import Empty from '../Empty/index';
import EventUtil from '@/utils/EventUtil';
import { EventMsg } from '@/utils/EventMsg';

const DragHandle = sortableHandle(() => <div className="module-ctrls"><i className="icon-spr icon-spr-panle" /></div>);

const SortableItem = sortableElement(({ itemKey, dragging }) => (
  <div className="module-wrapper">
    <PanelItem itemKey={itemKey} dragging={dragging} />
    <DragHandle />
  </div>
));

const SortableList = sortableContainer(({ itemKeys, dragIndex }) => (
  <div>
    {itemKeys.map((itemKey, index) => <SortableItem index={index} key={itemKey} itemKey={itemKey} dragging={index === dragIndex} />)}
  </div>
));

// 传感器面板
class SensorPanel extends Component {
  constructor() {
    super();

    this.state = {
      itemKeys: [],
      dragIndex: -1,
    };
  }

  componentDidMount() {
    EventUtil.on(EventMsg.STOP_RUNNING, this.onStopRunning);
    EventUtil.on(EventMsg.ADD_SENSOR, this.addSensor);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.STOP_RUNNING, this.onStopRunning);
    EventUtil.off(EventMsg.ADD_SENSOR, this.addSensor);
  }

  onStopRunning = () => {
    this.setState({
      itemKeys: [],
      dragIndex: -1
    });
  };

  addSensor = (data) => {
    if (!data) {
      return;
    }

    const { itemKeys } = this.state;
    if (itemKeys.indexOf(defaultItemKeys[data]) != -1) {
      return;
    }

    itemKeys.push(defaultItemKeys[data]);
    this.setState({
      itemKeys
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
    const { itemKeys, dragIndex } = this.state;

    return (
      <div className="panels-content" style={{ display: show ? 'block' : 'none' }}>
        {
          itemKeys.length == 0 ? (
            <Empty title="暂无数据" des="无法获取数据，请运行后查看" />
          ) : (
            <SortableList
              itemKeys={itemKeys}
              dragIndex={dragIndex}
              lockAxis="y"
              updateBeforeSortStart={this.updateBeforeSortStart}
              onSortEnd={this.onSortEnd}
              useDragHandle
            />
          )
        }
      </div>
    );
  }
}

export default SensorPanel;
