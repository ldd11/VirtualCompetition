import { Component } from 'react';
import ResizePanel from 'react-resize-panel';
import BlockList from './components/block_list';
import PythonEditor from './components/python_editor';
import Output from './components/output';
import './assets/style/index.less';
const prefixCls = 'tge-layout';
export default class App extends Component {
  state = {
    isBlockExpand: false,
  };
  toggleBlockExpand = () => {
    const { isBlockExpand } = this.state;
    this.setState({ isBlockExpand: !isBlockExpand });
  };

  render() {
    const { isBlockExpand } = this.state;
    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-aside ${isBlockExpand ? 'expand' : ''}`} id="block">
          <div className={`${prefixCls}-aside-hd`}>
            <p className={`${prefixCls}-aside-title`}>代码</p>
            <div className={`${prefixCls}-aside-ctrls ${isBlockExpand ? 'expand' : ''}`} onClick={() => this.toggleBlockExpand()}><i className={`${prefixCls}-aside-ctrls-icon`}></i></div>
          </div>
          <div className={`${prefixCls}-aside-bd`}>
            <BlockList />
          </div>
        </div>
        <div className={`${prefixCls}-main`}>
            <ResizePanel direction="s" style={{ flexGrow: '3',  minHeight: '50%',  maxHeight: '71.7%' }} handleClass="customHandle">
              <PythonEditor/>
            </ResizePanel>
          <div className={`${prefixCls}-main-output`} id="output" >
            <Output />
          </div>
        </div>
      </div>
    );
  }
}

