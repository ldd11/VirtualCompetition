import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.kpValueInPid = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.kiValueInPid = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.kdValueInPid = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.setPidDeviationValues = function (block) {
  const pid = block.getFieldValue('pid');
  const expectedValue = Blockly.JavaScript.valueToCode(
      block,
      'expectedValue',
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || 0;
  const measuredValue = Blockly.JavaScript.valueToCode(
    block,
    'measuredValue',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;

  return `${generateComment(block)}SetPidExpectedValue("${pid}", GetFloat(${expectedValue}));
  SetPidMeasuredValue("${pid}", GetFloat(${measuredValue}));\n`;
};

Blockly.JavaScript.setNewPidParameters = function (block) {
  return Blockly.JavaScript.setPidParameters(block);
}

Blockly.JavaScript.setPidDeviation = function (block) {
  const pid = block.getFieldValue('pid');
  const deviation = Blockly.JavaScript.valueToCode(
      block,
      'deviation',
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || 0;
  return `${generateComment(block)}SetPidDeviation("${pid}", GetFloat(${deviation}));\n`;
};

Blockly.JavaScript.setPidParameters = function (block) {
    const pid = block.getFieldValue('pid');
    const kp = Blockly.JavaScript.valueToCode(
      block,
      'kp',
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || 0;
    const ki = Blockly.JavaScript.valueToCode(
      block,
      'ki',
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || 0;
    const kd = Blockly.JavaScript.valueToCode(
      block,
      'kd',
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || 0;
    return `${generateComment(block)}SetPidParameters("${pid}", GetFloat(${kp}), GetFloat(${ki}), GetFloat(${kd}));\n`;
};

Blockly.JavaScript.getPidOutput = function (block) {
    const pid = block.getFieldValue('pid');
    return [`GetPidOutput("${pid}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};