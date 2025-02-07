const { Blockly } = window;

Blockly.Blocks.textRecognition = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.TEXT_RECOGNITION_START,
      args0: [
        {
          type: 'field_dropdown',
          name: 'TEXT_RECOGNITION_TYPE',
          options: [
            [Blockly.Msg.TEXT_RECOGNITION_1, 'GeneralBasicOCR'],
            [Blockly.Msg.TEXT_RECOGNITION_2, 'GeneralHandwritingOCR']
          ]
        },
        {
          type: 'field_dropdown',
          name: 'TEXT_RECOGNITION_PHOTO_TYPE',
          options: [
            [Blockly.Msg.USB_IMAGE, 'Usb'],
            [Blockly.Msg.VIRTUAL_IMAGE, 'Virtual'],
            [Blockly.Msg.LOCAL_IMAGE, 'Local']
          ]
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR,
      previousStatement: null,
      nextStatement: null
    });
  }
};

Blockly.Blocks.textRecognitionResult = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.TEXT_RECOGNITION_RESULT,
      inputsInline: true,
      output: 'String',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
    });
  }
};
