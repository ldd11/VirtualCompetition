const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'enableTargetRecognition',
    message0: Blockly.Msg.AI_ENABLE_TARGET_RECOGNITION,
    args0: [
      {
        type: 'field_dropdown',
        name: 'enable',
        options: [
          [Blockly.Msg.AI_ENABLE_TARGET_RECOGNITION_ON, '1'],
          [Blockly.Msg.AI_ENABLE_TARGET_RECOGNITION_OFF, '0']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
  },
  {
    type: 'getTargetRecognitionCount',
    message0: Blockly.Msg.AI_GET_TARGET_RECOGNITION_COUNT,
    args0: [
      {
        type: 'field_dropdown',
        name: 'target',
        options: [
          [Blockly.Msg.AI_TARGET_MARS_WATER, 'mars_water'],
          [Blockly.Msg.AI_TARGET_ALLUVIAL_FAN, 'alluvial_fan'],
          [Blockly.Msg.AI_TARGET_ROCKY_BEACH, 'rocky_beach'],
          [Blockly.Msg.AI_TARGET_WATER_TRACES, 'water_traces'],
          [Blockly.Msg.AI_TARGET_MARS_BLUEBERRY, 'mars_blueberry'],
          [Blockly.Msg.AI_TARGET_GYPSUM_ORE, 'gypsum_ore'],
          [Blockly.Msg.AI_TARGET_QUARTZ_ORE, 'quartz_ore'],
          [Blockly.Msg.AI_TARGET_METEORITE, 'meteorite'],
          [Blockly.Msg.AI_TARGET_HUMAN, 'human']
          //[Blockly.Msg.AI_TARGET_LIHUADAN, 'lihuadan']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
  },
  {
    type: 'getTargetRecognitionValue',
    message0: Blockly.Msg.AI_GET_TARGET_RECOGNITION_VALUE,
    args0: [
      {
        type: 'input_value',
        name: 'index',
        check: 'Number'
      },
      {
        type: 'field_dropdown',
        name: 'target',
        options: [
          [Blockly.Msg.AI_TARGET_MARS_WATER, 'mars_water'],
          [Blockly.Msg.AI_TARGET_ALLUVIAL_FAN, 'alluvial_fan'],
          [Blockly.Msg.AI_TARGET_ROCKY_BEACH, 'rocky_beach'],
          [Blockly.Msg.AI_TARGET_WATER_TRACES, 'water_traces'],
          [Blockly.Msg.AI_TARGET_MARS_BLUEBERRY, 'mars_blueberry'],
          [Blockly.Msg.AI_TARGET_GYPSUM_ORE, 'gypsum_ore'],
          [Blockly.Msg.AI_TARGET_QUARTZ_ORE, 'quartz_ore'],
          [Blockly.Msg.AI_TARGET_METEORITE, 'meteorite'],
          [Blockly.Msg.AI_TARGET_HUMAN, 'human']
          //[Blockly.Msg.AI_TARGET_LIHUADAN, 'lihuadan']
        ]
      },
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          [Blockly.Msg.AI_TARGET_X_INFO, 'x'],
          [Blockly.Msg.AI_TARGET_Y_INFO, 'y'],
          [Blockly.Msg.AI_TARGET_Z_INFO, 'z'],
          [Blockly.Msg.AI_TARGET_PERCENTAGE_INFO, 'percentage']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
  },
  {
    type: 'checkTargetRecognized',
    message0: Blockly.Msg.AI_CHECK_TARGET_RECOGNIZED,
    args0: [
      {
        type: 'field_dropdown',
        name: 'target',
        options: [
          [Blockly.Msg.AI_TARGET_MARS_WATER, 'mars_water'],
          [Blockly.Msg.AI_TARGET_ALLUVIAL_FAN, 'alluvial_fan'],
          [Blockly.Msg.AI_TARGET_ROCKY_BEACH, 'rocky_beach'],
          [Blockly.Msg.AI_TARGET_WATER_TRACES, 'water_traces'],
          [Blockly.Msg.AI_TARGET_MARS_BLUEBERRY, 'mars_blueberry'],
          [Blockly.Msg.AI_TARGET_GYPSUM_ORE, 'gypsum_ore'],
          [Blockly.Msg.AI_TARGET_QUARTZ_ORE, 'quartz_ore'],
          [Blockly.Msg.AI_TARGET_METEORITE, 'meteorite'],
          [Blockly.Msg.AI_TARGET_HUMAN, 'human']
          //[Blockly.Msg.AI_TARGET_LIHUADAN, 'lihuadan']
        ]
      }
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
  }
]);
