import userBlockController from "@/controller/userBlockController";
import { EDITOR_CALL } from "@/runtime/constant/index";
import EventUtil from "@/utils/EventUtil";

const { Blockly } = window;

// import defaultToolboxCfg from './toolbox/toolbox.xml';

// 重置Blockly参数
Blockly.Settings.flyoutWidth = 260;
Blockly.Settings.flyoutWidthDefault = 260;
Blockly.Settings.debugBarHeight = 0;
Blockly.Settings.toggleModeBarHeight = 0;
Blockly.Settings.blockHelpUrl = false;
Blockly.Settings.flyoutCategoryVariableIcon = 'variables';
Blockly.Settings.flyoutCategoryProcedureIcon = 'functions';

Blockly.Settings.isDebugMode = false;

Blockly.Flyout.prototype.MARGIN = 12;
Blockly.Flyout.prototype.GAP_Y = 18;

Blockly.IsUserBlockToCode = false;
Blockly.AlreadySetBlockXml = false;

Blockly.Generator.prototype.getCode = function (block) {
  let line = this.blockToCode(block);
  if (Array.isArray(line)) {
    line = line[0];
  }
  if (line) {
    if (block.outputConnection) {
      line = this.scrubNakedValue(line);
    }
  }
  return line;
}

Blockly.Generator.prototype.workspaceToCode = function (workspace, userBlock = false) {
  if (!workspace) {
    // Backwards compatibility from before there could be multiple workspaces.
    console.warn('No workspace specified in workspaceToCode call.  Guessing.');
    workspace = Blockly.getMainWorkspace();
  }

  let code = '';
  if (!userBlock) {
    this.init(workspace);
  }
  const blocks = workspace.getTopBlocks(true);

  // let strCode = '';
  // for (var x = 0, block; (block = blocks[x]); x++) {
  //   strCode += getCode(block);
  // }
  // console.log('[Blockly].strCode = ', strCode);

  if (!userBlock) {
    const funcMainBlocks = workspace.getBlocksByType('funcMain');
    // 如果有funcMain函数则生成代码
    if (funcMainBlocks.length == 1) {
      code = this.getCode(funcMainBlocks[0]);
    }
  }

  for (var x = 0, block; (block = blocks[x]); x++) {
    if (block.type == 'funcMain') {
      continue;
    }

    // 改动点，当顶部block有上下连接时，不生成代码
    if (block.nextConnection && block.previousConnection) {
      continue;
    }

    // 内嵌类型，也不生成代码
    if (block.inputsInline && block.outputConnection) {
      continue;
    }

    const initCodeIndex = code.indexOf('// Insert Init Code Above');
    const customCodeIndex = code.indexOf('// Insert Custom Code Above');
    const blockCode = this.getCode(block);
    if (
      block.type == 'onRecvBroadcast'
      || block.type == 'whenInfraredDepthSensorValue'
      || block.type == 'keyboardpresstype1'
    ) {
      const delimiterIndex = blockCode.indexOf('private IEnumerator');
      code = code.substring(0, initCodeIndex)
        + blockCode.substring(0, delimiterIndex)
        + code.substring(initCodeIndex, customCodeIndex)
        + blockCode.substring(delimiterIndex)
        + code.substring(customCodeIndex);
    }

  }

  if (!userBlock) {
    Blockly.IsUserBlockToCode = true;
    Blockly.JavaScript.variableDB_.setVariableMap(userBlockController.getHiddenWorkspace().getVariableMap());
    const userBlockCode = userBlockController.getRunCode();
    Blockly.IsUserBlockToCode = false;
    Blockly.JavaScript.variableDB_.setVariableMap(Blockly.mainWorkspace.getVariableMap());
    const insertCustomCodeIndex = code.indexOf('// Insert Custom Code Above');
    code = `${code.substring(0, insertCustomCodeIndex)
      + userBlockCode}
      ${code.substring(insertCustomCodeIndex)}`;
  }

  // this.function_definitions_place(code);

  // code = code.join('\n'); // Blank line between each section.
  code = this.finish(code, userBlock);
  code = this.handleCallReturnMatchKey(code);
  code = this.handleTextTranslateCode(code);
  // Final scrubbing of whitespace.
  code = code.replace(/^\s+\n/, '');
  code = code.replace(/\n\s+$/, '\n');
  code = code.replace(/[ \t]+\n/g, '\n');
  code = code.replace(/^\s*[\r\n]/gm, '');

  // console.log("[Blockly].workspaceToCode = ", code);

  return code;
};

// // 根据配置生成工作区
// export const generateWorkSpace = function (blocklyDivName, toolboxCfg = null) {
//   if (!toolboxCfg) {
//     toolboxCfg = defaultToolboxCfg;
//   }

//   return Blockly.inject(blocklyDivName, {
//     toolbox: toolboxCfg,
//     grid: {
//       spacing: 0,
//       length: 0,
//       snap: true,
//       colour: '#EBEEF0',
//       backgroundColour: '#FFFFFF'
//     },
//     media: 'https://coding.qq.com/thirdparty/blockly/1.0.1/media/',
//     trashcan: false,
//     zoom: {
//       controls: false,
//       wheel: false,
//       startScale: 0.8,
//       maxScale: 2,
//       minScale: 0.6,
//       scaleSpeed: 1.2
//     }
//   });
// };

