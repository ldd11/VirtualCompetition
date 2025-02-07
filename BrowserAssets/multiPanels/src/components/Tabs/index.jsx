import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { defaultTabIndexes, defaultTabPriorities } from '@/config/tabConfig';
import { EventMsg } from '@/utils/EventMsg';
import EventUtil from '@/utils/EventUtil';
import './index.less';

const prefixCls = 'tabs';

@inject('tabStore')
@observer
class Tab extends Component {
  constructor() {
    super();
    this.state = {
      isHover: false
    };
  }

  componentDidMount() {
    EventUtil.on(EventMsg.MOUSE_LEAVE_MULTI_PANELS, this.adjustHover);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.MOUSE_LEAVE_MULTI_PANELS, this.adjustHover);
  }

  adjustHover = () => {
    this.setState({
      isHover: false
    });
  };

  selectTab = () => {
    const {
      index, tabStore, expandPanel, toggleExpand
    } = this.props;
    tabStore.setSelectedTabIndex(index);
    if (expandPanel) {
      toggleExpand();
    }
  };

  render() {
    const { index, tabStore, expandPanel } = this.props;
    const { isHover } = this.state;
    return (
      <div
        onMouseMove={() => {
          this.setState({ isHover: true });
        }}
        onMouseLeave={() => {
          this.setState({ isHover: false });
        }}
        className={`${prefixCls}-item ${isHover ? 'hoverStyle' : ''} tab${index}${(tabStore.selectedTabIndex === index && !expandPanel) ? ' current' : ''}`}
        onClick={this.selectTab}
      />
    );
  }
}

@inject('tabStore')
@observer
class Tabs extends Component {
  constructor() {
    super();

    this.state = {
      tabIndexes: []
    };
  }

  componentDidMount() {
    EventUtil.on(EventMsg.UPDATE_TABS, this.updateTabs);
    EventUtil.on(EventMsg.SHOW_TAB, this.showTab);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.UPDATE_TABS, this.updateTabs);
    EventUtil.off(EventMsg.SHOW_TAB, this.showTab);
  }

  updateTabs = (data) => {
    if (!data) {
      return;
    }

    const curTabIndexes = [];

    let minPriority = Number.MAX_SAFE_INTEGER;
    let index = 0;

    for (let i = 0; i < data.length; i++) {
      curTabIndexes.push(defaultTabIndexes[data[i]]);

      const priority = defaultTabPriorities[data[i]];
      if (priority < minPriority) {
        minPriority = priority;
        index = i;
      }
    }

    curTabIndexes.sort();
    this.setState({
      tabIndexes: curTabIndexes
    });

    const { tabStore } = this.props;
    tabStore.setSelectedTabIndex(defaultTabIndexes[data[index]]);
  };

  showTab = (data) => {
    if (!data) {
      return;
    }

    const { tabStore } = this.props;
    tabStore.setSelectedTabIndex(defaultTabIndexes[data]);
  };

  render() {
    const { tabIndexes } = this.state;
    const { expandPanel, toggleExpand } = this.props;

    return (
      <div className={`${prefixCls}`}>
        {tabIndexes.map(tabIndex => (
          <Tab key={tabIndex} index={tabIndex} expandPanel={expandPanel} toggleExpand={toggleExpand} />
        ))}
      </div>
    );
  }
}

export default Tabs;
