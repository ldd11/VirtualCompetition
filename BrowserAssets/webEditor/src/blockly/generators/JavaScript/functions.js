import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.TGEKey = {};
Blockly.TGEKey.returnMatchKeyCount = 0;
Blockly.TGEKey.callReturnMatchKeyCount = 0;

Blockly.JavaScript.procedures_defreturn = function (block) {
  function getReturnMathKey(index, end) {
    return `// returnMatchKey${index == 1 ? '' : index}${end ? 'end' : 'start'
      }`;
  }
  // Define a procedure with a return value.
  // First, add a 'global' statement for every variable that is not shadowed by
  // a local parameter.
  let globals = [];
  const { workspace } = block;
  // let varName;
  // let variables = Blockly.Variables.allUsedVarModels(workspace) || [];

  // 这里应该是多余的，注释掉
  //   for (var i = 0, variable; variable = variables[i]; i++) {
  //     varName = variable.name;
  //     if (block.arguments_.indexOf(varName) == -1) {
  //       globals.push(Blockly.JavaScript.variableDB_.getName(varName,
  //           Blockly.Variables.NAME_TYPE));
  //     }
  //   }

  // Add developer variables.
  const devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (let i = 0; i < devVarList.length; i++) {
    globals.push(
      Blockly.JavaScript.variableDB_.getName(
        devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE
      )
    );
  }

  globals = globals.length
    ? `${Blockly.JavaScript.INDENT}global ${globals.join(', ')}\n`
    : '';
  let funcName = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue('NAME'),
    Blockly.Procedures.NAME_TYPE
  );
  funcName = `${Blockly.IsUserBlockToCode ? '' : 'function_'}${funcName}`;
  let branch = Blockly.JavaScript.statementToCode(block, 'STACK');
  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    const id = block.id.replace(/\$/g, '$$$$'); // Issue 251.
    branch = Blockly.JavaScript.prefixLines(
      Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g, `'${id}'`),
      Blockly.JavaScript.INDENT
    ) + branch;
  }
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g, `"${block.id}"`)
      + branch;
  }
  let returnValue = Blockly.JavaScript.valueToCode(
    block,
    'RETURN',
    Blockly.JavaScript.ORDER_NONE
  ) || '';
  if (returnValue) {
    returnValue = `${Blockly.JavaScript.INDENT}return ${returnValue}\n`;
  } else if (!branch) {
    branch = ''; // Blockly.JavaScript.PASS;
  }
  const args = [];
  for (let i = 0; i < block.arguments_.length; i++) {
    args[i] = `object ${Blockly.JavaScript.variableDB_.getName(
      block.arguments_[i],
      Blockly.Variables.NAME_TYPE
    )}`;
  }
  let code = '';
  let functionBody = globals + branch + returnValue;
  let count = 1;
  while (count <= Blockly.TGEKey.returnMatchKeyCount) {
    const returnMatchKeyStart = getReturnMathKey(count, false);
    const returnMatchKeyEnd = getReturnMathKey(count, true);
    count++;
    const returnMatchKeyStartIndex = functionBody.indexOf(returnMatchKeyStart);
    const returnMatchKeyEndIndex = functionBody.indexOf(returnMatchKeyEnd);
    if (returnMatchKeyStartIndex == -1 || returnMatchKeyEndIndex == -1) {
      continue;
    }
    const tempFunctionBody = functionBody;
    const firstFunctionResultIndex = tempFunctionBody.substring(returnMatchKeyStartIndex + returnMatchKeyStart.length).indexOf('function_result');
    functionBody = functionBody.replace(tempFunctionBody.substring(returnMatchKeyStartIndex, returnMatchKeyStartIndex + returnMatchKeyStart.length + firstFunctionResultIndex), '');
    functionBody = functionBody.replace(tempFunctionBody.substring(returnMatchKeyEndIndex, returnMatchKeyEndIndex + returnMatchKeyEnd.length + 1), '\nyield break;\n');
  }
  code = `private IEnumerator ${funcName}(${args.join(', ')})
  {
    ${generateComment(block)}

    if (false)
    {
      yield return null;
    }

    if (IsUseDeterministicPhysics())
    {
      yield return SkipOneFixedUpdateAndDoNothing();
    }
    
    ${functionBody}
  }\n`;

  code = Blockly.JavaScript.scrub_(block, code);

  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_[`%${funcName}`] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.JavaScript.procedures_defnoreturn = Blockly.JavaScript.procedures_defreturn;

Blockly.JavaScript.procedures_return = function (block) {
  const returnMatchKey = Blockly.JavaScript.variableDB_.getDistinctName(
    'returnMatchKey',
    Blockly.Variables.NAME_TYPE
  );
  Blockly.TGEKey.returnMatchKeyCount++;
  let code = `${generateComment(block)}// ${returnMatchKey}start
  `;
  if (block.hasReturnValue_) {
    const value = Blockly.JavaScript.valueToCode(
      block,
      'VALUE',
      Blockly.JavaScript.ORDER_NONE
    ) || '___';
    code += `function_result = ${value};
    // ${returnMatchKey}end
    `;
  } else {
    code += `return;
    // ${returnMatchKey}end
    `;
  }
  return code;
};

Blockly.JavaScript.procedures_callreturn_ori = Blockly.JavaScript.procedures_callreturn;
Blockly.JavaScript.procedures_callreturn = function (block) {
  const callReturnMatchKey = Blockly.JavaScript.variableDB_.getDistinctName(
    'callReturnMatchKey',
    Blockly.Variables.NAME_TYPE
  );
  Blockly.TGEKey.callReturnMatchKeyCount++;
  const customFunctionVariable = Blockly.JavaScript.variableDB_.getDistinctName(
    'customFunctionVariable',
    Blockly.Variables.NAME_TYPE
  );
  const oriReturn = Blockly.JavaScript.procedures_callreturn_ori(block);
  oriReturn[0] = `function_${oriReturn[0]}`;
  oriReturn[0] = `// ${callReturnMatchKey}start
  var ${customFunctionVariable} = ${oriReturn[0]};
  yield return ${customFunctionVariable};
  // ${callReturnMatchKey}endfunction_result`;
  return oriReturn;
};

Blockly.JavaScript.procedures_callnoreturn_ori = Blockly.JavaScript.procedures_callnoreturn;
Blockly.JavaScript.procedures_callnoreturn = function (block) {
  return `${generateComment(block)}yield return function_${Blockly.JavaScript.procedures_callnoreturn_ori(
    block
  )}\n`;
};

/**
 * 函数支持拖动的参数定义
 */
Blockly.JavaScript.procedures_argument = function (block) {
  let argName = block.getFieldValue('NAME');
  argName = Blockly.JavaScript.variableDB_.getName(
    argName,
    Blockly.Variables.NAME_TYPE
  );
  return [argName, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
