const { Blockly } = window;

Blockly.Blocks.getAiRobotAiAnswer = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_AI_ROBOT_AI_ANSWER,
      args0: [
        {
          type: 'field_dropdown',
          name: 'ROBOT_NAME',
          options: [
            [Blockly.Msg.EASY_AI_ROBOT_NAME_WYNNE, 'coding.wynne'],
            [Blockly.Msg.EASY_AI_ROBOT_NAME_JENNY, 'coding.jenny'],
            [Blockly.Msg.EASY_AI_ROBOT_NAME_JASON, 'coding.jason'],
            [Blockly.Msg.EASY_AI_ROBOT_NAME_JIMMY, 'coding.jimmy']
          ]
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI_CHAT,
      output: 'String'
    });
  }
};

Blockly.Blocks.startAiRobotChat = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.EASY_AI_ROBOT_CHOOSE_CHAT,
      args0: [
        // {
        //   type: 'field_dropdown',
        //   name: 'USER_NAME',
        //   options: [
        //     [Blockly.Msg.EASY_AI_ROBOT_NAME_USER, 'codingUser'],
        //     [Blockly.Msg.EASY_AI_ROBOT_NAME_WYNNE, 'coding.wynne'],
        //     [Blockly.Msg.EASY_AI_ROBOT_NAME_JENNY, 'coding.jenny'],
        //     [Blockly.Msg.EASY_AI_ROBOT_NAME_JASON, 'coding.jason'],
        //     [Blockly.Msg.EASY_AI_ROBOT_NAME_JIMMY, 'coding.jimmy']
        //   ]
        // },
        {
          type: 'field_dropdown',
          name: 'ROBOT_NAME',
          options: [
            [Blockly.Msg.EASY_AI_ROBOT_NAME_WYNNE, 'coding.wynne'],
            [Blockly.Msg.EASY_AI_ROBOT_NAME_JENNY, 'coding.jenny'],
            [Blockly.Msg.EASY_AI_ROBOT_NAME_JASON, 'coding.jason'],
            [Blockly.Msg.EASY_AI_ROBOT_NAME_JIMMY, 'coding.jimmy']
          ]
        },
        {
          type: 'input_value',
          name: 'INPUT',
          check: ['Input', 'String']
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI_CHAT,
      previousStatement: null,
      nextStatement: null
    });
  }
};
