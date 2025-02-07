import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.startSentenceRecognition = function(block) {
  const language = block.getFieldValue('language');
  return `${generateComment(block)}yield return StartSentenceRecognition("${language}");\n`;
};

Blockly.JavaScript.getSentenceRecognitionResult = function(block) {
  return [
    'GetSentenceRecognitionResult()',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};
