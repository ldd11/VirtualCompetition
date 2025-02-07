import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.enableTargetRecognition = function (block) {
  const enable = block.getFieldValue('enable');
  return `${generateComment(block)}EnableTargetRecognition(${enable});\n`;
};

Blockly.JavaScript.getTargetRecognitionCount = function (block) {
  const target = block.getFieldValue('target');
  return [`GetTargetRecognitionCount("${target}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getTargetRecognitionValue = function (block) {
  const index = Blockly.JavaScript.valueToCode(
    block,
    'index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const target = block.getFieldValue('target');
  const type = block.getFieldValue('type');
  return [`GetTargetRecognitionValue(GetInt(${index}), "${target}", "${type}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.checkTargetRecognized = function (block) {
  const target = block.getFieldValue('target');
  return [`CheckTargetRecognized("${target}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
