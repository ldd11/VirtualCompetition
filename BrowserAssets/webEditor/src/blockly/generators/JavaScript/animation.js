import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.playSurPlace = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlaySurPlace");\n`;
};

Blockly.JavaScript.playTumble = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayTumble");\n`;
};

Blockly.JavaScript.playRedEnvelope = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayRedEnvelope");\n`;
};

Blockly.JavaScript.playDoubt = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayDoubt");\n`;
};

Blockly.JavaScript.playNod = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayNod");\n`;
};

Blockly.JavaScript.playDown = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayDown");\n`;
};

Blockly.JavaScript.playSit = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlaySit");\n`;
};

Blockly.JavaScript.playRoll = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayRoll");\n`;
};

Blockly.JavaScript.playHandShake = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayHandShake");\n`;
};

Blockly.JavaScript.playDance = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayDance");\n`;
};

Blockly.JavaScript.playFear = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayFear");\n`;
};

Blockly.JavaScript.playHappy = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayHappy");\n`;
};

Blockly.JavaScript.playBrake = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayBrake");\n`;
};

Blockly.JavaScript.playChaseTail = function (block) {
  return `${generateComment(block)}yield return PlayAnimation("PlayChaseTail");\n`;
};
