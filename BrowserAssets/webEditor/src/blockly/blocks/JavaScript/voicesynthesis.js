const { Blockly } = window;

Blockly.Blocks.voiceSynthesisReadaloud = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.SPEAKER_ALOUND_SOMETHING,
      args0: [
        {
          type: 'input_value',
          name: 'INPUT',
          check: ['Input', 'String']
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EXTENSION,
      previousStatement: null,
      nextStatement: null
    });
  }
};

Blockly.Blocks.voiceSynthesisReadaloudUtil = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.SPEAKER_ALOUND_SOMETHING_UTIL,
      args0: [
        {
          type: 'input_value',
          name: 'INPUT',
          check: ['Input', 'String']
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EXTENSION,
      previousStatement: null,
      nextStatement: null
    });
  }
};

Blockly.Blocks.voiceSynthesisSpeakerSet = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.SPEAKER_TYPE_SET,
      args0: [
        {
          type: 'field_dropdown',
          name: 'SPEAKER_TYPE',
          options: [
            [Blockly.Msg.SPEAKER_NORMAL, '10510000'],
            [Blockly.Msg.SPEAKER_NORMAL1, '1001'],
            [Blockly.Msg.SPEAKER_NORMAL2, '1002'],
            [Blockly.Msg.SPEAKER_NORMAL3, '1003'],
            [Blockly.Msg.SPEAKER_NORMAL4, '1004'],
            [Blockly.Msg.SPEAKER_NORMAL5, '1005'],
            [Blockly.Msg.SPEAKER_NORMAL6, '1007'],
            [Blockly.Msg.SPEAKER_NORMAL7, '1008'],
            [Blockly.Msg.SPEAKER_NORMAL8, '1009'],
            [Blockly.Msg.SPEAKER_NORMAL9, '1010'],
            [Blockly.Msg.SPEAKER_NORMAL10, '1017'],
            [Blockly.Msg.SPEAKER_NORMAL11, '1018']
            // [Blockly.Msg.SPEAKER_NORMAL12, '1050'],
            // [Blockly.Msg.SPEAKER_NORMAL13, '1051']
          ]
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EXTENSION,
      previousStatement: null,
      nextStatement: null
    });
  }
};

Blockly.Blocks.voiceSynthesisSpeedSet = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.SPEAKER_SPEED_SET,
      args0: [
        {
          type: 'field_dropdown',
          name: 'Speaker_Speed',
          options: [
            [Blockly.Msg.SPEAKER_SPEED1, '-2'],
            [Blockly.Msg.SPEAKER_SPEED2, '-1'],
            [Blockly.Msg.SPEAKER_SPEED3, '0'],
            [Blockly.Msg.SPEAKER_SPEED4, '1']
          ]
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_EXTENSION,
      previousStatement: null,
      nextStatement: null
    });
  }
};
