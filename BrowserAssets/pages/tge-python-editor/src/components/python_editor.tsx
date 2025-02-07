import { Component } from 'react';
import { editor, Uri, languages } from 'monaco-editor/esm/vs/editor/editor.api';
import { jsCallNative } from '../tge';

import eventEmitter from '../utils/event_emitter';
import { initLsp } from '../utils/lsp';

type PythonEditorState = {
  canUndo: boolean;
  canRedo: boolean;
};

const prefixCls = 'tge-layout';
export default class PythonEditor extends Component<{}, PythonEditorState>  {
  editor: editor.IStandaloneCodeEditor | undefined;
  initialVersion = 0;
  currentVersion = 0;
  lastVersion = 0;

  code = '';

  state = {
    canUndo: false,
    canRedo: false,
  };

  componentDidMount() {
    console.log('componentDidMount');

    // @ts-ignore
    window.GetCode = this.getCode;
    if (window.location.hostname === 'localhost' && window.navigator.userAgent.indexOf('ZFBrowser') === -1) {
      // @ts-ignore
      window.appPath = 'temp';
    }


    languages.register({
      id: 'python',
      extensions: ['.py'],
      aliases: ['Python', 'python'],
      // mimetypes: ['text/x-python'],
    });

    eventEmitter.on('SetPythonCode', (code: string) => {
      console.log('SetPythonCode', code);
      if (this.editor) {
        this.editor.getModel()!.setValue(code);
      } else {
        this.code = code;
      }
    });

    // TODO: 临时处理，等待window.appPath被unity设置
    this.waitForApp();
  }

  waitForApp = () => {
    // @ts-ignore
    const { appPath } = window;
    if (appPath) {
      const path = `${appPath}/Python/code.py`;
      console.log('got path:', Uri.parse(path));
      // path = appPath + '/../PythonEnv/w64/code.py';

      this.editor = editor.create(document.getElementById('container')!, {
        model: editor.createModel(this.code, 'python', Uri.parse(path)),
        fontSize: 18,
        // glyphMargin: true,
        lightbulb: {
          enabled: true,
        },
        theme: 'vs-dark',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
      });

      this.editor.focus();

      this.initialVersion = this.editor.getModel()!.getAlternativeVersionId();
      this.currentVersion = this.initialVersion;
      this.lastVersion = this.initialVersion;


      this.editor.onDidChangeCursorPosition((e) => {
        console.log('onDidChangeCursorPosition', e);
      });

      this.editor.onDidChangeModelContent((e) => {
        // get redo stack
        const versionID = this.editor!.getModel()!.getAlternativeVersionId();
        console.log('onDidChangeModelContent', e, versionID);

        if (!e.isFlush) {
          jsCallNative('ModifyPythonCode', []);
        }

        if (versionID < this.currentVersion) {
          // undoing
          this.setState({
            canRedo: true,
            canUndo: versionID !== this.initialVersion,
          });
        } else {
          // redoing
          if (versionID <= this.lastVersion) {
            this.setState({
              canRedo: versionID !== this.lastVersion,
            });
          } else {
            this.setState({
              canRedo: false,
            });

            if (versionID > this.lastVersion) {
              this.lastVersion = versionID;
            }
          }

          this.setState({
            canUndo: true,
          });
        }
        this.currentVersion = versionID;
      });

      initLsp();
    } else {
      setTimeout(this.waitForApp, 100);
    }
  };


  getCode = (calldata: any) => {
    const code = this.editor?.getValue();
    console.log('getCode:', code);
    // eslint-disable-next-line no-param-reassign
    calldata.value = code;
    return code;
  };

  undo = () => {
    if (this.editor) {
      this.editor.trigger('keyboard', 'undo', {});
    }
  };

  redo = () => {
    if (this.editor) {
      this.editor.trigger('keyboard', 'redo', {});
      this.editor.focus();
    }
  };

  zoomIn = () => {
    if (this.editor) {
      this.editor.trigger('keyboard', 'editor.action.fontZoomIn', {});
    }
  };

  zoomOut = () => {
    if (this.editor) {
      this.editor.trigger('keyboard', 'editor.action.fontZoomOut', {});
    }
  };


  render() {
    const { canUndo, canRedo } = this.state;
    return (
      <div className={`${prefixCls}-main-wrapper`}>
        <div id="toolbox" className='toolbox'>
          <div className={`toolbox-btn undo ${canUndo ? '' : 'disabled'}`} onClick={this.undo}><span className='toolbox-tooltip'>撤销</span><i className='icon icon-undo'></i></div>
          <div className={`toolbox-btn redo ${canRedo ? '' : 'disabled'}`} onClick={this.redo}><span className='toolbox-tooltip'>重做</span><i className='icon icon-redo'></i></div>
          <div className={'toolbox-btn zoomin'} onClick={this.zoomIn}><span className='toolbox-tooltip'>放大</span><i className='icon icon-zoomin'></i></div>
          <div className={'toolbox-btn zoomout'} onClick={this.zoomOut}><span className='toolbox-tooltip'>缩小</span><i className='icon icon-zoomout'></i></div>
        </div>
        <div className={`${prefixCls}-main-container`} id="container"></div>
      </div>
    );
  }
}
