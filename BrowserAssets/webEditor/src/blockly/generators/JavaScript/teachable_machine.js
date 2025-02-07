import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.startTMPredict = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  return `${generateComment(block)}yield return StartTMPredict("${model}", "${image}");\n`;
};

Blockly.JavaScript.checkTMPredictResultBool = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  const classType = block.getFieldValue('class_type');
  return [
    `checkTMPredictResultBool("${model}", "${image}", "${classType}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.getTMPredictResultProbability = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  return [
    `getTMPredictResultProbability("${model}", "${image}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.startTMPredictImage = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  return `${generateComment(block)}yield return StartTMPredictImage("${model}", "${image}");\n`;
};

Blockly.JavaScript.getTMPredictImageResult = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  return [
    `getTMPredictImageResult("${model}", "${image}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};


Blockly.JavaScript.checkTMPredictImageResultBool = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  const classType = block.getFieldValue('class_type');
  return [
    `checkTMPredictImageResultBool("${model}", "${image}", "${classType}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.getTMPredictImageResultProbability = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  return [
    `getTMPredictImageResultProbability("${model}", "${image}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.startTMPredictAudio = function (block) {
  const model = block.getFieldValue('model_type');
  return `${generateComment(block)}yield return StartTMPredictAudio("${model}");\n`;
};

Blockly.JavaScript.getTMPredictAudioResult = function (block) {
  const model = block.getFieldValue('model_type');
  return [
    `getTMPredictAudioResult("${model}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.checkTMPredictAudioResultBool = function (block) {
  const model = block.getFieldValue('model_type');
  const classType = block.getFieldValue('class_type');
  return [
    `checkTMPredictAudioResultBool("${model}", "${classType}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.getTMPredictAudioResultProbability = function (block) {
  const model = block.getFieldValue('model_type');
  return [
    `getTMPredictAudioResultProbability("${model}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.startTMPredictPose = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  return `${generateComment(block)}yield return StartTMPredictPose("${model}", "${image}");\n`;
};

Blockly.JavaScript.getTMPredictPoseResult = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  return [
    `getTMPredictPoseResult("${model}", "${image}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.checkTMPredictPoseResultBool = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  const classType = block.getFieldValue('class_type');
  return [
    `checkTMPredictPoseResultBool("${model}", "${image}", "${classType}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.getTMPredictPoseResultProbability = function (block) {
  const model = block.getFieldValue('model_type');
  const image = block.getFieldValue('image_type');
  return [
    `getTMPredictPoseResultProbability("${model}", "${image}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};
