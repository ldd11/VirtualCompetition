import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.rateValueInWheel = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.rateValueInFoot = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.jumpValueInFoot = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.distanceValueInFoot = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.backflipValueInFoot = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.platformHeightValueInFoot = function (block) {
  const num = block.getFieldValue('NUM');
  return [
    `(float.Parse((${num}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.singleAngle = function (block) {
  const angle = block.getFieldValue('angle');
  return [
    `(float.Parse((${angle}).ToString()))`,
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript.setMotionMode = function (block) {
  const mode = block.getFieldValue('mode');
  return `${generateComment(block)}if (NeedToSetMotionMode("${mode}")) {
    yield return SetMotionMode("${mode}");
  }\n`;
};

Blockly.JavaScript.faceToPosition = function (block) {
  const faceToPositionTempVarX = Blockly.JavaScript.variableDB_.getDistinctName(
    'faceToPositionTempVarX',
    Blockly.Variables.NAME_TYPE
  );
  const faceToPositionTempVarY = Blockly.JavaScript.variableDB_.getDistinctName(
    'faceToPositionTempVarY',
    Blockly.Variables.NAME_TYPE
  );
  const x = Blockly.JavaScript.valueToCode(
    block,
    'x',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 100;
  const y = Blockly.JavaScript.valueToCode(
    block,
    'z',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 100;
  return `${generateComment(block)}var ${faceToPositionTempVarX} = GetFloat(${x});
  var ${faceToPositionTempVarY} = GetFloat(${y});
  if (NeedToFaceToPosition(${faceToPositionTempVarX}, ${faceToPositionTempVarY})) {
    yield return FaceToPosition(${faceToPositionTempVarX}, ${faceToPositionTempVarY});
  }\n`;
};

Blockly.JavaScript.rotateUntilEnd = function (block) {
  const rotateUntilEndAngle = Blockly.JavaScript.variableDB_.getDistinctName(
    'rotateUntilEndAngle',
    Blockly.Variables.NAME_TYPE
  );
  const mode = block.getFieldValue('mode');
  const direction = block.getFieldValue('direction');
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 15;
  return `${generateComment(block)}var ${rotateUntilEndAngle} = GetFloat(${angle});
  if (NeedToRotateUntilEnd("${mode}", ${rotateUntilEndAngle})) {
    yield return RotateUntilEnd("${mode}", "${direction}", ${rotateUntilEndAngle});
  }\n`;
};

Blockly.JavaScript.setRotation = function (block) {
  const setRotationAngle = Blockly.JavaScript.variableDB_.getDistinctName(
    'setRotationAngle',
    Blockly.Variables.NAME_TYPE
  );
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 90;
  return `${generateComment(block)}var ${setRotationAngle} = GetFloat(${angle});
  if (NeedToSetRotation(${setRotationAngle})) {
    yield return SetRotation(${setRotationAngle});
  }\n`;
};

Blockly.JavaScript.setRateInFoot = function (block) {
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0.3;
  return `${generateComment(block)}SetRateInFoot(GetFloat(${rate}));\n`;
};

Blockly.JavaScript.setRateAndTimeInFoot = function (block) {
  const footRate = Blockly.JavaScript.variableDB_.getDistinctName(
    'footRate',
    Blockly.Variables.NAME_TYPE
  );
  const footTime = Blockly.JavaScript.variableDB_.getDistinctName(
    'footTime',
    Blockly.Variables.NAME_TYPE
  );
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0.3;
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}var ${footRate} = GetFloat(${rate});
  var ${footTime} = GetFloat(${time});
  yield return SetRateAndTimeInFoot(${footRate}, ${footTime});\n`;
};

Blockly.JavaScript.jumpInFoot = function (block) {
  const jumpInFootDistance = Blockly.JavaScript.variableDB_.getDistinctName(
    'jumpInFootDistance',
    Blockly.Variables.NAME_TYPE
  );
  const jumpInFootHeight = Blockly.JavaScript.variableDB_.getDistinctName(
    'jumpInFootHeight',
    Blockly.Variables.NAME_TYPE
  );
  const distance = Blockly.JavaScript.valueToCode(
    block,
    'distance',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 20;
  const height = Blockly.JavaScript.valueToCode(
    block,
    'height',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 20;
  return `${generateComment(block)}var ${jumpInFootDistance} = GetFloat(${distance});
  var ${jumpInFootHeight} = GetFloat(${height});
  yield return JumpInFoot(${jumpInFootDistance}, ${jumpInFootHeight});\n`;
};

Blockly.JavaScript.backflipInFoot = function (block) {
  const backflipInFootDistance = Blockly.JavaScript.variableDB_.getDistinctName(
    'backflipInFootDistance',
    Blockly.Variables.NAME_TYPE
  );
  const backflipInFootHeight = Blockly.JavaScript.variableDB_.getDistinctName(
    'backflipInFootHeight',
    Blockly.Variables.NAME_TYPE
  );
  const distance = Blockly.JavaScript.valueToCode(
    block,
    'distance',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 20;
  const height = Blockly.JavaScript.valueToCode(
    block,
    'height',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 20;
  return `${generateComment(block)}var ${backflipInFootDistance} = GetFloat(${distance});
  var ${backflipInFootHeight} = GetFloat(${height});
  yield return BackflipInFoot(${backflipInFootDistance}, ${backflipInFootHeight});\n`;
};

Blockly.JavaScript.setRateInWheel = function (block) {
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0.3;
  return `${generateComment(block)}SetRateInWheel(GetFloat(${rate}));\n`;
};

Blockly.JavaScript.setRateAndTimeInWheel = function (block) {
  const wheelRate = Blockly.JavaScript.variableDB_.getDistinctName(
    'wheelRate',
    Blockly.Variables.NAME_TYPE
  );
  const wheelTime = Blockly.JavaScript.variableDB_.getDistinctName(
    'wheelTime',
    Blockly.Variables.NAME_TYPE
  );
  const rate = Blockly.JavaScript.valueToCode(
    block,
    'rate',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0.3;
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}var ${wheelRate} = GetFloat(${rate});
  var ${wheelTime} = GetFloat(${time});
  yield return SetRateAndTimeInWheel(${wheelRate}, ${wheelTime});\n`;
};

Blockly.JavaScript.stopMotion = function (block) {
  return `${generateComment(block)}StopMotion();\n`;
};

Blockly.JavaScript.getDirection = function (block) {
  return ['GetDirection()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.setMovePower = function (block) {
  const powerPercent = Blockly.JavaScript.valueToCode(
    block,
    'power_percent',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const actionType = block.getFieldValue('action_type');

  return `${generateComment(block)}yield return SetMovePower("${actionType}", GetFloat(${powerPercent}));\n`;
};

Blockly.JavaScript.setMovePowerInTime = function (block) {
  const powerPercent = Blockly.JavaScript.valueToCode(
    block,
    'power_percent',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const actionType = block.getFieldValue('action_type');
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );

  return `${generateComment(block)}yield return SetPowerInTime("${actionType}", GetFloat(${powerPercent}), GetFloat(${time}));\n`;
};

Blockly.JavaScript.rotateInTime = function (block) {
  const angleType = block.getFieldValue('angle_type');
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const powerPercent = Blockly.JavaScript.valueToCode(
    block,
    'power_percent',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const actionType = block.getFieldValue('action_type');
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );

  return `${generateComment(block)}yield return RotateInTime("${actionType}", GetFloat(${powerPercent}), "${angleType}", GetFloat(${angle}), GetFloat(${time}));\n`;
};

Blockly.JavaScript.brakeUntilEnd = function (block) {
  const powerPercent = Blockly.JavaScript.valueToCode(
    block,
    'power_percent',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );

  return `${generateComment(block)}yield return BrakeUtilEnd(GetFloat(${powerPercent}));\n`;
};

Blockly.JavaScript.powerPercentParam = function (block) {
  const num = block.getFieldValue('NUM');
  return [`float.Parse((${num}).ToString())`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.motionAngleParam = function (block) {
  const num = block.getFieldValue('NUM');
  return [`float.Parse((${num}).ToString())`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.getMoveStatus = function (block) {
  const type = block.getFieldValue('type');
  var prefix = '(float)';
  var methodName = 'GetMoveStatus';

  if (type === 'mode') {
    prefix = '(string)';
    methodName = 'GetMoveMode';
  } else if (type === 'direction') {
    prefix = '(int)';
    methodName = 'GetDirection';
  }

  return [`${prefix}${methodName}("${type}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getValueByPositionType = function (block) {
  const type = block.getFieldValue('type');

  return [`GetValueByPositionType("${type}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
