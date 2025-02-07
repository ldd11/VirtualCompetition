const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'onRecvBroadcast',
    message0: Blockly.Msg.EVENT_ON_RECV_BROADCAST,
    args0: [
      {
        type: 'input_value',
        name: 'msg',
        check: ['String', 'Number', 'Boolean']
      },
      {
        type: 'input_dummy',
        align: 'CENTRE'
      },
      {
        type: 'input_statement',
        name: 'DO'
      }
    ],
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EVENTS,
    inputsInline: true
  },
  {
    type: 'sendBroadcast',
    message0: Blockly.Msg.EVENT_SEND_BROADCAST,
    args0: [
      {
        type: 'input_value',
        name: 'msg',
        check: ['String', 'Number', 'Boolean']
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EVENTS
  },
  {
    type: 'print',
    message0: Blockly.Msg.EVENT_PRINT,
    args0: [
      {
        type: 'input_value',
        name: 'msg',
        check: ['String', 'Number', 'Boolean']
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EVENTS
  }
]);

Blockly.Blocks.funcMain = {
  init() {
    this.jsonInit({
      type: 'funcMain',
      message0: Blockly.Msg.EVENT_FUNC_MAIN,
      args0: [
        {
          type: 'input_dummy',
          align: 'CENTER'
        },
        {
          type: 'input_statement',
          name: 'DO'
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EVENTS
    });
    this.setDeletable(false);
  }
};
