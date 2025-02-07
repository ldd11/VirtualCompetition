import React, { Component } from 'react';
import Variable from '../Variable/index';

class DataPanel extends Component {
  constructor() {
    super();
  }

  render() {
    const { show } = this.props;
    return (
      <div className="panels-content" style={{ display: show ? 'block' : 'none' }}>
        <Variable />
      </div>
    );
  }
}

export default DataPanel;
