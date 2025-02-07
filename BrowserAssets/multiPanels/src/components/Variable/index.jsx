import React, { Component } from 'react';
import EventUtil from '@/utils/EventUtil';
import { EventMsg } from '@/utils/EventMsg';
import Empty from '../Empty/index';
import './index.less';
import { StrVar, StrList, StrTruncatedLength, PidVar } from '@/config/constant';
import { getStrDisplayLength, getTruncatedStr } from '@/utils/TruncatedStr';
import ReactList from 'react-list';
import { JS_UNITY_CMD, jsCallNative } from '@/utils/NativeCall';

const prefixCls = 'variable';

class VarItem extends Component {
  constructor() {
    super();
    this.state = {
      hoverName: false,
      hoverValue: false
    };
  }

  onPointerEnterVarItemName = () => {
    this.setState({
      hoverName: true
    });
  };

  onPointerLeaveVarItemName = () => {
    this.setState({
      hoverName: false
    });
  };

  onPointerEnterVarItemValue = () => {
    this.setState({
      hoverValue: true
    });
  };

  onPointerLeaveVarItemValue = () => {
    this.setState({
      hoverValue: false
    });
  };

  render() {
    const { hoverName, hoverValue } = this.state;
    const { name, value, varLabel } = this.props;
    
    return (
      <div className={`${prefixCls}-item`}>
        <div className={`${prefixCls}-item-hd`}>
          <span className={varLabel === 'PID' ? `${prefixCls}-item-label pidvar` : `${prefixCls}-item-label var`}>{varLabel || '变量'}</span>
          <div className={`${prefixCls}-item-title`} onPointerEnter={this.onPointerEnterVarItemName} onPointerLeave={this.onPointerLeaveVarItemName}>
            {getTruncatedStr(name)}
            {
              (hoverName && getStrDisplayLength(name) > StrTruncatedLength) ? (
                <div className={`${prefixCls}-popover`}>
                  <div className={`${prefixCls}-popover-text`}>
                    {name}
                  </div>
                </div>
              ) : null
            }
          </div>
          <div className={varLabel === 'PID' ? `${prefixCls}-item-pidinfo`: `${prefixCls}-item-info`} onPointerEnter={this.onPointerEnterVarItemValue} onPointerLeave={this.onPointerLeaveVarItemValue}>
            {getTruncatedStr(value)}
            {
              (hoverValue && getStrDisplayLength(value) > StrTruncatedLength) ? (
                <div className={`${prefixCls}-popover`}>
                  <div className={`${prefixCls}-popover-text`}>
                    {value}
                  </div>
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

class ListItem extends Component {
  constructor() {
    super();

    this.state = {
      expand: false,
      hoverName: false,
      hoverKey: -1
    };
  }

  toggleExpand = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand
    });
  };

  onPointerEnterListName = () => {
    this.setState({
      hoverName: true
    });
  };

  onPointerLeaveListName = () => {
    this.setState({
      hoverName: false
    });
  };

  onPointerEnterListItem = (index) => {
    this.setState({
      hoverKey: index
    });
  };

  onPointerLeaveListItem = (index) => {
    this.setState({
      hoverKey: -1
    });
  };

  renderListItem = (index, key) => {
    const { hoverKey } = this.state;
    const { value } = this.props;
    const item = value[index];
    return <div className={`${prefixCls}-item-list`} key={index.toString()}>
      <div className={`${prefixCls}-item-list-name`}>
        {index + 1}
      </div>
      <div className={`${prefixCls}-item-list-info`} onPointerEnter={this.onPointerEnterListItem.bind(this, index)} onPointerLeave={this.onPointerLeaveListItem.bind(this, index)}>
        {getTruncatedStr(item.toString())}
        {
          (hoverKey == index && getStrDisplayLength(item) > StrTruncatedLength) ? (
            <div className={`${prefixCls}-popover`}>
              <div className={`${prefixCls}-popover-text`}>
                {item}
              </div>
            </div>
          ) : null
        }
      </div>
    </div>;
  }

  downloadCSV = () => {
    const { name, value } = this.props;
    const BOM = '\uFEFF'; // UTF-8的BOM
    const csvContentHeader = name + '\n';
    const csvContentBody = value.join('\n');
    const csvContent = BOM + csvContentHeader + csvContentBody;
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `List_${name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // jsCallNative(JS_UNITY_CMD.NocShowToast, { content: `列表数据导出成功`, time: 4 });
    return value;
  }

  render() {
    const { expand, hoverName, hoverKey } = this.state;
    const { name, value } = this.props;

    return (
      <div className={`${prefixCls}-item ${expand ? 'expand' : ''}`}>
        <div className={`${prefixCls}-item-hd`}>
          <span className={`${prefixCls}-item-label list`}>列表</span>
          <div className={`${prefixCls}-item-title`} onPointerEnter={this.onPointerEnterListName} onPointerLeave={this.onPointerLeaveListName}>
            {getTruncatedStr(name)}
            {
              (hoverName && getStrDisplayLength(name) > StrTruncatedLength) ? (
                <div className={`${prefixCls}-popover`}>
                  <div className={`${prefixCls}-popover-text`}>
                    {name}
                  </div>
                </div>
              ) : null
            }
          </div>
          <div className={`${prefixCls}-item-ctrls`}>
            <div className={`${prefixCls}-item-ctrls-btn`} onClick={this.downloadCSV}><i className="icon icon-download" /></div>
            <div className={`${prefixCls}-item-ctrls-btn`} onClick={this.toggleExpand}><i className="icon icon-expand" /></div>
          </div>
          
        </div>
        <div className={`${prefixCls}-item-bd`}>
          <ReactList
            itemRenderer={this.renderListItem}
            length={value.length}
            type="uniform"
          />
        </div>
      </div>
    );
  }
}

class Variable extends Component {
  constructor() {
    super();

    this.state = {
      datas: []
    };
  }

  componentDidMount() {
    EventUtil.on(EventMsg.RESET_VAR_AND_LIST, this.resetVarAndList);
    EventUtil.on(EventMsg.UPDATE_VAR_DATA, this.updateVarData);
    EventUtil.on(EventMsg.UPDATE_PID_VAR_DATA, this.updatePidVarData);
    EventUtil.on(EventMsg.UPDATE_LIST_DATA, this.updateListData);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.RESET_VAR_AND_LIST, this.resetVarAndList);
    EventUtil.off(EventMsg.UPDATE_VAR_DATA, this.updateVarData);
    EventUtil.off(EventMsg.UPDATE_PID_VAR_DATA, this.updatePidVarData);
    EventUtil.off(EventMsg.UPDATE_LIST_DATA, this.updateListData);
  }

  resetVarAndList = () => {
    this.setState({
      datas: []
    });
  };

  updatePidVarData = (data) => {
    if (!data) {
      return;
    }

    const { name, value } = data;
    const { datas } = this.state;
    const newDatas = [];
    let alreadyExists = false;

    for (let i = 0; i < datas.length; i++) {
      newDatas[i] = structuredClone(datas[i]);
      if (datas[i].name === name && datas[i].type === PidVar) {
        alreadyExists = true;
        newDatas[i].value = value;
      }
    }
    if (!alreadyExists) {
      newDatas.push({
        type: PidVar,
        name,
        value
      });
    }

    this.setState({
      datas: newDatas
    });
  }

  updateVarData = (data) => {
    if (!data) {
      return;
    }

    const { name, value } = data;
    const { datas } = this.state;
    const newDatas = [];
    let alreadyExists = false;
    for (let i = 0; i < datas.length; i++) {
      newDatas[i] = structuredClone(datas[i]);
      if (datas[i].name === name && datas[i].type === StrVar) {
        alreadyExists = true;
        newDatas[i].value = value;
      }
    }
    if (!alreadyExists) {
      newDatas.push({
        type: StrVar,
        name,
        value
      });
    }

    this.setState({
      datas: newDatas
    });
  };

  updateListData = (data) => {
    if (!data) {
      return;
    }

    const { names, values } = data;
    const { datas } = this.state;
    const newDatas = [];
    for (let i = 0; i < datas.length; i++) {
      newDatas[i] = structuredClone(datas[i]);
      if (datas[i].type === StrList) {
        const nameIndex = names.indexOf(datas[i].name);
        if (nameIndex == -1) {
          console.error("updateListData something wrong with code");
        } else {
          newDatas[i].value = structuredClone(values[nameIndex]);
          names[nameIndex] = "";
        }
      }
    }
    for (let j = 0; j < names.length; j++) {
      if (names[j] === "") {
        continue;
      }

      const name = names[j];
      const value = values[j];

      newDatas.push({
        type: StrList,
        name,
        value
      });
    }

    this.setState({
      datas: newDatas
    });
  };

  toggleExpand = () => {
    const { expandItem } = this.state;
    this.setState({
      expandItem: !expandItem
    });
  };

  render() {
    const { datas } = this.state;
    return (
      <div className={`${prefixCls}`}>
        {
          datas.length == 0 ? (
            <div className={`${prefixCls}-empty`}>
              <Empty title="暂无数据" des="请对变量/列表赋值后查看" />
            </div>
          ) : (
            <div className={`${prefixCls}-content`}>
              {
                datas.map(data => ((data.type == StrVar || data.type == PidVar) ? (
                  <VarItem key={`var_${data.name}`} name={data.name} value={data.value} varLabel={data.type == PidVar ? 'PID' : '变量'} />
                ) : (
                  <ListItem key={`list_${data.name}`} name={data.name} value={data.value} />
                )))
              }
            </div>
          )}
      </div>
    );
  }
}
export default Variable;
