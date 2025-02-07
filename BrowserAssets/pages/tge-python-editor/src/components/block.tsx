import { editor, Range } from 'monaco-editor/esm/vs/editor/editor.api';
import { Component } from 'react';
const prefixCls = 'block';
export type BlockData = {
  id: string;
  name: string;
  code: string;
};

type BlockProps = {
  block: BlockData;
  index: number;
};

export default class Block extends Component<BlockProps> {
  onBlockSelected = () => {
    console.log('block selected', this.props.block);

    const pythonEditor = editor.getEditors()[0];

    if (pythonEditor) {
      // get previous cursor position
      const cursorPosition = pythonEditor.getPosition();
      if (cursorPosition) {
        // insert code at cursor position
        // generate random string
        console.log('insert code at cursor position', cursorPosition, this.props.block.code);
        // const randomString = Math.random().toString(36)
        //   .substring(7);

        const { lineNumber, column } = cursorPosition;

        pythonEditor.executeEdits('paste_block', [{
          range: new Range(lineNumber, column, lineNumber, column),
          text: this.props.block.code.replace(/\\n/g, '\n'),
          forceMoveMarkers: true,
        }]);

        pythonEditor.getModel()?.pushStackElement();
        pythonEditor.focus();
      }
    }
  };

  render() {
    const { block, index } = this.props;
    return (
      <div className={`${prefixCls}-item`} onClick={this.onBlockSelected}>
        <div className={`${prefixCls}-item-inner`}>
          <div className={`${prefixCls}-item-name`}>{block.name}</div>
          {/* <div className={`${prefixCls}-item-code`}>{block.code}</div> */}
          <div className={`${prefixCls}-item-sn`}>{index}</div>
        </div>
      </div>
    );
  }
}
