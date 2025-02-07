const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'activeRobotArm',
    message0: Blockly.Msg.EXTENSION_ACTIVE_ROBOT_ARM,
    args0: [
      {
        type: 'field_dropdown',
        name: 'action',
        options: [
          [Blockly.Msg.EXTENSION_ARM_LOAD_ACTION, 'Load'],
          [Blockly.Msg.EXTENSION_ARM_UNLOAD_ACTION, 'Unload']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EXTENSION
  },
  {
    type: 'checkRobotArmStatus',
    message0: Blockly.Msg.EXTENSION_CHECK_ROBOT_ARM_STATUS,
    args0: [
      {
        type: 'field_dropdown',
        name: 'action',
        options: [
          [Blockly.Msg.EXTENSION_ARM_LOAD_ACTION, 'Load'],
          [Blockly.Msg.EXTENSION_ARM_UNLOAD_ACTION, 'Unload']
        ]
      }
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EXTENSION
  },
  {
    type: 'movePincher',
    message0: Blockly.Msg.EXTENSION_MOVE_PINCHER,
    args0: [
      {
        type: 'input_value',
        name: 'x',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'z',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'y',
        check: 'Number'
      },
      {
        type: 'field_dropdown',
        name: 'action',
        options: [
          [Blockly.Msg.EXTENSION_ARM_GET_ACTION, 'Get'],
          [Blockly.Msg.EXTENSION_ARM_PUT_ACTION, 'Put']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EXTENSION
  },
  {
    type: 'storeItemInPincher',
    message0: Blockly.Msg.EXTENSION_STORE_ITEM_IN_PINCHER,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EXTENSION
  },
  {
    type: 'loadItemFromPincher',
    message0: Blockly.Msg.EXTENSION_LOAD_ITEM_FROM_PINCHER,
    args0: [
      {
        type: 'field_dropdown',
        name: 'itemType',
        options: [
          [Blockly.Msg.EXTENSION_ITEM_ENERGY_BALL, 'EnergyBall'], 
          [Blockly.Msg.EXTENSION_ITEM_POTATO_BALL, 'PotatoBall'], 
          [Blockly.Msg.EXTENSION_ITEM_TOMATO_BALL, 'TomatoBall'], 
          [Blockly.Msg.EXTENSION_ITEM_CORN_BALL, 'CornBall']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EXTENSION
  }
]);
