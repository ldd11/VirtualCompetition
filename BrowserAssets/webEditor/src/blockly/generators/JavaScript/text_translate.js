import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

const MAX_LEN = 2000;

Blockly.JavaScript.translateText = function (block) {
  let text = Blockly.JavaScript.valueToCode(
    block,
    'text',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || '你好';
  text = text.length > MAX_LEN + 2 ? `"${text.substr(1, MAX_LEN)}"` : text;
  const language = block.getFieldValue('language');
  return [
    `// yield return StartTextTranslate(GetString(${text}), "${language}");\n// MiddleTextTranslate\nGetTextTranslateResult()\n// EndTextTranslate`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};
