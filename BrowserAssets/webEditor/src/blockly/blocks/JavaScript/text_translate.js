const { Blockly } = window;
const translateSvg = require('../assets/extension_translate.svg');

Blockly.Blocks.translateText = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.TRANSLATE_TEXT,
      args0: [
        {
          type: 'field_image',
          src: translateSvg,
          width: Blockly.Settings.BlockIconSize,
          height: Blockly.Settings.BlockIconSize
        },
        {
          type: 'input_value',
          name: 'text',
          check: ['String']
        },
        {
          type: 'field_dropdown',
          name: 'language',
          options: [
            [Blockly.Msg.TEXT_TRANSLATE_ZH, 'zh'],
            [Blockly.Msg.TEXT_TRANSLATE_EN, 'en'],
            [Blockly.Msg.TEXT_TRANSLATE_KR, 'kr'],
            [Blockly.Msg.TEXT_TRANSLATE_JP, 'jp']
            // ['繁体中文', 'zh-TW'],
            // ['德语', 'de'],
            // ['法语', 'fr'],
            // ['西班牙文', 'es'],
            // ['意大利文', 'it'],
            // ['土耳其文', 'tr'],
            // ['俄文', 'ru'],
            // ['葡萄牙文', 'pt'],
            // ['越南文', 'vi'],
            // ['印度尼西亚文', 'id'],
            // ['马来西亚文', 'ms'],
            // ['泰文', 'th'],
          ]
        }
      ],
      inputsInline: true,
      output: 'String',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TRANSLATE
    });
  }
};
