import { generateComment, generateCommonWhileCode } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.repeatDo = function (block) {
  const innerCodes = Blockly.JavaScript.statementToCode(block, 'DO');
  return generateCommonWhileCode(block, '', innerCodes);
};

Blockly.JavaScript.repeatDoTimes = function (block) {
  const repeatDoTimesLoopVar = Blockly.JavaScript.variableDB_.getDistinctName(
    'repeatDoTimesLoopVar',
    Blockly.Variables.NAME_TYPE
  );
  const times = Blockly.JavaScript.valueToCode(
    block,
    'times',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 10;
  const repeatDoTimesLoopTimes = Blockly.JavaScript.variableDB_.getDistinctName(
    'repeatDoTimesLoopTimes',
    Blockly.Variables.NAME_TYPE
  );
  const insideCodes = Blockly.JavaScript.statementToCode(block, 'DO');

  const varCodes = `int ${repeatDoTimesLoopVar} = 0; \nfloat ${repeatDoTimesLoopTimes} = GetFloat(${times});`;
  const innerCodes = `if (${repeatDoTimesLoopVar} >= ${repeatDoTimesLoopTimes}) {
    jumpOutOfLoop = true;
    break;
  }
  ${insideCodes}
  ${repeatDoTimesLoopVar}++;`;

  return generateCommonWhileCode(block, varCodes, innerCodes);
};

Blockly.JavaScript.controlBreak = function (block) {
  const validParentBlockTypes = [
    'repeatDo',
    'repeatDoTimes',
    'waitUntil',
    'repeatDoAndWaitUntil'
  ];
  let isValid = false;
  let currentBlock = block;
  let parentBlock = block.getParent();
  while (parentBlock) {
    if (validParentBlockTypes.includes(parentBlock.type)) {
      if (parentBlock.getNextBlock() !== currentBlock) {
        isValid = true;
        break;
      }
    }
    currentBlock = parentBlock;
    parentBlock = parentBlock.getParent();
  }
  if (isValid) {
    return `${generateComment(block)}jumpOutOfLoop = true;
    break;\n`;
  }
  return '';
};

Blockly.JavaScript.controlIf = function (block) {
  let n = 0;
  let code = '';
  let branchCode;
  let conditionCode;
  const ifCodes = [];

  do {
    conditionCode = Blockly.JavaScript.valueToCode(
      block,
      `IF${n}`,
      Blockly.JavaScript.ORDER_NONE
    ) || 'false';
    branchCode = Blockly.JavaScript.statementToCode(block, `DO${n}`) || '';

    code += `${
      n == 0 ? 'if' : 'else if'
    } (GetBool(${conditionCode}))
    {
      ${branchCode}
    }\n`;
    ++n;

    ifCodes.push(conditionCode);
  } while (block.getInput(`IF${n}`));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.JavaScript.statementToCode(block, 'ELSE') || '';
    code += `else
    {
      ${branchCode}
    }\n`;

    let elseCodes = '';
    ifCodes.forEach((code, index) => {
      if (index === 0) {
        elseCodes += code;
      } else {
        elseCodes += `||${code}`;
      }
    });
    ifCodes.push(`!(${elseCodes})`);
  }

  let commentsCodes = '';
  ifCodes.forEach((code, index) => {
    commentsCodes += index === 0 ? `${code}` : `||${code}`;
  });

  return `${generateComment(block)}${code}\n //#${commentsCodes}# \n`;
};

Blockly.JavaScript.controls_if_no_else = function (block) {
  const conditionCode = Blockly.JavaScript.valueToCode(
    block,
    'IF0',
    Blockly.JavaScript.ORDER_NONE
  ) || 'false';
  const branchCode = Blockly.JavaScript.statementToCode(block, 'DO0') || Blockly.JavaScript.PASS;
  return `${generateComment(block)}if (GetBool(${conditionCode}))
  {
    ${branchCode}
  }
  //#${conditionCode}#
  `;
};

Blockly.JavaScript.waitUntil = function (block) {
  const condition = Blockly.JavaScript.valueToCode(
    block,
    'condition',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 'false';

  const innerCodes = `if (${condition})
  {
    jumpOutOfLoop = true;
    break;
  }\n //#${condition}#\n`;

  return generateCommonWhileCode(block, '', innerCodes);
};

Blockly.JavaScript.repeatDoAndWaitUntil = function (block) {
  const insideCodes = Blockly.JavaScript.statementToCode(block, 'DO');
  const condition = Blockly.JavaScript.valueToCode(
    block,
    'condition',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 'false';

  const innerCodes = `if (!${condition})  {
    ${insideCodes}
  }
  else
  {
    jumpOutOfLoop = true;
    break;
  }\n //#(!${condition})#\n`;

  return generateCommonWhileCode(block, '', innerCodes);
};

Blockly.JavaScript.wait = function (block) {
  const waitTime = Blockly.JavaScript.variableDB_.getDistinctName(
    'waitTime',
    Blockly.Variables.NAME_TYPE
  );
  const time = Blockly.JavaScript.valueToCode(
    block,
    'time',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 10;
  return `${generateComment(block)}yield return Wait(GetFloat(${time}));\n`;
};
