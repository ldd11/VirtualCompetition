const { Blockly } = window;

const PIDNames = [
    ['PID1', 'PID1'],
    ['PID2', 'PID2'],
    ['PID3', 'PID3'],
    ['PID4', 'PID4'],
    ['PID5', 'PID5'],
    ['PID6', 'PID6'],
    ['PID7', 'PID7'],
    ['PID8', 'PID8'],
    ['PID9', 'PID9'],
    ['PID10', 'PID10']
];

Blockly.defineBlocksWithJsonArray([
    {
      type: 'kpValueInPid',
      message0: '%1',
      args0: [
        {
          type: 'field_slider',
          name: 'NUM',
          min: 0.0,
          max: 500.0,
          step: 0.1
        }
      ],
      input_valuesInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PID,
      tooltip: '',
      helpUrl: ''
    },
    {
      type: 'kiValueInPid',
      message0: '%1',
      args0: [
        {
          type: 'field_slider',
          name: 'NUM',
          min: 0.0,
          max: 500.0,
          step: 0.1
        }
      ],
      input_valuesInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PID,
      tooltip: '',
      helpUrl: ''
    },
    {
      type: 'kdValueInPid',
      message0: '%1',
      args0: [
        {
          type: 'field_slider',
          name: 'NUM',
          min: 0.0,
          max: 1.0,
          step: 0.001
        }
      ],
      input_valuesInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PID,
      tooltip: '',
      helpUrl: ''
    },
    {
      type: 'setPidDeviationValues',
      message0: Blockly.Msg.PID_SET_DEVIATION_VALUES,
      args0: [
        {
          type: 'field_dropdown',
          name: 'pid',
          options: PIDNames
        },
        {
            type: 'input_value',
            name: 'expectedValue',
            check: 'Number'
        },
        {
            type: 'input_value',
            name: 'measuredValue',
            check: 'Number'
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PID
    },
    {
      type: 'setNewPidParameters',
      message0: Blockly.Msg.PID_SET_NEW_PARAMETERS,
      args0: [
        {
          type: 'field_dropdown',
          name: 'pid',
          options: PIDNames
        },
        {
          type: 'input_value',
          name: 'kp',
          check: 'Number'
      },
      {
          type: 'input_value',
          name: 'ki',
          check: 'Number'
      },
      {
          type: 'input_value',
          name: 'kd',
          check: 'Number'
      }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PID
    },
    {
        type: 'setPidDeviation',
        message0: Blockly.Msg.PID_SET_DEVIATION,
        args0: [
            {
              type: 'field_dropdown',
              name: 'pid',
              options: PIDNames
            },
            {
                type: 'input_value',
                name: 'deviation',
                check: 'Number'
            }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PID
      },
      {
        type: 'setPidParameters',
        message0: Blockly.Msg.PID_SET_PARAMETERS,
        args0: [
            {
              type: 'field_dropdown',
              name: 'pid',
              options: PIDNames
            },
            {
              type: 'input_value',
              name: 'kp',
              check: 'Number'
          },
          {
              type: 'input_value',
              name: 'ki',
              check: 'Number'
          },
          {
              type: 'input_value',
              name: 'kd',
              check: 'Number'
          }
          ],
          previousStatement: null,
          nextStatement: null,
          colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PID
      },
      {
        type: 'getPidOutput',
        message0: Blockly.Msg.PID_GET_OUTPUT,
        args0: [
            {
                type: 'field_dropdown',
                name: 'pid',
                options: PIDNames
            }
        ],
        inputsInline: true,
        output: 'Number',
        colour: Blockly.Msg.VIRTUALHARDWARE_HEX_PID
      }
]);