Blockly.BlockSvg.prototype.showContextMenu_ = function (t) {
  if (!this.workspace.options.readOnly && this.contextMenu) {
    const e = this;
    const o = [];
    if (this.isMovable() && !e.isInFlyout) {
      if (
        (this.isDeletable()
          && o.push(Blockly.ContextMenu.blockDuplicateOption(e)),
          this.isEditable()
          && !this.collapsed_
          && this.workspace.options.comments
          && o.push(Blockly.ContextMenu.blockCommentOption(e)),
          !this.collapsed_)
      ) {
        for (let n = 1; n < this.inputList.length; n++) {
          if (
            this.inputList[n - 1].type != Blockly.NEXT_STATEMENT
            && this.inputList[n].type != Blockly.NEXT_STATEMENT
          ) {
            const l = {
              enabled: !0
            };
            var i = this.getInputsInline();
            (l.text = i
              ? Blockly.Msg.EXTERNAL_INPUTS
              : Blockly.Msg.INLINE_INPUTS),
              (l.callback = function () {
                e.setInputsInline(!i);
              });
            break;
          }
        }
      }
      if (this.workspace.options.collapse) {
        if (this.collapsed_) {
          const r = {
            enabled: !0
          };
          (r.text = Blockly.Msg.EXPAND_BLOCK),
            (r.callback = function () {
              e.setCollapsed(!1);
            }),
            o.push(r);
        } else {
          const c = {
            enabled: !0
          };
          (c.text = Blockly.Msg.COLLAPSE_BLOCK),
            (c.callback = function () {
              e.setCollapsed(!0);
            }),
            o.push(c);
        }
      }
      if (this.workspace.options.disable) {
        const s = {
          text: this.disabled
            ? Blockly.Msg.ENABLE_BLOCK
            : Blockly.Msg.DISABLE_BLOCK,
          enabled: !this.getInheritedDisabled(),
          callback() {
            const t = Blockly.Events.getGroup();
            t || Blockly.Events.setGroup(!0),
              e.setDisabled(!e.disabled),
              t || Blockly.Events.setGroup(!1);
          }
        };
        o.push(s);
      }
      this.isDeletable() && o.push(Blockly.ContextMenu.blockDeleteOption(e));
    }
    o.push(Blockly.ContextMenu.blockSnapshotOption(e)),
      !1 !== Blockly.Settings.blockHelpUrl
      && o.push(Blockly.ContextMenu.blockHelpOption(e)),
      this.customContextMenu && this.customContextMenu(o),
      Blockly.ContextMenu.show(t, o, this.RTL),
      (Blockly.ContextMenu.currentBlock = this);
  }
};

