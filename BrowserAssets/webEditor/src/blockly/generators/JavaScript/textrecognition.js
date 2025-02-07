import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.textRecognition = function (block) {
  const text_recognition_type = block.getFieldValue('TEXT_RECOGNITION_TYPE');

  const text_recognition_photo_type = block.getFieldValue(
    'TEXT_RECOGNITION_PHOTO_TYPE'
  );
  return `${generateComment(block)}yield return StarTextRecognition("${text_recognition_type}","${text_recognition_photo_type}");\n`;
};

Blockly.JavaScript.textRecognitionResult = function (block) {
  return ['GetTextRecognitionResult()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
