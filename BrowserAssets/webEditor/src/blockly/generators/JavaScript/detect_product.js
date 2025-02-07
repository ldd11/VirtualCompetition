import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.detectProductBeta = function (block) {
  const source = block.getFieldValue('photoSource');
  return `${generateComment(block)}yield return StartDetectProductBeta("${source}");\n`;
};

Blockly.JavaScript.detectProductBetaResult = function (block) {
  return [
    'GetDetectProductBetaResult()',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};