Blockly.JavaScript.math_arithmetic = function (a) {
  let b = {
    ADD: [' + ', Blockly.JavaScript.ORDER_ADDITION],
    MINUS: [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
    MULTIPLY: [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
    DIVIDE: [' / ', Blockly.JavaScript.ORDER_DIVISION],
    POWER: [null, Blockly.JavaScript.ORDER_COMMA]
  }[a.getFieldValue('OP')];
  const c = b[0];
  b = b[1];
  const d = Blockly.JavaScript.valueToCode(a, 'A', b) || '0';
  a = Blockly.JavaScript.valueToCode(a, 'B', b) || '0';
  return c
    ? [`GetFloat(${d})${c}GetFloat(${a})`, b]
    : [
      `Mathf.Pow(GetFloat(${d}), GetFloat(${a}))`,
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ];
};

Blockly.JavaScript.math_number = function (a) {
  a = parseFloat(a.getFieldValue('NUM'));

  if (a > (3.4e+38)) {
    a = 3.4e+38 - 1;
  }

  if (a < (-3.4e+38)) {
    a = (-3.4e+38) + 1;
  }

  return [
    `float.Parse((${a}).ToString())`,
    a >= 0
      ? Blockly.JavaScript.ORDER_ATOMIC
      : Blockly.JavaScript.ORDER_UNARY_NEGATION
  ];
};

Blockly.JavaScript.math_constrain = function (a) {
  const b = Blockly.JavaScript.valueToCode(
    a,
    'VALUE',
    Blockly.JavaScript.ORDER_COMMA
  ) || '0';
  const c = Blockly.JavaScript.valueToCode(a, 'LOW', Blockly.JavaScript.ORDER_COMMA)
    || '0';
  a = Blockly.JavaScript.valueToCode(a, 'HIGH', Blockly.JavaScript.ORDER_COMMA)
    || 'Infinity';
  return [
    `Mathf.Min(Mathf.Max(GetFloat(${b}), GetFloat(${c})), GetFloat(${a}))`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.logic_compare = function (a) {
  const b = {
    EQ: '==',
    NEQ: '!=',
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>='
  }[a.getFieldValue('OP')];
  const c = b == '==' || b == '!='
    ? Blockly.JavaScript.ORDER_EQUALITY
    : Blockly.JavaScript.ORDER_RELATIONAL;
  const d = Blockly.JavaScript.valueToCode(a, 'A', c) || '0';
  a = Blockly.JavaScript.valueToCode(a, 'B', c) || '0';
  return [`${`GetFloat(${d})` + ' '}${b} ` + `GetFloat(${a})`, c];
};

Blockly.JavaScript.finish = function (a, userBlock) {
  const b = [];
  let c;
  for (c in Blockly.JavaScript.definitions_) b.push(Blockly.JavaScript.definitions_[c]);
  delete Blockly.JavaScript.definitions_;
  delete Blockly.JavaScript.functionNames_;
  const insertVarsAndListsIndex = a.indexOf('// Insert Variables and Lists Above');
  const insertCustomCodeIndex = a.indexOf('// Insert Custom Code Above');
  let varsAndListsDefineCode = '';
  const varsAndLists = Blockly.Variables.allUsedVarModels(userBlock ? userBlockController.getHiddenWorkspace() : Blockly.mainWorkspace);
  let hasList = false;
  Blockly.JavaScript.variableDB_.setVariableMap(userBlock ? userBlockController.getHiddenWorkspace().getVariableMap() : Blockly.mainWorkspace.getVariableMap());
  for (let i = 0; i < varsAndLists.length; i++) {
    const varName = Blockly.JavaScript.variableDB_.getName(varsAndLists[i].id_, Blockly.Variables.NAME_TYPE);
    if (varsAndLists[i].type == 'Array') {
      hasList = true;
      let listDefCode = `private List<object> list_${varName} = new List<object>();`;
      if (a.indexOf(listDefCode) == -1) {
        varsAndListsDefineCode += `${listDefCode}\n`;
      }
    } else {
      let varDefCode = `private object var_${varName} = null;`;
      if (a.indexOf(varDefCode) == -1) {
        varsAndListsDefineCode += `${varDefCode}\n`;
      }
    }
  }
  if (hasList) {
    let tempListDefCode = `private List<object> tempList = new List<object>();`;
    if (a.indexOf(tempListDefCode) == -1) {
      varsAndListsDefineCode += `${tempListDefCode}\n`;
    }
  }
  Blockly.JavaScript.variableDB_.reset();
  return `${a.substring(0, insertVarsAndListsIndex)
    + varsAndListsDefineCode
    + a.substring(insertVarsAndListsIndex, insertCustomCodeIndex)
    + b.join('\n')}\n${a.substring(insertCustomCodeIndex)}`;
};

Blockly.JavaScript.handleCallReturnMatchKey = function (code) {
  function getCallReturnMathchKey(index, postfix) {
    return `// callReturnMatchKey${index == 1 ? '' : index}${postfix}`;
  }
  let count = 1;
  while (true) {
    const callReturnMatchKeyStart = getCallReturnMathchKey(count, 'start');
    const callReturnMatchKeyEnd = getCallReturnMathchKey(count, 'end');
    const callReturnMatchKeyStartIndex = code.indexOf(callReturnMatchKeyStart);
    const callReturnMatchKeyEndIndex = code.indexOf(callReturnMatchKeyEnd);
    if (callReturnMatchKeyStartIndex == -1 || callReturnMatchKeyEndIndex == -1) {
      break;
    }
    const beforeMatchKeyStartIndexLastNewLineIndex = code.substring(0, callReturnMatchKeyStartIndex).lastIndexOf('\n');
    code = `${code.substring(0, beforeMatchKeyStartIndexLastNewLineIndex)}
    ${code.substring(
      callReturnMatchKeyStartIndex,
      callReturnMatchKeyEndIndex + callReturnMatchKeyEnd.length
    )}${code.substring(
      beforeMatchKeyStartIndexLastNewLineIndex,
      callReturnMatchKeyStartIndex
    )}${code.substring(
      callReturnMatchKeyEndIndex + callReturnMatchKeyEnd.length
    )}`;
    count++;
  }
  return code;
};

Blockly.JavaScript.handleTextTranslateCode = function (code) {
  const textTranslateStart = '// yield return StartTextTranslate';
  const textTranslateMiddle = '// MiddleTextTranslate';
  const textTranslateEnd = '// EndTextTranslate';
  while (true) {
    const textTranslateStartIndex = code.indexOf(textTranslateStart);
    const textTranslateMiddleIndex = code.indexOf(textTranslateMiddle);
    const textTranslateEndIndex = code.indexOf(textTranslateEnd);
    if (
      textTranslateStartIndex === -1
      || textTranslateMiddleIndex === -1
      || textTranslateEndIndex === -1
    ) {
      break;
    }
    let startCall = code.substring(
      textTranslateStartIndex,
      textTranslateMiddleIndex - 1
    );
    startCall = `\t${startCall.replace('// ', '')}`;
    const beforeMatchKeyStartIndexLastNewLineIndex = code
      .substring(0, textTranslateStartIndex)
      .lastIndexOf('\n');
    const s1 = `${code.substring(
      0,
      beforeMatchKeyStartIndexLastNewLineIndex
    )}\n`;
    const s2 = code.substring(
      beforeMatchKeyStartIndexLastNewLineIndex + 1,
      textTranslateStartIndex
    );
    const s3 = code
      .substring(
        textTranslateMiddleIndex + textTranslateMiddle.length + 1,
        textTranslateEndIndex - 3
      )
      .trim();
    const s4 = code.substring(textTranslateEndIndex + textTranslateEnd.length);
    code = s1 + startCall + s2 + s3 + s4;
  }
  return code;
};

/**
 * Play a named sound at specified volume.  If volume is not specified,
 * use full volume (1).
 * @param {string} name Name of sound.
 * @param {number=} opt_volume Volume of sound (0-1).
 */
Blockly.WorkspaceAudio.prototype.play = function (name, opt_volume) {
  if (window.disableAudio) return;

  let volume = 1.0;
  if (window.audioVolume != undefined) {
    volume = window.audioVolume;
  }

  console.log('volume = ', volume);

  const sound = this.SOUNDS_[name];
  if (sound) {
    // Don't play one sound on top of another.
    const now = new Date();
    if (
      this.lastSound_ != null
      && now - this.lastSound_ < Blockly.SOUND_LIMIT
    ) {
      return;
    }
    this.lastSound_ = now;
    let mySound;
    const ie9 = goog.userAgent.DOCUMENT_MODE && goog.userAgent.DOCUMENT_MODE === 9;
    if (ie9 || goog.userAgent.IPAD || goog.userAgent.ANDROID) {
      // Creating a new audio node causes lag in IE9, Android and iPad. Android
      // and IE9 refetch the file from the server, iPad uses a singleton audio
      // node which must be deleted and recreated for each new audio tag.
      mySound = sound;
    } else {
      mySound = sound.cloneNode();
    }
    // mySound.volume = (opt_volume === undefined ? volume : opt_volume);

    mySound.volume = volume;
    mySound.play();
  } else if (this.parentWorkspace_) {
    // Maybe a workspace on a lower level knows about this sound.
    this.parentWorkspace_.getAudioManager().play(name, volume);
  }
};

/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<string>} Array of variable names.
 * @this {Blockly.FieldVariable}
 */
Blockly.FieldVariable.dropdownCreate = function () {
  if (!this.variable_) {
    throw Error('Tried to call dropdownCreate on a variable field with no' +
      ' variable selected.');
  }
  var name = this.getText();
  var workspace = null;
  if (this.sourceBlock_) {
    workspace = this.sourceBlock_.workspace;
  }
  var variableModelList = [];
  if (workspace) {
    var variableTypes = this.getVariableTypes_();
    // Get a copy of the list, so that adding rename and new variable options
    // doesn't modify the workspace's list.
    for (var i = 0; i < variableTypes.length; i++) {
      var variableType = variableTypes[i];
      var variables = workspace.getVariablesOfType(variableType);
      variableModelList = variableModelList.concat(variables);
    }
  }
  variableModelList.sort(Blockly.VariableModel.compareByName);

  var options = [];
  for (var i = 0; i < variableModelList.length; i++) {
    // Set the UUID as the internal representation of the variable.
    options[i] = [variableModelList[i].name, variableModelList[i].getId()];
  }
  options.push([Blockly.Msg['RENAME_VARIABLE'].replace('变量', this.variable_.type == 'Array' ? '列表' : '变量'), Blockly.RENAME_VARIABLE_ID]);
  if (Blockly.Msg['DELETE_VARIABLE'].replace('变量', this.variable_.type == 'Array' ? '列表' : '变量')) {
    options.push(
      [
        Blockly.Msg['DELETE_VARIABLE'].replace('%1', name).replace('变量', this.variable_.type == 'Array' ? '列表' : '变量'),
        Blockly.DELETE_VARIABLE_ID
      ]
    );
  }

  return options;
};

Blockly.Variables.nameUsedWithSameType_ = function (name, type, workspace) {
  var allVariables = workspace.getVariableMap().getAllVariables();

  name = name.toLowerCase();
  for (var i = 0, variable; variable = allVariables[i]; i++) {
    if (variable.name.toLowerCase() == name && (variable.type == type || (variable.type == 'Variable' && type == '') || (variable.type == '' && type == 'Variable'))) {
      return variable;
    }
  }
  return null;
};

Blockly.Variables.renameVariable = function (workspace, variable, opt_callback) {
  // This function needs to be named so it can be called recursively.
  var promptAndCheckWithAlert = function (defaultName) {
    var showVariableName = variable.name;
    if (showVariableName.length > 7) {
      showVariableName = showVariableName.substr(0, 7) + '...';
    }
    var promptText = Blockly.Msg['RENAME_VARIABLE_TITLE'].replace('%1', showVariableName).replace('变量', variable.type == 'Array' ? '列表' : '变量');

    Blockly.Variables.promptName(promptText, defaultName,
      function (newName) {
        if (newName) {
          var existingSameType = Blockly.Variables.nameUsedWithSameType_(newName, variable.type, workspace);
          if (existingSameType) {
            var existingSameTypeMsg = '名字叫”%1“的变量已经存在了'.replace('%1', newName.toLowerCase()).replace('变量', variable.type == 'Array' ? '列表' : '变量');
            Blockly.alert(existingSameTypeMsg, function () {
              promptAndCheckWithAlert(newName);  // Recurse
            });
          } else {
            workspace.renameVariableById(variable.getId(), newName);
            if (opt_callback) {
              opt_callback(newName);
            }
          }
        } else {
          // User canceled prompt.
          if (opt_callback) {
            opt_callback(null);
          }
        }
      });
  };
  promptAndCheckWithAlert('');
};

/**
 * Handles "Create Variable" button in the default variables toolbox category.
 * It will prompt the user for a varibale name, including re-prompts if a name
 * is already in use among the workspace's variables.
 *
 * Custom button handlers can delegate to this function, allowing variables
 * types and after-creation processing. More complex customization (e.g.,
 * prompting for variable type) is beyond the scope of this function.
 *
 * @param {!Blockly.Workspace} workspace The workspace on which to create the
 *     variable.
 * @param {function(?string=)=} opt_callback A callback. It will be passed an
 *     acceptable new variable name, or null if change is to be aborted (cancel
 *     button), or undefined if an existing variable was chosen.
 * @param {string=} opt_type The type of the variable like 'int', 'string', or
 *     ''. This will default to '', which is a specific type.
 */
Blockly.Variables.createVariableButtonHandler = function (workspace, opt_callback, opt_type) {
  var type = opt_type || '';
  // This function needs to be named so it can be called recursively.
  var promptAndCheckWithAlert = function (defaultName) {
    Blockly.Variables.promptName(Blockly.Msg['NEW_VARIABLE_TITLE'], defaultName,
      function (text) {
        if (text) {
          var existing = Blockly.Variables.nameUsedWithSameType_(text, type, workspace);
          if (existing) {
            var lowerCase = text.toLowerCase();
            var msg = Blockly.Msg['VARIABLE_ALREADY_EXISTS'].replace('%1', lowerCase).replace('变量', type == 'Array' ? '列表' : '变量');
            Blockly.alert(msg,
              function () {
                promptAndCheckWithAlert(text);  // Recurse
              });
          } else {
            // No conflict
            workspace.createVariable(text, type);
            if (opt_callback) {
              opt_callback(text);
            }
          }
        } else {
          // User canceled prompt.
          if (opt_callback) {
            opt_callback(null);
          }
        }
      });
  };
  promptAndCheckWithAlert('');
};

Blockly.FieldGridDropdown.prototype.caculatePosition = function (field, bBox) {
  const primaryX = bBox.left + (bBox.right - bBox.left) / 2;
  const primaryY = bBox.bottom;
  // If we can't fit it, render above the entire parent block.
  const secondaryX = primaryX;
  let secondaryY = bBox.top;

  // const blockH = this.sourceBlock_.height;
  const menuH = this.menu.getElement().offsetHeight;
  let yMax = document.body.offsetHeight - menuH;
  secondaryY = secondaryY > yMax ? secondaryY - menuH : secondaryY + 30;
  this.menu.getElement().parentNode.style.top = `${secondaryY}px`;

};

Blockly.JavaScript.quote_ = function (string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\\n')
    .replace(/'/g, '\\\'')
    .replace(/"/g, '\\\"');
  return '\"' + string + '\"';
};

Blockly.FieldSlider.prototype.addSlider_ = function (contentDiv, type) {
  var container = this.createLabelDom(type);
  contentDiv.appendChild(container);
  var slider = new goog.ui.Slider();
  this['slider' + type] = slider;
  slider.setMoveToPointEnabled(false);
  if (this.step_) {
    slider.setUnitIncrement(this.step_);
    slider.setStep(this.step_);
  }
  slider.setMinimum(this.min_);
  slider.setMaximum(this.max_);
  slider.setRightToLeft(this.sourceBlock_.RTL);

  var value = parseFloat(this.getValue());
  value = isNaN(value) ? 0 : value;
  if (type == 0) {
    // slider1 not visible at this time
    slider.setValue(value);
  }
  slider.render(contentDiv);

  // Configure event handler.
  var thisField = this;
  this['changeEventKey_' + type] = goog.events.listen(slider,
    goog.ui.Component.EventType.CHANGE,
    function (event) {
      var val = event.target.getValue() || 0;
      if (val == "-") {
        return;
      }
      if (Blockly.draggingSlider) {
        var datas = thisField.step_.toString().split(".");
        var dot = 0;
        if (datas.length > 1) {
          dot = datas[1].length;
        }
        val = val.toFixed(dot);
      }
      if (thisField.sourceBlock_) {
        // Call any validation function, and allow it to override.
        val = thisField.callValidator(val);
      }
      if (val !== null) {
        thisField.setValue(val);
        if (thisField.html) {
          thisField.html.value = val;
          thisField.html.focus();
        }
        var htmlInput = Blockly.FieldTextInput.htmlInput_;
        if (htmlInput) {
          //htmlInput.value = val;
          //Blockly.FieldTextInput.focus();
          //Blockly.WidgetDiv.hide();
        }
      }
    });

  this['focusEventKey_' + type] = goog.events.listen(slider.getElement(),
    goog.ui.Component.EventType.FOCUS,
    function (/*event*/) {
      // Switch focus to the HTML input field
      var htmlInput = Blockly.FieldTextInput.htmlInput_;
      if (htmlInput) {
        Blockly.FieldTextInput.focus();
      }
    });
};

Blockly.FieldSlider.prototype.updateSliderHandles_ = function () {
  if (this['slider0']) {
    if (this.getValue() === '-') {
      this['slider0'].setValue('-');
    } else {
      this['slider0'].setValue(parseFloat(this.getValue()));
    }
  }
  if (this['slider1']) {
    this['slider1'].setValue(parseFloat(this.getValue()));
  }
};

Blockly.FieldSlider.prototype.onHtmlInputChange_ = function (e) {
  Blockly.FieldSlider.superClass_.onHtmlInputChange_.call(this, e);
  if (this['slider0']) {
    if (this.getValue() === '-') {
      this['slider0'].setValue('-');
    } else {
      this['slider0'].setValue(parseFloat(this.getValue()));
    }
  }
  if (this['slider1']) {
    this['slider1'].setValue(parseFloat(this.getValue()));
  }
};

goog.ui.RangeModel.prototype.roundToStepWithMin = function (value) {
  if (this.step_ == null) return value;
  if (value == '-') return value;
  if (!Blockly.draggingSlider) return value;

  return this.minimum_ + Math.round((value - this.minimum_) / this.step_) * this.step_;
};

goog.ui.SliderBase.prototype.handleBeforeDrag_ = function (e) {
  Blockly.draggingSlider = true;
  var thumbToDrag =
    e.dragger == this.valueDragger_ ? this.valueThumb : this.extentThumb;
  var value;
  if (this.orientation_ == goog.ui.SliderBase.Orientation.VERTICAL) {
    var availHeight = this.getElement().clientHeight - thumbToDrag.offsetHeight;
    value = (availHeight - e.top) / availHeight *
      (this.getMaximum() - this.getMinimum()) +
      this.getMinimum();
  } else {
    var availWidth = this.getElement().clientWidth - thumbToDrag.offsetWidth;
    value = (e.left / availWidth) * (this.getMaximum() - this.getMinimum()) +
      this.getMinimum();
  }
  // Bind the value within valid range before calling setThumbPosition_.
  // This is necessary because setThumbPosition_ is a no-op for values outside
  // of the legal range. For drag operations, we want the handle to snap to the
  // last valid value instead of remaining at the previous position.
  if (e.dragger == this.valueDragger_) {
    value = Math.min(
      Math.max(value, this.getMinimum()), this.getValue() + this.getExtent());
  } else {
    value = Math.min(Math.max(value, this.getValue()), this.getMaximum());
  }
  this.setThumbPosition_(thumbToDrag, value);
};

goog.ui.SliderBase.prototype.handleThumbDragStartEnd_ = function (e) {
  Blockly.draggingSlider = false;
  var isDragStart = e.type == goog.fx.Dragger.EventType.START;
  goog.dom.classlist.enable(
    goog.asserts.assertElement(this.getElement()),
    goog.ui.SliderBase.SLIDER_DRAGGING_CSS_CLASS_, isDragStart);
  goog.dom.classlist.enable(
    goog.asserts.assertElement(e.target.handle),
    goog.ui.SliderBase.THUMB_DRAGGING_CSS_CLASS_, isDragStart);
  var isValueDragger = e.dragger == this.valueDragger_;
  if (isDragStart) {
    this.dispatchEvent(goog.ui.SliderBase.EventType.DRAG_START);
    this.dispatchEvent(
      isValueDragger ? goog.ui.SliderBase.EventType.DRAG_VALUE_START :
        goog.ui.SliderBase.EventType.DRAG_EXTENT_START);
  } else {
    this.dispatchEvent(goog.ui.SliderBase.EventType.DRAG_END);
    this.dispatchEvent(
      isValueDragger ? goog.ui.SliderBase.EventType.DRAG_VALUE_END :
        goog.ui.SliderBase.EventType.DRAG_EXTENT_END);
  }
};

Blockly.BlockSvg.prototype.renderJaggedEdge_ = function (pathObject, row,
  cursor) {
  var steps = pathObject.steps;
  var highlightSteps = pathObject.highlightSteps;
  var input = row[0];
  this.renderFields_(input.fieldRow, cursor.x, cursor.y, row.height, row.thicker);
  steps.push(Blockly.BlockSvg.JAGGED_TEETH);
  highlightSteps.push('m 0,0 h 8');
  var remainder = row.height - Blockly.BlockSvg.JAGGED_TEETH_HEIGHT;
  steps.push('v', remainder);
  if (this.RTL) {
    highlightSteps.push('v 3.9 l 7.2,3.4 m -14.5,8.9 l 7.3,3.5');
    highlightSteps.push('v', remainder - 0.7);
  }
  this.width += Blockly.BlockSvg.JAGGED_TEETH_WIDTH;
};

/**
 * Show and populate the flyout.
 * @param {!Array|string} xmlList List of blocks to show.
 *     Variables and procedures have a custom set of blocks.
 */
Blockly.Flyout.prototype.show = function (xmlList) {
  if (!Blockly.AlreadySetBlockXml) {
    return;
  }

  this.workspace_.setResizesEnabled(false);
  this.hide();
  this.clearOldBlocks_();

  // Handle dynamic categories, represented by a name instead of a list of XML.
  // Look up the correct category generation function and call that to get a
  // valid XML list.
  if (typeof xmlList == 'string') {
    var fnToApply = this.workspace_.targetWorkspace.getToolboxCategoryCallback(
      xmlList);
    if (typeof fnToApply != 'function') {
      throw TypeError('Couldn\'t find a callback function when opening' +
        ' a toolbox category.');
    }
    xmlList = fnToApply(this.workspace_.targetWorkspace);
    if (!Array.isArray(xmlList)) {
      throw TypeError('Result of toolbox category callback must be an array.');
    }
  }

  this.setVisible(true);
  // Create the blocks to be shown in this flyout.
  var contents = [];
  var gaps = [];
  this.permanentlyDisabled_.length = 0;
  for (var i = 0, xml; xml = xmlList[i]; i++) {
    if (xml.tagName) {
      var tagName = xml.tagName.toUpperCase();
      var default_gap = this.horizontalLayout_ ? this.GAP_X : this.GAP_Y;
      if (tagName == 'BLOCK') {
        var curBlock = Blockly.Xml.domToBlock(xml, this.workspace_);
        if (curBlock.disabled) {
          // Record blocks that were initially disabled.
          // Do not enable these blocks as a result of capacity filtering.
          this.permanentlyDisabled_.push(curBlock);
        }
        contents.push({ type: 'block', block: curBlock });
        var gap = parseInt(xml.getAttribute('gap'), 10);
        gaps.push(isNaN(gap) ? default_gap : gap);
      } else if (tagName == 'SEP') {
        // Change the gap between two blocks.
        // <sep gap="36"></sep>
        // The default gap is 24, can be set larger or smaller.
        // This overwrites the gap attribute on the previous block.
        // Note that a deprecated method is to add a gap to a block.
        // <block type="math_arithmetic" gap="8"></block>
        var newGap = parseInt(xml.getAttribute('gap'), 10);
        // Ignore gaps before the first block.
        if (!isNaN(newGap) && gaps.length > 0) {
          gaps[gaps.length - 1] = newGap;
        } else {
          gaps.push(default_gap);
        }
      } else if (tagName == 'BUTTON' || tagName == 'LABEL') {
        // Labels behave the same as buttons, but are styled differently.
        var isLabel = tagName == 'LABEL';
        var curButton = new Blockly.FlyoutButton(this.workspace_,
          this.targetWorkspace_, xml, isLabel);
        contents.push({ type: 'button', button: curButton });
        gaps.push(default_gap);
      } else if (tagName == "FOREIGNOBJECT") {
        var id = xml.id;
        var height = this.foreignObjectHeightMap[id];
        var top = this.foreignObjectTopMap[id];
        if (!top) top = 0;
        var foreignObject_ = Blockly.utils.createSvgElement('foreignObject',
          {
            'width': `${this.getWidth() / this.workspace_.scale}px`,
            'height': `${height / this.workspace_.scale}px`,
            'x': 0, 'y': top
          },
          this.workspace_.getCanvas());
        var body = document.createElementNS(Blockly.HTML_NS, 'body');
        body.setAttribute('xmlns', Blockly.HTML_NS);
        body.className = 'blocklyFlyoutForeignBody';

        var container = document.createElementNS(Blockly.HTML_NS, 'div');
        container.className = 'blocklyFlyoutForeignObject';
        container.id = id;
        body.appendChild(container);
        foreignObject_.appendChild(body);

        this.foreignObjectStartRender(id);

        this.flyoutForeignObject_ = foreignObject_;

        contents.push({ type: 'foreignObject', foreignObject: foreignObject_ });
      }
    }
  }

  this.layout_(contents, gaps);

  // IE 11 is an incompetent browser that fails to fire mouseout events.
  // When the mouse is over the background, deselect all blocks.
  var deselectAll = function () {
    var topBlocks = this.workspace_.getTopBlocks(false);
    for (var i = 0, block; block = topBlocks[i]; i++) {
      block.removeSelect();
    }
  };

  this.listeners_.push(Blockly.bindEventWithChecks_(this.svgBackground_,
    'mouseover', this, deselectAll));

  if (this.horizontalLayout_) {
    this.height_ = 0;
  } else {
    this.width_ = 0;
  }
  this.workspace_.setResizesEnabled(true);
  this.reflow();

  this.filterForCapacity_();

  // Correctly position the flyout's scrollbar when it opens.
  this.position();

  this.reflowWrapper_ = this.reflow.bind(this);
  this.workspace_.addChangeListener(this.reflowWrapper_);
};

function hasCategories(node) {
  var has = false;
  if (node && node.childNodes) {
    for (var i = 0, child; child = node.childNodes[i]; i++) {
      if (!child.tagName) {
        // Skip over text.
        continue;
      }
      if (child.tagName.toUpperCase() === 'CATEGORY') {
        has = true;
        break;
      }
      if (child.tagName.toUpperCase() === 'BLOCK') {
        has = false;
        break;
      }
    }
  }
  return has;
}

Blockly.Toolbox.prototype.syncTrees_ = function (treeIn, treeOut, pathToMedia) {
  var openNode = null;
  var lastElement = null;
  
  // <!-- 扣叮添加
  var styles = [];
  // -->
  
  for (var i = 0, childIn; childIn = treeIn.childNodes[i]; i++) {
    if (!childIn.tagName) {
      // Skip over text.
      continue;
    }
    switch (childIn.tagName.toUpperCase()) {
      case 'CATEGORY':
        // Decode the category name for any potential message references
        // (eg. `%{BKY_CATEGORY_NAME_LOGIC}`).
        var categoryName = Blockly.utils.replaceMessageReferences(
          childIn.getAttribute('name'));
        var childOut = this.tree_.createNode(categoryName);
        
        // <!-- 扣叮添加
        var className = childIn.getAttribute('className') || '';
        var icon = childIn.getAttribute('icon') || '';
        var classNameForIcon = '';
        var classNameForColor = '';
        if (icon) {
          if (/^http(s)?:\/\//.test(icon)) { // icon 为 url 的情况
            var tmpClass = 'blocklyTreeRowIcon_' + Blockly.utils.genUid();
            var style = `.${tmpClass} .blocklyTreeIcon::before{
              background-image: url(${icon});
            }`;
            classNameForIcon = 'blocklyTreeRowIcon ' + tmpClass;
            styles.push(style);
          } else {
            classNameForIcon = 'blocklyTreeRowIcon blocklyTreeRowIcon_' + icon;
          }
        }

        // Decode the colour for any potential message references
        // (eg. `%{BKY_MATH_HUE}`).
        var colour = Blockly.utils.replaceMessageReferences(
          childIn.getAttribute('colour'));
        if (colour === null || colour === '') {
          // No attribute. No colour.
          childOut.hexColour = '';
        } else if (/^#[0-9a-fA-F]{6}$/.test(colour)) {
          childOut.hexColour = colour;
          this.hasColours_ = true;
        } 
        // <!-- 扣叮添加：兼容 #000 的情况
        else if (/^#[0-9a-fA-F]{3}$/.test(colour)) {
          childOut.hexColour = colour;
          this.hasColours_ = true;
        } 
        // -->
        else if (typeof colour === 'number' ||
          (typeof colour === 'string' && !isNaN(Number(colour)))) {
          childOut.hexColour = Blockly.hueToRgb(Number(colour));
          this.hasColours_ = true;
        } else {
          childOut.hexColour = '';
          console.warn('Toolbox category "' + categoryName +
            '" has unrecognized colour attribute: ' + colour);
        }

        // <!-- 扣叮添加：icon 背景颜色处理
        if (childOut.hexColour) {
          var rgb = goog.color.hexToRgb(childOut.hexColour);
          var rgba = rgb.concat(0.15);
          classNameForColor = 'blocklyTreeRowColor_' + Blockly.utils.genUid();
          var style = `.${classNameForColor} .blocklyTreeIcon{
            color: ${childOut.hexColour};
            background: rgba(${rgba.join(', ')});
          }`;
          styles.push(style);
        }
        // -->

        // <!-- 扣叮添加
        var tag = childIn.getAttribute('tag');
        var classNameForTag = '';
        if (tag) {
          classNameForTag = 'blocklyTreeRowTag_' + tag;
        }
        // -->
        
        // <!-- 扣叮添加
        childOut.className_ = className + ' ' + classNameForIcon + ' ' + classNameForColor + ' ' + classNameForTag;
        // -->

        // <!-- 扣叮添加：是否包含分类，有分类的话，添加额外的 class
        var hasCategories_ = hasCategories(childIn);
        if (hasCategories_) {
          childOut.className_ += ' ' + 'blocklyTreeRowContainer_parent';
        }
        // -->

        childOut.blocks = [];
        treeOut.add(childOut);

        // <!-- 扣叮添加：拓展积木分类监听鼠标右键点击
        var extensionId = childIn.getAttribute('extensionId') || '';
        if (extensionId) {
          var childOutElement = childOut.getElement();
          if (childOutElement) {
            childOutElement.addEventListener('contextmenu', (function(extensionId) {
              return function (event) {
                var menuOptions = [];
                var deleteCategoryOption = { enabled: true };
                deleteCategoryOption.text = '删除扩展';
                deleteCategoryOption.callback = function () {
                  EventUtil.emit(EDITOR_CALL.DELETE_EXTENSION, extensionId);
                };
                menuOptions.push(deleteCategoryOption);
                Blockly.ContextMenu.show(event, menuOptions, false);
              }
            })(extensionId));
          }
        }
        // -->

        var custom = childIn.getAttribute('custom');
        if (custom) {
          // Variables and procedures are special dynamic categories.
          childOut.blocks = custom;
        } else {
          var newOpenNode = this.syncTrees_(childIn, childOut, pathToMedia);
          if (newOpenNode) {
            openNode = newOpenNode;
          }
        }
        
        if (childIn.getAttribute('expanded') == 'true') {
          if (childOut.blocks.length) {
            // This is a category that directly contains blocks.
            // After the tree is rendered, open this category and show flyout.
            openNode = childOut;
          }
          childOut.setExpanded(true);
        } else {
          childOut.setExpanded(false);
        }
        lastElement = childIn;
        break;
      case 'SEP':
        if (lastElement) {
          if (lastElement.tagName.toUpperCase() == 'CATEGORY') {
            // Separator between two categories.
            // <sep></sep>
            treeOut.add(new Blockly.Toolbox.TreeSeparator(
              this.treeSeparatorConfig_));
          } else {
            // Change the gap between two blocks.
            // <sep gap="36"></sep>
            // The default gap is 24, can be set larger or smaller.
            // Note that a deprecated method is to add a gap to a block.
            // <block type="math_arithmetic" gap="8"></block>
            var newGap = parseFloat(childIn.getAttribute('gap'));
            if (!isNaN(newGap) && lastElement) {
              lastElement.setAttribute('gap', newGap);
            }
          }
        }
        break;
      case 'BLOCK':
        // <!-- 扣叮添加：隐藏有 hide 属性的积木
        var hideValue = childIn.getAttribute('hide');
        if(!(hideValue && hideValue === 'true')){
          treeOut.blocks.push(childIn);
          lastElement = childIn;
        }
        break;
        // -->
      case 'SHADOW':
      case 'LABEL':
      case 'BUTTON':
      case 'FOREIGNOBJECT':
        treeOut.blocks.push(childIn);
        childIn.setAttribute('icon', treeIn.getAttribute('icon'));
        lastElement = childIn;
        break;
    }
  }

  // <!-- 扣叮添加：写入样式
  if (styles.length) {
    var styleNode = document.createElement('style');
    styleNode.type = 'text/css';
    var css = styles.join('\n');
    var cssNode = document.createTextNode(css);
    styleNode.appendChild(cssNode);
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(styleNode);
  } 
  // -->

  return openNode;
};