import React, { Component } from 'react';
import RobotItem from '../RobotItem/index';

// 机器人面板

class RobotPanel extends Component {
  render() {
    const { show } = this.props;
    return (
      <div className="panels-content" style={{ display: show ? 'block' : 'none' }}>
        <RobotItem />
      </div>
    );
  }
}

export default RobotPanel;
