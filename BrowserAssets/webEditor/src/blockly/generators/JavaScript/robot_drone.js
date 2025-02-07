import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.droneSpeed = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.droneTrickDistance = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.dronePower = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.droneLightBrightnessVariation = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.droneLightBrightness = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.horizontalCircularMoveThenHover = function (block) {
  const rotateSpeed = Blockly.JavaScript.valueToCode(
    block,
    'rotateSpeed',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const x = Blockly.JavaScript.valueToCode(
    block,
    'x',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const y = Blockly.JavaScript.valueToCode(
    block,
    'y',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const rotateDirection = block.getFieldValue('rotateDirection');
  const laps = Blockly.JavaScript.valueToCode(
    block,
    'laps',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}yield return HorizontalCircularMoveThenHover(GetFloat(${rotateSpeed}), GetFloat(${x}), GetFloat(${y}), "${rotateDirection}", GetFloat(${laps}));\n`
};

Blockly.JavaScript.horizontalSprialMoveThenHover = function (block) {
  const rotateSpeed = Blockly.JavaScript.valueToCode(
    block,
    'rotateSpeed',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const motionSpeed = Blockly.JavaScript.valueToCode(
    block,
    'motionSpeed',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const x = Blockly.JavaScript.valueToCode(
    block,
    'x',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const y = Blockly.JavaScript.valueToCode(
    block,
    'y',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const rotateDirection = block.getFieldValue('rotateDirection');
  const laps = Blockly.JavaScript.valueToCode(
    block,
    'laps',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}yield return HorizontalSprialMoveThenHover(GetFloat(${rotateSpeed}), GetFloat(${motionSpeed}), GetFloat(${x}), GetFloat(${y}), "${rotateDirection}", GetFloat(${laps}));\n`;
};

Blockly.JavaScript.tumblingMoveThenHover = function (block) {
  const direction = block.getFieldValue('direction');
  const distance = Blockly.JavaScript.valueToCode(
    block,
    'distance',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 10;
  return `${generateComment(block)}yield return TumblingMoveThenHover("${direction}", GetFloat(${distance}));\n`;
};

Blockly.JavaScript.somersaultMoveThenHover = function (block) {
  const direction = block.getFieldValue('direction');
  const distance = Blockly.JavaScript.valueToCode(
    block,
    'distance',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 10;
  return `${generateComment(block)}yield return SomersaultMoveThenHover("${direction}", GetFloat(${distance}));\n`;
};

Blockly.JavaScript.barrelRollMoveThenHover = function (block) {
  const motionSpeed = Blockly.JavaScript.valueToCode(
    block,
    'motionSpeed',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}yield return BarrelRollMoveThenHover(GetFloat(${motionSpeed}), GetFloat(${time}));\n`;
};

Blockly.JavaScript.serpentineMoveThenHover = function (block) {
  const motionSpeed = Blockly.JavaScript.valueToCode(
    block,
    'motionSpeed',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}yield return SerpentineMoveThenHover(GetFloat(${motionSpeed}), GetFloat(${time}));\n`;
};

Blockly.JavaScript.forwardSprialMoveThenHover = function (block) {
  const motionSpeed = Blockly.JavaScript.valueToCode(
    block,
    'motionSpeed',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const rotateDirection = block.getFieldValue('rotateDirection');
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}yield return ForwardSprialMoveThenHover(GetFloat(${motionSpeed}), "${rotateDirection}", GetFloat(${time}));\n`;
};

Blockly.JavaScript.turnOnFlightStatus = function (block) {
  return `${generateComment(block)}yield return TurnOnFlightStatus();\n`;
};

Blockly.JavaScript.turnOffFlightStatus = function (block) {
  return `${generateComment(block)}yield return TurnOffFlightStatus();\n`;
};

Blockly.JavaScript.setDroneOutputPower = function (block) {
  const roll = Blockly.JavaScript.valueToCode(
    block,
    'roll',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  const pitch = Blockly.JavaScript.valueToCode(
    block,
    'pitch',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  const throttle = Blockly.JavaScript.valueToCode(
    block,
    'throttle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  const yaw = Blockly.JavaScript.valueToCode(
    block,
    'yaw',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  return `${generateComment(block)}SetDroneOutputPower(GetFloat(${roll}), GetFloat(${pitch}), GetFloat(${throttle}), GetFloat(${yaw}));\n`;
};

Blockly.JavaScript.setDroneOutputPowerAndMoveThenHover = function (block) {
  const roll = Blockly.JavaScript.valueToCode(
    block,
    'roll',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  const pitch = Blockly.JavaScript.valueToCode(
    block,
    'pitch',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  const throttle = Blockly.JavaScript.valueToCode(
    block,
    'throttle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  const yaw = Blockly.JavaScript.valueToCode(
    block,
    'yaw',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 50;
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}yield return SetDroneOutputPowerAndMoveThenHover(GetFloat(${roll}), GetFloat(${pitch}), GetFloat(${throttle}), GetFloat(${yaw}), GetFloat(${time}));\n`;
};

Blockly.JavaScript.setDroneMotionSpeed = function (block) {
  const motionSpeed = Blockly.JavaScript.valueToCode(
    block,
    'motionSpeed',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const direction = block.getFieldValue('direction');
  return `${generateComment(block)}SetDroneMotionSpeed(GetFloat(${motionSpeed}), "${direction}");\n`;
};

Blockly.JavaScript.setDroneMotionSpeedAndMoveThenHover = function (block) {
  const motionSpeed = Blockly.JavaScript.valueToCode(
    block,
    'motionSpeed',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const direction = block.getFieldValue('direction');
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}yield return SetDroneMotionSpeedAndMoveThenHover(GetFloat(${motionSpeed}), "${direction}", GetFloat(${time}));\n`;
};

Blockly.JavaScript.hoverAndRotateUntilEnd = function (block) {
  const rotateDirection = block.getFieldValue('rotateDirection');
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 90;
  return `${generateComment(block)}yield return HoverAndRotateUntilEnd("${rotateDirection}", GetFloat(${angle}));\n`;
};

Blockly.JavaScript.faceToPositionThenHover = function (block) {
  const x = Blockly.JavaScript.valueToCode(
    block,
    'x',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const y = Blockly.JavaScript.valueToCode(
    block,
    'y',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}yield return FaceToPositionThenHover(GetFloat(${x}), GetFloat(${y}));\n`;
};

Blockly.JavaScript.setDroneRotationAngle = function (block) {
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 90;
  return `${generateComment(block)}yield return SetDroneRotationAngle(GetFloat(${angle}));\n`;
};

Blockly.JavaScript.stopMotionThenHover = function (block) {
  return `${generateComment(block)}StopMotionThenHover();\n`;
};

Blockly.JavaScript.getMotionSpeedOrDirectionValue = function (block) {
  const option = block.getFieldValue('option');
  return [`GetMotionSpeedOrDirectionValue("${option}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getDroneCoordinate = function (block) {
  const axis = block.getFieldValue('axis');
  return [`GetDroneCoordinate("${axis}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getDroneInfraredDepthSensorValue = function (block) {
  const direction = block.getFieldValue('direction');
  return [`GetDroneInfraredDepthSensorValue("${direction}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.setDroneLightColor = function (block) {
  const light = block.getFieldValue('light');
  const color = block.getFieldValue('color');
  return `${generateComment(block)}SetDroneLightColor("${light}", "${color}");\n`;
};

Blockly.JavaScript.setDroneLightColorAndLastForSecond = function (block) {
  const light = block.getFieldValue('light');
  const color = block.getFieldValue('color');
  const second = Blockly.JavaScript.valueToCode(
    block,
    'second',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}yield return SetDroneLightColorAndLastForSecond("${light}", "${color}", GetFloat(${second}));\n`;
};

Blockly.JavaScript.setDroneLightColorToFlash = function (block) {
  const light = block.getFieldValue('light');
  const color = block.getFieldValue('color');
  const intervalSecond = Blockly.JavaScript.valueToCode(
    block,
    'intervalSecond',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 2;
  const lightSecond = Blockly.JavaScript.valueToCode(
    block,
    'lightSecond',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}SetDroneLightColorToFlash("${light}", "${color}", GetFloat(${intervalSecond}), GetFloat(${lightSecond}));\n`;
};

Blockly.JavaScript.setDroneLightColorToFlashAndLastForSecond = function (block) {
  const light = block.getFieldValue('light');
  const color = block.getFieldValue('color');
  const intervalSecond = Blockly.JavaScript.valueToCode(
    block,
    'intervalSecond',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 2;
  const lightSecond = Blockly.JavaScript.valueToCode(
    block,
    'lightSecond',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const totalSecond = Blockly.JavaScript.valueToCode(
    block,
    'totalSecond',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 5;
  return `${generateComment(block)}yield return SetDroneLightColorToFlashAndLastForSecond("${light}", "${color}", GetFloat(${intervalSecond}), GetFloat(${lightSecond}), GetFloat(${totalSecond}));\n`;
};

Blockly.JavaScript.increaseDroneLightBrightness = function (block) {
  const light = block.getFieldValue('light');
  const brightnessVariation = Blockly.JavaScript.valueToCode(
    block,
    'brightnessVariation',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 10;
  return `${generateComment(block)}IncreaseDroneLightBrightness("${light}", GetFloat(${brightnessVariation}));\n`;
};

Blockly.JavaScript.setDroneLightBrightness = function (block) {
  const light = block.getFieldValue('light');
  const brightness = Blockly.JavaScript.valueToCode(
    block,
    'brightness',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 10;
  return `${generateComment(block)}SetDroneLightBrightness("${light}", GetFloat(${brightness}));\n`;
};

Blockly.JavaScript.getDroneLightBrightness = function (block) {
  const light = block.getFieldValue('light');
  return [`GetDroneLightBrightness("${light}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
