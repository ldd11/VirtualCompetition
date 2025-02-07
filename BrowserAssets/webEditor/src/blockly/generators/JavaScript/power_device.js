import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.MotorRotate = function (block) {
    const id = block.getFieldValue('MOTOR');
    const type = block.getFieldValue('type');
    const num = Blockly.JavaScript.valueToCode(
      block,
      'RPM',
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || 60;
    return `${generateComment(block)}MotorRotate("${id}", Mathf.Abs(GetFloat(${num})) * ${type});\n`;
  };

Blockly.JavaScript.WHEEL_POWER = function (block) {
    const id = block.getFieldValue('id');
    const num = Blockly.JavaScript.valueToCode(
      block,
      'RPM',
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || 30;
    return `${generateComment(block)}WPRotate("${id}", GetFloat(${num}));\n`;
  };

Blockly.JavaScript.motorParam2 = function (block) {
  const num = block.getFieldValue('NUM');
  return [`float.Parse((${num}).ToString())`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.motorParam1 = function (block) {
  const num = block.getFieldValue('NUM');
  return [`float.Parse((${num}).ToString())`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.DuctedFanOutputPower = function (block) {
  const id = block.getFieldValue('id');
  const power = Blockly.JavaScript.valueToCode(
    block,
    'power',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 30;
  return `${generateComment(block)}DuctedFanOutputPower("${id}", GetFloat(${power}));\n`;
};

Blockly.JavaScript.DuctedFanSetOutputPowerAngle = function (block) {
  const id = block.getFieldValue('id');
  const pitchAngle = Blockly.JavaScript.valueToCode(
    block,
    'pitch_angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 30;
  const rollAngle = Blockly.JavaScript.valueToCode(
    block,
    'roll_angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 30;
  return `${generateComment(block)}DuctedFanSetOutputPowerAngle("${id}", GetFloat(${pitchAngle}), GetFloat(${rollAngle}));\n`;
};

Blockly.JavaScript.ductedFanAngleParam = function (block) {
  const num = block.getFieldValue('NUM');
  return [`float.Parse((${num}).ToString())`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.ServoRotateTo = function (block) {
  const id = block.getFieldValue('id');
  const targetAngle = Blockly.JavaScript.valueToCode(
    block,
    'targetAngle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;

  return `${generateComment(block)}ServoRotateTo("${id}", GetFloat(${targetAngle}));\n`;
};

Blockly.JavaScript.ServoRotate = function (block) {
  const id = block.getFieldValue('id');
  const targetAngle = Blockly.JavaScript.valueToCode(
    block,
    'targetAngle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;

  return `${generateComment(block)}ServoRotate("${id}", GetFloat(${targetAngle}));\n`;
};

Blockly.JavaScript.servoAngleParam = function (block) {
  const num = block.getFieldValue('NUM');
  return [`float.Parse((${num}).ToString())`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.servoAngleParam2 = function (block) {
  const num = block.getFieldValue('NUM');
  return [`float.Parse((${num}).ToString())`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.GetServoRotation = function (block) {
  const id = block.getFieldValue('id');
  return [`GetServoCurrentRotation("${id}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
