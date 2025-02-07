import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

// Blockly.JavaScript.LCDClear = function (block) {
//   const id = block.getFieldValue('LCD');
//   return `ClearDisplayScreen("${id}");\n`;
// };

Blockly.JavaScript.LCDSetBgColor = function (block) {
  return '';
};

Blockly.JavaScript.LCDSetFontSize = function (block) {
  return '';
};

Blockly.JavaScript.LCDShowStringOnNthLine = function (block) {
  const id = block.getFieldValue('LCD');
  const input = Blockly.JavaScript.valueToCode(
    block,
    'str',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );

  return `${generateComment(block)}DisplayScreenShowText("${id}", GetString(${input}));\n`;
};

Blockly.JavaScript.LEDSetColor = function (block) {
  const id = block.getFieldValue('LED');
  const color = block.getFieldValue('color');
  return `${generateComment(block)}LightsDisplayScreenShow("${id}", "${color}");\n`;
};

Blockly.JavaScript.LEDSetColorWithSecond = function (block) {
  const id = block.getFieldValue('LED');
  const color = block.getFieldValue('color');
  const sec = Blockly.JavaScript.valueToCode(
    block,
    'SEC',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}LightsDisplayScreenShow("${id}", "${color}", GetFloat(${sec}));
  yield return Wait(GetFloat(${sec}));
  LightsDisplayScreenShow("${id}", "#000000");\n`;
};

Blockly.JavaScript.LEDSetRgb = function (block) {
  const id = block.getFieldValue('LED');
  const r = Blockly.JavaScript.valueToCode(
    block,
    'R',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const g = Blockly.JavaScript.valueToCode(
    block,
    'G',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const b = Blockly.JavaScript.valueToCode(
    block,
    'B',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  return `${generateComment(block)}LightsDisplayScreenShow("${id}", GetFloat(${r}), GetFloat(${g}), GetFloat(${b}));\n`;
};

Blockly.JavaScript.LEDSetRgbWithSecond = function (block) {
  const id = block.getFieldValue('LED');
  const r = Blockly.JavaScript.valueToCode(
    block,
    'R',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const g = Blockly.JavaScript.valueToCode(
    block,
    'G',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const b = Blockly.JavaScript.valueToCode(
    block,
    'B',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const sec = Blockly.JavaScript.valueToCode(
    block,
    'SEC',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}LightsDisplayScreenShow("${id}", GetFloat(${r}), GetFloat(${g}), GetFloat(${b}));
  yield return Wait(GetFloat(${sec}));
  LightsDisplayScreenShow("${id}", 0, 0, 0);\n`;
};

Blockly.JavaScript.LEDAddBrightness = function (block) {
  const id = block.getFieldValue('LED');
  const brightness = Blockly.JavaScript.valueToCode(
    block,
    'brightness',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 10;
  return `${generateComment(block)}LightsDisplayChangeBrightness("${id}", GetFloat(${brightness}));\n`;
};

Blockly.JavaScript.LEDSetBrightness = function (block) {
  const id = block.getFieldValue('LED');
  const brightness = Blockly.JavaScript.valueToCode(
    block,
    'brightness',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 10;
  return `${generateComment(block)}LightsDisplaySetBrightness("${id}", GetFloat(${brightness}));\n`;
};

Blockly.JavaScript.LEDGetBrightness = function (block) {
  const id = block.getFieldValue('LED');
  return [`LightsDisplayGetBrightness("${id}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.brightnessParam1 = function (block) {
  const num = block.getFieldValue('NUM');
  return [num, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.brightnessParam2 = function (block) {
  const num = block.getFieldValue('NUM');
  return [num, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.rgbParam = function (block) {
  const num = block.getFieldValue('NUM');
  return [`float.Parse((${num}).ToString())`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.moveArmPincher = function (block) {
  const id = block.getFieldValue('id');
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

  return `${generateComment(block)}yield return MoveArmPincher("${id}", GetFloat(${x}), GetFloat(${y}), GetFloat(${z}), "${action}");\n`;
};
