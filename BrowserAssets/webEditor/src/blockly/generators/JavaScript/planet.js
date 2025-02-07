import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.configPlanetAction = function (block) {
  const planet = block.getFieldValue('planet');
  const orbit = block.getFieldValue('orbit');
  const revolution = Blockly.JavaScript.valueToCode(block, 'revolution_period', Blockly.JavaScript.ORDER_FUNCTION_CALL);
  const rotation = Blockly.JavaScript.valueToCode(block, 'rotation_period', Blockly.JavaScript.ORDER_FUNCTION_CALL);

  return `${generateComment(block)}ConfigPlanetAction(GetInt(${planet}), GetInt(${orbit}), GetFloat(${revolution}), GetFloat(${rotation}));\n`;
};

Blockly.JavaScript.setSolarSystemTimeRatio = function (block) {
  const timeRatio = block.getFieldValue('time_ratio');

  return `${generateComment(block)}SetSolarSystemTimeRatio(GetInt(${timeRatio}));\n`;
};

Blockly.JavaScript.planetPeriod = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};