import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.keyboardpresstype1 = function (block) {
  const code = block.getFieldValue('Keyboard_code');
  const eventType = block.getFieldValue('Keyboard_event_type');
  const functionName = Blockly.JavaScript.variableDB_.getDistinctName(
    'CheckKeyboardPress',
    Blockly.Variables.NAME_TYPE
  );
  const insideCodes = Blockly.JavaScript.statementToCode(block, 'DO');

  return `${generateComment(block)}WhenKeyboardPress(GetInt(${eventType}), "${code}", ${functionName});
    private IEnumerator ${functionName}()
    {
      if (false)
      {
        yield break;
      }
      
      if (IsUseDeterministicPhysics())
      {
        yield return SkipOneFixedUpdateAndDoNothing();
      }
      
      ${insideCodes}
    }\n`;
};

Blockly.JavaScript.keyboardpresstype2 = function (block) {
  const code = block.getFieldValue('Keyboard_code');
  const eventType = block.getFieldValue('Keyboard_event_type');
  return [
    `CheckKeyboardPressEvent(GetInt(${eventType}),"${code}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};
