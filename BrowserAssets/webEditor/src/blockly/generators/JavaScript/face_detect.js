import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.startFaceDetect = function (block) {
  const imageType = block.getFieldValue('imageType');
  return `${generateComment(block)}yield return StartFaceDetect("${imageType}");\n`;
};

Blockly.JavaScript.getFaceDetectResult = function (block) {
  const attr = block.getFieldValue('attr');
  let prefix = '';
  switch (attr) {
    case 'age':
    case 'beauty':
      prefix = '(int)';
      break;
    case 'gender':
    case 'emotion':
      prefix = '(string)';
      break;
    case 'glass':
    case 'mask':
    case 'hair':
      prefix = '(bool)';
      break;
    default:
  }
  return [
    `GetFaceDetectResult("${attr}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.getFaceDetectResultOfBool = function (block) {
  const attr = block.getFieldValue('attr');
  return [
    `GetFaceDetectResultOfBool("${attr}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.getFaceDetectResultOfText = Blockly.JavaScript.getFaceDetectResult;

Blockly.JavaScript.getFaceDetectResultOfNumber = Blockly.JavaScript.getFaceDetectResult;
