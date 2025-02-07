import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.string_compare = function (block) {
  const src = Blockly.JavaScript.valueToCode(
    block,
    'src',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 'abc';
  const dest = Blockly.JavaScript.valueToCode(
    block,
    'dest',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 'ab';
  const type = block.getFieldValue('type');
  switch (type) {
    case 'contain':
      return [`StringCompareContains(GetString(${src}), GetString(${dest}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'equal':
      return [`StringCompareEquals(GetString(${src}), GetString(${dest}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'starts_with':
      return [`StringCompareStartsWith(GetString(${src}), GetString(${dest}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'ends_with':
      return [`StringCompareEndsWith(GetString(${src}), GetString(${dest}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    default:
      return '';
  }
};

Blockly.JavaScript.lengthV2 = function (block) {
  const x1 = Blockly.JavaScript.valueToCode(
    block,
    'x1',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 100;
  const y1 = Blockly.JavaScript.valueToCode(
    block,
    'y1',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 100;
  const x2 = Blockly.JavaScript.valueToCode(
    block,
    'x2',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 200;
  const y2 = Blockly.JavaScript.valueToCode(
    block,
    'y2',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 200;
  return [`(GetDistance(GetFloat(${x1}), GetFloat(${y1}), GetFloat(${x2}), GetFloat(${y2})))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.transfer_to_string = function (block) {
  const src = Blockly.JavaScript.valueToCode(
    block,
    'SRC',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || '0';
  return [`(GetString(${src}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.transfer_to_number = function (block) {
  const src = Blockly.JavaScript.valueToCode(
    block,
    'SRC',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || '0';
  return [`(GetFloat(${src}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.math_arithmetic_ori = Blockly.JavaScript.math_arithmetic;
Blockly.JavaScript.math_arithmetic = function (block) {
  const result = Blockly.JavaScript.math_arithmetic_ori(block);
  result[0] = `(float.Parse((${result[0]}).ToString()))`;
  return result;
};

Blockly.JavaScript.randomInt = function (block) {
  const startNum = Blockly.JavaScript.valueToCode(
    block,
    'startNum',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const endNum = Blockly.JavaScript.valueToCode(
    block,
    'endNum',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 5;
  return [
    `(UnityEngine.Random.Range(Mathf.CeilToInt(GetFloat(${startNum})), Mathf.FloorToInt(GetFloat(${endNum}) + 1)))`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.sinCos = function (block) {
  let type = block.getFieldValue('type');
  const degree = Blockly.JavaScript.valueToCode(
    block,
    'degree',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 45;
  if (type == 'sin') {
    type = 'Sin';
  }
  else if (type == 'cos') {
    type = 'Cos';
  }
  else if (type == 'tan') {
    type = 'Tan';
  }
  else if (type == 'asin') {
    type = 'Asin';
  }
  else if (type == 'acos') {
    type = 'Acos';
  }
  else if (type == 'atan') {
    type = 'Atan';
  }
  if (type == "Asin" || type == "Acos" || type == "Atan") {
    return [
      `(Mathf.Rad2Deg*Mathf.${type}(GetFloat(${degree})))`,
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ];
  }
  else {
    return [
      `(Mathf.${type}(GetFloat(${degree})*Mathf.Deg2Rad))`,
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ];
  }
};

Blockly.JavaScript.mathRound = function (block) {
  let type = block.getFieldValue('type');
  const value = Blockly.JavaScript.valueToCode(
    block,
    'value',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1.1;
  if (type == 'round' || type == 'Round') {
    type = 'RoundToInt';
  }
  else if (type == 'ceil' || type == 'Ceiling') {
    type = 'CeilToInt';
  }
  else if (type == 'floor' || type == 'Floor') {
    type = 'FloorToInt';
  }
  if (type == 'RoundToInt') {
    return [`(${type}(GetFloat(${value})))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  return [
    `(Mathf.${type}(GetFloat(${value})))`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.takeReminder = function (block) {
  const dividend = Blockly.JavaScript.valueToCode(
    block,
    'dividend',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 27;
  const divisor = Blockly.JavaScript.valueToCode(
    block,
    'divisor',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 10;
  return [`(GetFloat(${dividend})%GetFloat(${divisor}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.mapNumber = function (block) {
  const key = Blockly.JavaScript.valueToCode(
    block,
    'ks',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 10;
  const ks = Blockly.JavaScript.valueToCode(
    block,
    'ke',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const ke = Blockly.JavaScript.valueToCode(
    block,
    'vs',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 100;
  const vs = Blockly.JavaScript.valueToCode(
    block,
    've',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const ve = Blockly.JavaScript.valueToCode(
    block,
    'key',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 200;
  return [
    `(MapNumber(GetFloat(${ks}), GetFloat(${ke}), GetFloat(${vs}), GetFloat(${ve}), GetFloat(${key})))`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.strJoin = function (block) {
  const str1 = Blockly.JavaScript.valueToCode(
    block,
    'str1',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || '';
  const str2 = Blockly.JavaScript.valueToCode(
    block,
    'str2',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || '';
  return [`(GetString(${str1}) + GetString(${str2}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.strLen = function (block) {
  const str = Blockly.JavaScript.valueToCode(
    block,
    'str',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || '';
  return [`(GetString(${str}).Length)`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.strSubstr = function (block) {
  const str = Blockly.JavaScript.valueToCode(
    block,
    'str',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || '';
  const start = Blockly.JavaScript.valueToCode(
    block,
    'start',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const count = Blockly.JavaScript.valueToCode(
    block,
    'count',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 2;
  return [`(GetSubString(GetString(${str}), GetInt(${start}), GetInt(${count})))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.math_advanced = function (block) {
  const type = block.getFieldValue('type');
  const number = Blockly.JavaScript.valueToCode(
    block,
    'number',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  switch (type) {
    case 'abs': {
      return [`(Mathf.Abs(GetFloat(${number})))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
    case 'sqrt': {
      return [
        `(Mathf.Sqrt(GetFloat(${number})))`,
        Blockly.JavaScript.ORDER_FUNCTION_CALL
      ];
    }
    case 'negative': {
      return [`(0-(GetFloat(${number})))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
    case 'ln': {
      return [`(Mathf.Log(GetFloat(${number})))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
    case 'lg': {
      return [
        `(Mathf.Log10(GetFloat(${number})))`,
        Blockly.JavaScript.ORDER_FUNCTION_CALL
      ];
    }
    case 'e^': {
      return [`(Mathf.Exp(GetFloat(${number})))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
    case '10^': {
      return [
        `(Mathf.Pow(10, GetFloat(${number})))`,
        Blockly.JavaScript.ORDER_FUNCTION_CALL
      ];
    }
  }
};

Blockly.JavaScript.math_pick = function (block) {
  const first = Blockly.JavaScript.valueToCode(
    block,
    'FIRST',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const second = Blockly.JavaScript.valueToCode(
    block,
    'SECOND',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const type = block.getFieldValue('type');
  switch (type) {
    case 'min': {
      return [
        `(Mathf.Min(GetFloat(${first}), GetFloat(${second})))`,
        Blockly.JavaScript.ORDER_FUNCTION_CALL
      ];
    }
    case 'max': {
      return [
        `(Mathf.Max(GetFloat(${first}), GetFloat(${second})))`,
        Blockly.JavaScript.ORDER_FUNCTION_CALL
      ];
    }
  }
};

Blockly.JavaScript.math_between = function (block) {
  const src = Blockly.JavaScript.valueToCode(
    block,
    'SRC',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || -1;
  const limit1 = Blockly.JavaScript.valueToCode(
    block,
    'LIMIT_1',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const limit2 = Blockly.JavaScript.valueToCode(
    block,
    'LIMIT_2',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  return [
    `((GetFloat(${limit1}) <= GetFloat(${src}) && GetFloat(${src}) <= GetFloat(${limit2})) || (GetFloat(${limit2}) <= GetFloat(${src}) && GetFloat(${src}) <= GetFloat(${limit1})))`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.logic_negate = function (block) {
  const bool = Blockly.JavaScript.valueToCode(
    block,
    'BOOL',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || false;
  return [`!(GetBool(${bool}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.logic_operation = function(block) {
  const a = Blockly.JavaScript.valueToCode(
    block,
    'A',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || false;
  const op = block.getFieldValue('OP');
  const b = Blockly.JavaScript.valueToCode(
    block,
    'B',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || false;
  if (op == 'AND') {
    return [`(GetBool(${a}) && GetBool(${b}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  else {
    return [`(GetBool(${a}) || GetBool(${b}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
};
