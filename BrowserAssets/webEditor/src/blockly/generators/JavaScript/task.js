import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.getTaskCount = function (block) {
  return [`GetCompetitiveTaskCount()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
}

Blockly.JavaScript.getTotalScore = function (block) {
    return [`GetTaskTotalScore()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
}

Blockly.JavaScript.getTaskPosition = function (block) {
    const index = Blockly.JavaScript.valueToCode(
      block,
      'index',
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    );
    const type = block.getFieldValue('type');
    return [`GetTaskPositionByType((GetInt(${index}) - 1), "${type}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
}

Blockly.JavaScript.isTaskCompleted = function (block) {
    const index = Blockly.JavaScript.valueToCode(
      block,
      'index',
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    );
    return [`CheckTaskCompleted(GetInt(${index}) - 1)`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
}