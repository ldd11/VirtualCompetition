import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.posValueOfDebug = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.setRobotInitialPos = function (block) {
  const x = Blockly.JavaScript.valueToCode(
    block,
    'x',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const y = Blockly.JavaScript.valueToCode(
    block,
    'y',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  return `${generateComment(block)}yield return SetRobotInitialPos(GetFloat(${x}), GetFloat(${y}), GetFloat(${angle}));\n`;
};

Blockly.JavaScript.setRobotDroneInitialPos = function (block) {
  const x = Blockly.JavaScript.valueToCode(
    block,
    'x',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const y = Blockly.JavaScript.valueToCode(
    block,
    'y',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const z = Blockly.JavaScript.valueToCode(
    block,
    'z',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  return `${generateComment(block)}yield return SetRobotDroneInitialPos(GetFloat(${x}), GetFloat(${y}), GetFloat(${z}), GetFloat(${angle}));\n`
};
