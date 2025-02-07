import { Component, createRef } from 'react';
import EcConsole from '@tencent/ec-console';
import eventEmitter from '../utils/event_emitter';
const prefixCls = 'output';
export default class Output extends Component {
  refConsole = createRef<HTMLElement>();

  componentDidMount() {
    // this.addLog('hello world');
    // this.addError('error');

    eventEmitter.on('AddPythonOutput', this.addLog);
    eventEmitter.on('AddPythonError', this.addError);
    eventEmitter.on('ClearPythonOutput', this.clearLog);
    eventEmitter.on('AddWebEditorOutput', this.addOutput);
  }

  addOutput = (data: any) => {
    if (!data) return;
    const { outputs } = data;
    if (outputs !== null && outputs.length > 0) {
      outputs.forEach((element: string) => {
        if (element.startsWith('log:')) {
          this.addLog(element.slice(4));
        } else if (element.startsWith('error:')) {
          this.addError(element.slice(6));
        }
      });
    }
  };

  addLog = (log: string) => {
    // @ts-ignore
    this.refConsole.current?.log(log); // 打印 log 日志
  };

  addError = (log: string) => {
    // @ts-ignore
    this.refConsole.current?.error(log); // 打印 error 日志
  };

  clearLog = () => {
    // @ts-ignore
    this.refConsole.current?.clear(); // 清除 log
  };

  onInput = (input: string) => {
    console.log(`onInput:${input}`);
  };

  render() {
    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-hd`}>
          <div className={`${prefixCls}-hd-title`}>终端</div>
          <div className={`${prefixCls}-hd-ctrls`}>
            <div className={`${prefixCls}-hd-ctrls-btn`} onClick={this.clearLog}>
              <i className='icon icon-clear'></i>
              <span className={`${prefixCls}-tooltip`}>清空</span>
            </div>
          </div>
        </div>
        <div className={`${prefixCls}-bd`}>
          <EcConsole ref={this.refConsole} onInput={this.onInput} maxLineCount={10000} />
        </div>
      </div>
    );
  }
}
