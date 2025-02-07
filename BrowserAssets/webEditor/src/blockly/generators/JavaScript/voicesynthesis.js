import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.voiceSynthesisReadaloud = function (block) {
  const input = Blockly.JavaScript.valueToCode(
    block,
    'INPUT',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  return `${generateComment(block)}yield return StartVoiceSynthesis(GetString(${input}));\n`;
};

Blockly.JavaScript.voiceSynthesisReadaloudUtil = function (block) {
  const input = Blockly.JavaScript.valueToCode(
    block,
    'INPUT',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  return `${generateComment(block)}yield return StartVoiceSynthesisUtil(GetString(${input}));\n`;
};

Blockly.JavaScript.voiceSynthesisSpeakerSet = function (block) {
  const speakerType = block.getFieldValue('SPEAKER_TYPE');

  return `${generateComment(block)}SetSpeakerType(GetInt(${speakerType}));\n`;
};

Blockly.JavaScript.voiceSynthesisSpeedSet = function (block) {
  const speakerSpeed = block.getFieldValue('Speaker_Speed');
  return `${generateComment(block)}SetSpeakerSpeed(GetInt(${speakerSpeed}));\n`;
};
