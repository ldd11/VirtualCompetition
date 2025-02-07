const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'configPlanetAction',
    message0: Blockly.Msg.CONFIG_PLANET_ACTION,
    args0: [
      {
        type: 'field_dropdown',
        name: 'planet',
        options: [
          [Blockly.Msg.PLANET_SHUI_XING, '1'],
          [Blockly.Msg.PLANET_JIN_XING, '2'],
          [Blockly.Msg.PLANET_EARTH, '3'],
          [Blockly.Msg.PLANET_HUO_XING, '4'],
          [Blockly.Msg.PLANET_MU_XING, '5'],
          [Blockly.Msg.PLANET_TU_XING, '6'],
          [Blockly.Msg.PLANET_TIAN_WANG_XING, '7'],
          [Blockly.Msg.PLANET_HAI_WANG_XING, '8'],
        ]
      },
      {
        type: 'field_dropdown',
        name: 'orbit',
        options: [
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
          ['6', '6'],
          ['7', '7'],
          ['8', '8'],
        ]
      },
      {
        type: 'input_value',
        name: 'revolution_period',
        check: ['Number']
      },
      {
        type: 'input_value',
        name: 'rotation_period',
        check: ['Number']
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PLANET
  },
  {
    type: 'setSolarSystemTimeRatio',
    message0: Blockly.Msg.CONFIG_SOLAR_SYSTEM_TIME,
    args0: [
      {
        type: 'field_dropdown',
        name: 'time_ratio',
        options: [
          ['1:10', '10'],
          ['1:50', '50'],
          ['1:100', '100'],
          ['1:200', '200'],
          ['1:500', '500'],
          ['1:1000', '1000'],
          ['1:1', '1'],
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PLANET
  },
  {
    type: 'planetPeriod',
    message0: Blockly.Msg.MOTION_RATE_VALUE_IN_WHEEL,
    args0: [
      {
        type: 'field_number',
        name: 'NUM',
        min: 0,
        max: Number.POSITIVE_INFINITY,
        step: 1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PLANET,
    tooltip: '',
    helpUrl: ''
  },
]);
