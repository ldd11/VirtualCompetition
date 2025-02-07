export const BlockCommonApi = {
  CallUnityApi: 'callUnityApi',
  CallUnityApiUntilEnd: 'callUnityApiUntilEnd',
  CallJsApi: 'callJsApi',
}

export const BlockArgType = {
  InputValue: 'input_value',
  FieldDropdown: 'field_dropdown',
  Constant: 'constant'
};

export const BlockCheck = {
  Number: 'Number',
  String: 'String',
  Function: 'Function',
  Var: 'Var'
};

export function getBlockInputValue(block, key) {
  const value = Blockly.JavaScript.valueToCode(
    block,
    key,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  return value;
}

export function getBlockFieldDropdown(block, key) {
  const value = block.getFieldValue(key);
  return value;
}

export function statementToCode(block, key) {
  const codes = Blockly.JavaScript.statementToCode(block, key);
  return codes;
}

// 有返回值的积木
export function generateCommonBlockApiWithReturn(block, apiName, args = []) {
  return generateCommonBlock(block, apiName, true, args);
}

// 无返回值的积木
export function generateCommonBlockApiNoReturn(block, apiName, args = []) {
  return generateCommonBlock(block, apiName, false, args);
}

function generateCommonBlock(block, apiName, isReturn, args = []) {
  let argCount = 0;
  let strArg = '';
  args.forEach((arg) => {
    const { name, type, check } = arg;
    let value;
    switch (type) {
      case BlockArgType.FieldDropdown:
        value = getBlockFieldDropdown(block, name);
        break;
      case BlockArgType.InputValue:
        value = getBlockInputValue(block, name);
        break;
      default:
        value = name;
        break;
    }
    // 拼接api调用参数
    if (value) {
      ++argCount;
      strArg
        += check === 'Number' || check === 'Function' || check === 'Var'
          ? `${value},`
          : `"${value}",`;
    }
  });
  if (argCount > 0) {
    strArg = strArg.slice(0, strArg.length - 1);
  }

  // 有返回值
  if (isReturn) {
    return [`${apiName}(${strArg})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }

  return `${apiName}(${strArg}); \n`;
}

// 生成注释
// // blockId: xxxxxxxxxxxxxxxxxxxx
// code
export function generateComment(block)
{
  return `// blockId: ${block.id}\n`;
}

export function getIfCommentCode (innerCodes) {
  let ifStatement;
  let reg = /\{[\s\S]*?\}(?=[^\}]*(\{|$))/g;

  let match = innerCodes.match(reg);
  if (!match || match.length === 0) {
    return ifStatement;
  }

  while (match && match.length > 0) {
    innerCodes = innerCodes.replace(match[0], '');
    match = innerCodes.match(reg);
  }

  let result;
  reg = /\/\/#.*#/g;
  match = innerCodes.match(reg);
  if (match) {
    result = match.map(_ => _?.replace(/^\/\/#/, '').replace(/#$/, ''));
  }

  if (!result) return ifStatement;

  ifStatement = '';
  result.forEach((condition, index) => {
    if (index === 0) {
      ifStatement = condition;
    } else {
      ifStatement += `||${condition}`;
    }
  });

  return ifStatement;
};

export function removeIfCommentCodes(innerCodes) {
  const reg = /\/\/#.*#/g;
  const match = innerCodes.match(reg);
  if (match) {
    match.forEach((element) => {
      innerCodes = innerCodes.replace(element, '');
    });
  }
  return innerCodes;
};

export function generateCommonWhileCode(block, varCodes, innerCodes) {
  const enterWhileVar = Blockly.JavaScript.variableDB_.getDistinctName(
    'enterWhile',
    Blockly.Variables.NAME_TYPE
  );

  const ifStatement = getIfCommentCode(innerCodes);
  innerCodes = removeIfCommentCodes(innerCodes);

  const addIfStatement = !ifStatement
    ? ''
    : `
  AddWhileIfStatementFunc("${enterWhileVar}", () => (${ifStatement}));
  SetOuterWhileControl("${enterWhileVar}", true);
  `;

  const removeIfStatement = !ifStatement
    ? ''
    : `
  RemoveWhileIfStatementFunc("${enterWhileVar}");
  SetOuterWhileControl("${enterWhileVar}", false);
  `;

  return `${generateComment(block)}${varCodes}
  ${addIfStatement}
  while (!jumpOutOfLoop) {
    ${innerCodes}
    if (outerWhileControl && CanRunNextStep()) {
      RunOuterWhileControlStep();
    } else {
      outerWhileControl = false;
      // yield return null;
      yield return WaitForOneFrame();
    }
  }

  ${removeIfStatement}
  jumpOutOfLoop = false;\n`;
};