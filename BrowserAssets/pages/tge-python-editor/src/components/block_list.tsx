import { Component } from 'react';
import Block, { BlockData } from './block';
import eventEmitter from '../utils/event_emitter';
const prefixCls = 'block';


type BlockListState = {
  blocks: BlockData[];
};

export default class BlockList extends Component<{}, BlockListState> {
  state: BlockListState = {
    blocks: [],
  };

  componentDidMount(): void {
    console.log('componentDidMount');

    eventEmitter.addListener('UpdateBlockList', (blocks: BlockData[]) => {
      console.log('UpdateBlockList', blocks);
      this.setState({
        blocks,
      });
    });

    this.initPythonBlocks();
  }

  initPythonBlocks = () => {
    if (window.location.hostname === 'localhost'
    && window.navigator.userAgent.indexOf('ZFBrowser') === -1) {
      const pythonBlocks = [
        {
          id: '1',
          name: 'wait',
          code: 'coding.wait(1)\n',
        },
        {
          id: '2',
          name: 'speed',
          code: 'max.speed(foot, 2)',
        },
        {
          id: '3',
          name: 'action',
          code: 'max.action(CodingAnimEnum.PlayRedEnvelope)',
        },
      ];

      console.log('got pythonBlocks:', pythonBlocks);
      eventEmitter.emit('UpdateBlockList', pythonBlocks);
    }
  };

  render() {
    return (
      <div className={`${prefixCls}`}>
        {/* <div className={`${prefixCls}-title`}>Blocks {this.state.blocks.length}</div> */}
        <div className={`${prefixCls}-content`}>
          {
            this.state.blocks.map((block, index) => (
                <Block block={block} key={block.id} index={index} />
            ))
          }
        </div>
      </div>
    );
  }
}
