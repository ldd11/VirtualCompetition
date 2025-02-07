import './JavaScript/event';
import './JavaScript/control';
import './JavaScript/math';
import './JavaScript/variable';
import './JavaScript/functions';
import './JavaScript/motion';
import './JavaScript/animation';
import './JavaScript/sensor';
import './JavaScript/ai';
import './JavaScript/extension';
import './JavaScript/sentence_recognition';
import './JavaScript/ai_chat';
import './JavaScript/face_detect';
import './JavaScript/text_translate';
import './JavaScript/detect_product';
import './JavaScript/take_photo';
import '../blocks/assets/dropdowndiv.js';
import '../blocks/assets/field_note.js';
import '../blocks/assets/field_dropdownex.js';
import './JavaScript/voicesynthesis';
import './JavaScript/textrecognition';
import './JavaScript/keyboardevent';
import './JavaScript/teachable_machine';
import './JavaScript/actuator';
import './JavaScript/pid';
import './JavaScript/power_device';
import './JavaScript/lcd';
import './JavaScript/debug';
import './JavaScript/qqcar';
import './JavaScript/planet';
import './JavaScript/robot_drone';
import './JavaScript/task';
import './JavaScript/dataSet';

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.JavaScript.init = function (workspace) {
  /**
   * Empty loops or conditionals are not allowed in Python.
   */
  Blockly.JavaScript.PASS = `${this.INDENT}//pass\n`;
  // Create a dictionary of definitions to be printed before the code.
  Blockly.JavaScript.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.JavaScript.functionNames_ = Object.create(null);

  if (!Blockly.JavaScript.variableDB_) {
    Blockly.JavaScript.variableDB_ = new Blockly.Names(
      Blockly.JavaScript.RESERVED_WORDS_
    );
  } else {
    Blockly.JavaScript.variableDB_.reset();
  }

  Blockly.JavaScript.variableDB_.setVariableMap(workspace.getVariableMap());

  const defvars = [];

  // Add developer variables (not created or named by the user).
  const devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (let i = 0; i < devVarList.length; ++i) {
    defvars.push(
      `${Blockly.JavaScript.variableDB_.getName(
        devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE
      )} = None`
    );
  }

  Blockly.JavaScript.definitions_.variables = defvars.join('\n');
};
