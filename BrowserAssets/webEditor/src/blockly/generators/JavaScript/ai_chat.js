import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.getAiRobotAiAnswer = function (block) {
  const robotName = block.getFieldValue('ROBOT_NAME');
  return [
    `GetAiRobotAiAnswer("${robotName}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.startAiRobotChat = function (block) {
  const input = Blockly.JavaScript.valueToCode(
    block,
    'INPUT',
    Blockly.JavaScript.ORDER_NONE
  );
  const robotName = block.getFieldValue('ROBOT_NAME');

  return `${generateComment(block)}yield return StartAiRobotChat("${robotName}", GetString(${input}));\n`;
};
