import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.variablesSet = function (block) {
  const id = block.getFieldValue('varName');
  if (!id) {
    return '';
  }
  const varName = Blockly.JavaScript.variableDB_.getName(
    id,
    Blockly.Variables.NAME_TYPE
  );
  const value = Blockly.JavaScript.valueToCode(
    block,
    'value',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const realVarName = block.getVarModels()[0].name;

  return `${generateComment(block)}var_${varName} = ${value};\nUpdateVarData("${realVarName}", var_${varName});\n`;
};

Blockly.JavaScript.variablesGet = function (block) {
  const id = block.getFieldValue('varName');
  if (!id) {
    return '';
  }
  const varName = Blockly.JavaScript.variableDB_.getName(
    id,
    Blockly.Variables.NAME_TYPE
  );

  return [`(var_${varName})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.listsGet = function (block) {
  const id = block.getFieldValue('lists');
  if (!id) {
    return ['[]', Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  let varName = Blockly.JavaScript.variableDB_.getName(
    id,
    Blockly.Variables.NAME_TYPE
  );
  varName = varName || [];

  return [`(list_${varName})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.easy_text_number = function (block) {
  let text_number = block.getFieldValue('text_number');

  if (text_number != 'true' && text_number != 'false' && isNaN(Number(text_number)))
  {
    text_number = `${Blockly.JavaScript.quote_(String(text_number))}`;
  }
  else
  {
    text_number = `(float.Parse((${text_number}).ToString()))`;
  }

  return [`(${text_number})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.listsAppend = function (block) {
  const listName = Blockly.JavaScript.valueToCode(
    block,
    'lists',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const value = Blockly.JavaScript.valueToCode(
    block,
    'value',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || '东西';

  if (!listName) {
    return '';
  }

  const updateListsDataCode = Blockly.JavaScript.generateUpdateListsDataCode();

  return `${generateComment(block)}tempList = ((List<object>)(${listName})).DeepClone();
  tempList.Add(${value});
  (${listName}) = tempList.DeepClone();
  ${updateListsDataCode}
  `;
};

Blockly.JavaScript.listsRemoveNthElement = function (block) {
  const listIndex = Blockly.JavaScript.variableDB_.getDistinctName(
    'listIndex',
    Blockly.Variables.NAME_TYPE
  );
  const listName = Blockly.JavaScript.valueToCode(
    block,
    'lists',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const nth = Blockly.JavaScript.valueToCode(
    block,
    'nth',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;

  if (!listName) {
    return '';
  }

  const updateListsDataCode = Blockly.JavaScript.generateUpdateListsDataCode();

  return `${generateComment(block)}var ${listIndex} = GetInt(${nth}) - 1;
  if (${listIndex} < ((List<object>)(${listName})).Count && ${listIndex} >= 0) {
    ((List<object>)(${listName})).RemoveAt(${listIndex});
    ${updateListsDataCode}
  }\n`;
};

Blockly.JavaScript.listsRemoveAll = function (block) {
  const listName = Blockly.JavaScript.valueToCode(
    block,
    'lists',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  if (!listName) {
    return '';
  }

  const updateListsDataCode = Blockly.JavaScript.generateUpdateListsDataCode();

  return `${generateComment(block)}((List<object>)(${listName})).Clear();\n${updateListsDataCode}\n`;
};

Blockly.JavaScript.listsInsertElementBeforeNthElement = function (block) {
  const listIndex = Blockly.JavaScript.variableDB_.getDistinctName(
    'listIndex',
    Blockly.Variables.NAME_TYPE
  );
  const listName = Blockly.JavaScript.valueToCode(
    block,
    'lists',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const nth = Blockly.JavaScript.valueToCode(
    block,
    'nth',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const value = Blockly.JavaScript.valueToCode(
    block,
    'value',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;

  if (!listName) {
    return '';
  }

  const updateListsDataCode = Blockly.JavaScript.generateUpdateListsDataCode();

  return `${generateComment(block)}var ${listIndex} = GetInt(${nth}) - 1;
  tempList = ((List<object>)(${listName})).DeepClone();
  if (${listIndex} < ((List<object>)(${listName})).Count && ${listIndex} >= 0) {
    tempList.Insert(${listIndex}, ${value});
    (${listName}) = tempList.DeepClone();
    ${updateListsDataCode}
  }\n`;
};

Blockly.JavaScript.listsReplaceNthElement = function (block) {
  const listIndex = Blockly.JavaScript.variableDB_.getDistinctName(
    'listIndex',
    Blockly.Variables.NAME_TYPE
  );
  const listName = Blockly.JavaScript.valueToCode(
    block,
    'lists',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const nth = Blockly.JavaScript.valueToCode(
    block,
    'nth',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const value = Blockly.JavaScript.valueToCode(
    block,
    'value',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const valueBlock = block.getInputTargetBlock('value');
  const valueBlockType = valueBlock.type;

  if (!listName) {
    return '';
  }

  const updateListsDataCode = Blockly.JavaScript.generateUpdateListsDataCode();

  return `${generateComment(block)}var ${listIndex} = GetInt(${nth}) - 1;
  if (${listIndex} < ((List<object>)(${listName})).Count && ${listIndex} >= 0) {
    ((List<object>)(${listName}))[${listIndex}] = ${value};
    ${updateListsDataCode}
  }\n`;
};

Blockly.JavaScript.listsNthElement = function (block) {
  const listName = Blockly.JavaScript.valueToCode(
    block,
    'lists',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const nth = Blockly.JavaScript.valueToCode(
    block,
    'nth',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;

  if (!listName) {
    return ['', Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }

  return [
    `(GetListNthElement(((List<object>)(${listName})), GetInt(${nth})))`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.listsFirstPosOfElementAppears = function (block) {
  const listName = Blockly.JavaScript.valueToCode(
    block,
    'lists',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const value = Blockly.JavaScript.valueToCode(
    block,
    'value',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || '东西';
  const valueBlock = block.getInputTargetBlock('value');
  const valueBlockType = valueBlock.type;

  if (!listName) {
    return ['', Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }

  return [
    `(((List<object>)(${listName})).IndexOf(${value}) + 1)`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.listsElementsNum = function (block) {
  const listName = Blockly.JavaScript.valueToCode(
    block,
    'lists',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  if (!listName) {
    return ['', Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }

  return [`(((List<object>)(${listName})).Count)`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.listsContainsElement = function (block) {
  const listName = Blockly.JavaScript.valueToCode(
    block,
    'lists',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const value = Blockly.JavaScript.valueToCode(
    block,
    'value',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || '东西';

  if (!listName) {
    return ['', Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }

  return [
    `(((List<object>)(${listName})).Contains(${value}))`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.generateUpdateListsDataCode = function () {
  const varsAndLists = Blockly.Variables.allUsedVarModels(
    Blockly.mainWorkspace
  );
  const listNames = [];
  const listIds = [];
  for (let i = 0; i < varsAndLists.length; i++) {
    if (varsAndLists[i].type == 'Array') {
      listNames.push(varsAndLists[i].name);
      listIds.push(varsAndLists[i].id_);
    }
  }
  let retStr = '';
  if (listNames.length <= 0) {
    return retStr;
  }
  retStr += 'UpdateListData(';
  for (let j = 0; j < listNames.length - 1; j++) {
    retStr += `"${listNames[j]}", (list_${Blockly.JavaScript.variableDB_.getName(listIds[j], Blockly.Variables.NAME_TYPE)}), `;
  }
  retStr += `"${listNames[listNames.length - 1]}", (list_${Blockly.JavaScript.variableDB_.getName(listIds[listNames.length - 1], Blockly.Variables.NAME_TYPE)}));\n`;
  return retStr;
};
