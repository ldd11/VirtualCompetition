const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
    {
        type: 'getTaskCount',
        message0: Blockly.Msg.TASK_GET_COUNT,
        inputsInline: true,
        output: 'Number',
        colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TASK
    },
    {
        type: 'getTotalScore',
        message0: Blockly.Msg.TASK_GET_TOTAL_SCORE,
        inputsInline: true,
        output: 'Number',
        colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TASK
    },
    {
        type: 'getTaskPosition',
        message0: Blockly.Msg.TASK_GET_POSITION_INFO,
        args0: [
            {
                type: 'input_value',
                name: 'index',
                check: ['Number']
            },
            {
              type: 'field_dropdown',
              name: 'type',
              options: [
                [Blockly.Msg.POSITION_X, 'X'],
                [Blockly.Msg.POSITION_Y, 'Y'],
                [Blockly.Msg.POSITION_Z, 'Z']
              ]
            },
          ],
        inputsInline: true,
        output: 'Number',
        colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TASK
    },
    {
        type: 'isTaskCompleted',
        message0: Blockly.Msg.TASK_IS_COMPLETED,
        args0: [
            {
                type: 'input_value',
                name: 'index',
                check: ['Number']
            }
        ],
        inputsInline: true,
        output: 'Boolean',
        colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TASK
    }
]);