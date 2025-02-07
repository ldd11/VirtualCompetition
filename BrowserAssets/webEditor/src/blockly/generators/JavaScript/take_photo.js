import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.takePhotoByUsbCamera = function (block) {
  const type = block.getFieldValue('delayTime');
  return `${generateComment(block)}yield return TakePhotoByUsbCamera(${type});\n`;
};

Blockly.JavaScript.usbImage = function (block) {
  return ['GetUsbImage()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.takePhotoByVirtualCamera = function (block) {
  // const delayTime = Blockly.JavaScript.valueToCode(
  //   block,
  //   'delayTime',
  //   Blockly.JavaScript.ORDER_FUNCTION_CALL
  // );
  const delayTime = block.getFieldValue('delayTime');
  const cameraDevice = block.getFieldValue('camera');

  return `${generateComment(block)}yield return TakePhotoByVirtualCamera(${delayTime}, "${cameraDevice}");\nSetPauseRun(false);\n`;
};

Blockly.JavaScript.virtualImage = function (block) {
  return ['GetVirtualImage()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.takePhotoByLocalCamera = function (block) {
  return `${generateComment(block)}yield return PhotoByLocalUpLoad();\n`;
};

Blockly.JavaScript.localImage = function (block) {
  return ['GetLocalImage()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
