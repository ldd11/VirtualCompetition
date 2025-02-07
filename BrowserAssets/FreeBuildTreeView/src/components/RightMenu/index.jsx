import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './index.less'

const prefixCls = 'rightMenu';

@inject('TreeDataStore')
@observer
class RightMenu extends Component {
  static defaultProps = {
    Pack: false,
    Unpack: false,
    Delete: false,
    Rename: false,
    x: 0,
    y: 0,
    rightMenuRename: () => {},
    rightMenuPack: () => {},
    rightMenuUnpack: () => {},
    rightMenuDelete: () => {}
  }

  static propTypes = {
    Pack: PropTypes.bool,
    Unpack: PropTypes.bool,
    Delete: PropTypes.bool,
    Rename: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    rightMenuRename: PropTypes.func,
    rightMenuPack: PropTypes.func,
    rightMenuUnpack: PropTypes.func,
    rightMenuDelete: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  onPack = () => {
    // console.log(" right menu click pack");
    const { rightMenuPack } = this.props;
    if (rightMenuPack) {
      rightMenuPack();
    }
  }

  onUnpack = () => {
    // console.log(" right menu click unpack");
    const { rightMenuUnpack } = this.props;
    if (rightMenuUnpack) {
      rightMenuUnpack();
    }
  }

  onDelete = () => {
    // console.log(" right menu click delete");
    const { rightMenuDelete } = this.props;
    if (rightMenuDelete) {
      rightMenuDelete();
    }
  }

  onRename = () => {
    // console.log(" right menu click rename");
    const { rightMenuRename } = this.props;
    if (rightMenuRename) {
      rightMenuRename();
    }
  }

  get calculateX() {
    const { x } = this.props;
    let xMenuW = 175;
    let xMax = document.body.offsetWidth - xMenuW;

    return x > xMax ? xMax : x;
  }

  get calculateY() {
    const { y, Pack, Delete, Unpack, Rename } = this.props;
    let xMenuH = 35 * (Pack + Delete + Unpack + Rename);
    let yMax = document.body.offsetHeight - xMenuH;

    return y > yMax ? yMax : y;
  }


  render() {
    const { Pack, Delete, Rename, Unpack } = this.props;

    return (
    <div id="rMenu" className={`${prefixCls}`} style={{ top: `${this.calculateY}px`, left:`${this.calculateX}px` }}>
      <ul className={`${prefixCls}-ul`}>
        { Pack ? <li id="pack" className={`${prefixCls}-li`}  onClick={this.onPack}>编组选中对象</li> : null }
        { Unpack ? <li id="unpack" className={`${prefixCls}-li`} onClick={this.onUnpack}>取消编组</li> : null }
        { Rename ? <li id="rename" className={`${prefixCls}-li`} onClick={this.onRename}>重命名</li> : null }
        { Delete ? <li id="delete" className={`${prefixCls}-li`} onClick={this.onDelete}>删除</li> : null }
      </ul>
    </div>
    );
  }
}

export default RightMenu;
