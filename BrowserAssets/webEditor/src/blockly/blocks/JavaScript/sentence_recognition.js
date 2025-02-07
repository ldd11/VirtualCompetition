const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'startSentenceRecognition',
    message0: Blockly.Msg.SENTENCE_RECOGNITION_START_SENTENCE_RECOGNITION,
    args0: [
      {
        type: 'field_dropdown',
        name: 'language',
        options: [
          [Blockly.Msg.SENTENCE_LANGUAGE_ZH, '16k_zh'],
          [Blockly.Msg.SENTENCE_LANGUAGE_EN, '16k_en'],
          [Blockly.Msg.SENTENCE_LANGUAGE_CA, '16k_ca']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENTENCE_RECOGNITION
  },
  {
    type: 'getSentenceRecognitionResult',
    message0: Blockly.Msg.SENTENCE_RECOGNITION_GET_SENTENCE_RECOGNITION_RESULT,
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENTENCE_RECOGNITION
  }
]);
