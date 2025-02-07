import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

const floatFunction = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};
Blockly.JavaScript.rateValueOfLandInQQCar = floatFunction;
Blockly.JavaScript.rateValueOfAirInQQCar = floatFunction;
Blockly.JavaScript.angleValueInQQCar = floatFunction;
Blockly.JavaScript.timeValueOfQQCar = floatFunction;

Blockly.JavaScript.setQQCarMotionMode = function (block) {
  const mode = block.getFieldValue('mode');
  return `${generateComment(block)}if (NeedToSetMotionMode("${mode}")) {
    yield return SetMotionMode("${mode}");
  }\n`;
};

Blockly.JavaScript.setQQCarRateAndTimeOnLand = function (block) {
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const dir = block.getFieldValue('dir') || 'forward';
  return `${generateComment(block)}yield return SetRateAndTimeOnLand(GetFloat(${rate}), "${dir}", GetFloat(${time}));\n`;
};

Blockly.JavaScript.setQQCarRateOnLand = function (block) {
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const dir = block.getFieldValue('dir') || 'forward';
  return `${generateComment(block)}SetRateOnLand(GetFloat(${rate}), "${dir}");\n`;
};

Blockly.JavaScript.rotateQQCarAndSetRateAndTimeOnLand = function (block) {
  const turnDir = block.getFieldValue('turn_dir') || 'left';
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 15;
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const dir = block.getFieldValue('dir') || 'forward';
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  return `${generateComment(block)}yield return RotateAndSetRateAndTimeOnLand("${turnDir}", GetFloat(${angle}), GetFloat(${rate}), "${dir}", GetFloat(${time}));\n`;
};

Blockly.JavaScript.rotateQQCarAndSetRateOnLand = function (block) {
  const turnDir = block.getFieldValue('turn_dir') || 'left';
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 15;
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const dir = block.getFieldValue('dir') || 'forward';
  return `${generateComment(block)}RotateAndSetRateOnLand("${turnDir}", GetFloat(${angle}), GetFloat(${rate}), "${dir}");\n`;
};

Blockly.JavaScript.setQQCarRateAndTimeOnAir = function (block) {
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const dir = block.getFieldValue('dir') || 'forward';
  return `${generateComment(block)}yield return SetRateAndTimeOnAir(GetFloat(${rate}), "${dir}", GetFloat(${time}));\n`;
};

Blockly.JavaScript.setQQCarRateOnAir = function (block) {
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const dir = block.getFieldValue('dir') || 'forward';
  return `${generateComment(block)}SetRateOnAir(GetFloat(${rate}), "${dir}");\n`;
};

Blockly.JavaScript.rotateQQCarAndSetRateAndTimeOnAir = function (block) {
  const turnDir = block.getFieldValue('turn_dir') || 'left';
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 15;
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const dir = block.getFieldValue('dir') || 'forward';
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  return `${generateComment(block)}yield return RotateAndSetRateAndTimeOnAir("${turnDir}", GetFloat(${angle}), GetFloat(${rate}), "${dir}", GetFloat(${time}));\n`;
};

Blockly.JavaScript.rotateQQCarAndSetRateOnAir = function (block) {
  const turnDir = block.getFieldValue('turn_dir') || 'left';
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 15;
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const dir = block.getFieldValue('dir') || 'forward';
  return `${generateComment(block)}RotateAndSetRateOnAir("${turnDir}", GetFloat(${angle}), GetFloat(${rate}), "${dir}");\n`;
};

Blockly.JavaScript.startQQCarLanding = function (block) {
  return `${generateComment(block)}yield return StartLanding();\n`;
};

Blockly.JavaScript.stopQQCarMotionOnLand = function (block) {
  return `${generateComment(block)}StopMotionOnLand();\n`;
};

Blockly.JavaScript.stopQQCarMotionOnAir = function (block) {
  return `${generateComment(block)}StopMotionOnAir();\n`;
};

Blockly.JavaScript.getMotionStateOfQQCar = function (block) {
  const state = block.getFieldValue('state');
  return [`GetMotionState("${state}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.switchLightAndSetColorOfQQCar = function (block) {
  const color = block.getFieldValue('color');
  const enable = block.getFieldValue('enable');
  const dir = block.getFieldValue('direction');
  return `${generateComment(block)}SwitchLightAndSetColor("${enable}", "${dir}", "${color}");\n`;
};

Blockly.JavaScript.getInfraredDepthSensorValueOfQQCar = function (block) {
  const dir = block.getFieldValue('direction');
  return [`GetInfraredDepthSensorValue("${dir}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
