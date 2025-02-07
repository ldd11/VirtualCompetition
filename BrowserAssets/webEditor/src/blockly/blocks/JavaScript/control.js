const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'repeatDo',
    message0: Blockly.Msg.CONTROL_REPEAT_DO,
    args0: [
      {
        type: 'input_dummy',
        align: 'CENTRE'
      },
      {
        type: 'input_statement',
        name: 'DO'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_CONTROL,
    inputsInline: true
  },
  {
    type: 'repeatDoTimes',
    message0: Blockly.Msg.CONTROL_REPEAT_DO_TIMES,
    args0: [
      {
        type: 'input_value',
        name: 'times',
        check: ['String', 'Number', 'Boolean']
      }
    ],
    message1: '%1',
    args1: [
      {
        type: 'input_statement',
        name: 'DO'
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_CONTROL
  },
  {
    type: 'controlBreak',
    message0: Blockly.Msg.CONTROL_CONTROL_BREAK,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_CONTROL
  },
  {
    type: 'wait',
    message0: Blockly.Msg.CONTROL_WAIT,
    args0: [
      {
        type: 'input_value',
        name: 'time',
        check: ['String', 'Number', 'Boolean']
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_CONTROL
  },
  {
    type: 'waitUntil',
    message0: Blockly.Msg.CONTROL_WAIT_UNTIL,
    args0: [
      {
        type: 'input_value',
        name: 'condition',
        check: 'Boolean'
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_CONTROL
  },
  {
    type: 'repeatDoAndWaitUntil',
    message0: Blockly.Msg.CONTROL_REPEAT_DO_AND_WAIT_UNTIL,
    args0: [
      {
        type: 'input_value',
        name: 'condition',
        check: 'Boolean',
        align: 'CENTRE'
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
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_CONTROL
  }
]);

Blockly.Blocks.controlIf = Blockly.Blocks.controls_if;
Blockly.Blocks.controls_if_no_else = {
  init() {
    this.setColour(Blockly.Msg.VIRTUALHARDWARE_HEX_CONTROL);
    this.appendValueInput('IF0')
      .setCheck('Boolean')
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);

    this.appendStatementInput('DO0');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.inputsInline = true;
  }
};

Blockly.Msg.LOGIC_IF_HUE = Blockly.Msg.VIRTUALHARDWARE_HEX_CONTROL;
Blockly.Msg.CONTROLS_IF_MSG_IF = '如果';
Blockly.Msg.CONTROLS_IF_MSG_ELSEIF = '否则如果';
Blockly.Msg.CONTROLS_IF_MSG_ELSE = '否则';
