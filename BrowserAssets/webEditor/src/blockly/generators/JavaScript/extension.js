import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.activeRobotArm = function (block) {
  const action = block.getFieldValue('action');
  return `${generateComment(block)}yield return ActiveRobotArm("${action}");\n`;
};

Blockly.JavaScript.checkRobotArmStatus = function (block) {
  const action = block.getFieldValue('action');
  return [
    `CheckRobotArmStatus("${action}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.movePincher = function (block) {
  const movePincherX = Blockly.JavaScript.variableDB_.getDistinctName(
    'movePincherX',
    Blockly.Variables.NAME_TYPE
  );
  const movePincherY = Blockly.JavaScript.variableDB_.getDistinctName(
    'movePincherY',
    Blockly.Variables.NAME_TYPE
  );
  const movePincherZ = Blockly.JavaScript.variableDB_.getDistinctName(
    'movePincherZ',
    Blockly.Variables.NAME_TYPE
  );
  const x = Blockly.JavaScript.valueToCode(
    block,
    'x',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  const y = Blockly.JavaScript.valueToCode(
    block,
    'y',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  const z = Blockly.JavaScript.valueToCode(
    block,
    'z',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  const action = block.getFieldValue('action');
  return `${generateComment(block)}var ${movePincherX} = GetFloat(${x});
  var ${movePincherY} = GetFloat(${y});
  var ${movePincherZ} = GetFloat(${z});
  yield return MovePincher(${movePincherX}, ${movePincherY}, ${movePincherZ}, "${action}");\n`;
};

Blockly.JavaScript.storeItemInPincher = function (block) {
  return `${generateComment(block)}StoreItemInPincher();\n`;
};

Blockly.JavaScript.loadItemFromPincher = function (block) {
  const itemType = block.getFieldValue('itemType');
  return `${generateComment(block)}yield return LoadItemFromPincher("${itemType}");\n`;
};
