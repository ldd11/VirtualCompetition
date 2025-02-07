const { Blockly } = window;

Blockly.Blocks.detectProductBeta = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.DETECT_PRODUCT_BETA,
      args0: [
        {
          type: 'field_dropdown',
          name: 'photoSource',
          options: [
            [Blockly.Msg.USB_IMAGE, Blockly.Msg.USB_IMAGE_KEY],
            [Blockly.Msg.VIRTUAL_IMAGE, Blockly.Msg.VIRTUAL_IMAGE_KEY],
            [Blockly.Msg.LOCAL_IMAGE, Blockly.Msg.LOCAL_IMAGE_KEY]
          ]
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_DETECT_PRODUCT_BETA
    });
  }
};

Blockly.Blocks.detectProductBetaResult = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.DETECT_PRODUCT_BETA_RESULT,
      inputsInline: true,
      output: 'String',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_DETECT_PRODUCT_BETA
    });
  }
};
