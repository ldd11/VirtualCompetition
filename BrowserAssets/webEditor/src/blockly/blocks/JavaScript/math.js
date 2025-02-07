import * as common from '../common';

const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'string_compare',
    message0: Blockly.Msg.MATH_STR_COMPARE,
    args0: [
      {
        type: 'input_value',
        name: 'src',
        check: ['String', 'Number']
      },
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          [Blockly.Msg.MATH_OPTS_equal, 'equal'],
          [Blockly.Msg.MATH_OPTS_contain, 'contain'],
          [Blockly.Msg.MATH_OPTS_starts_with, 'starts_with'],
          [Blockly.Msg.MATH_OPTS_ends_with, 'ends_with']
        ]
      },
      {
        type: 'input_value',
        name: 'dest',
        check: ['String', 'Number']
      }
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'lengthV2',
    message0: Blockly.Msg.MATH_LENGTHV2,
    args0: [
      {
        type: 'input_value',
        name: 'x1',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'y1',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'x2',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'y2',
        check: 'Number'
      }
    ],
    output: 'Number',
    inputsInline: true,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'transfer_to_string',
    message0: Blockly.Msg.MATH_TRANSFER_TO_STRING,
    args0: [
      {
        type: 'input_value',
        name: 'SRC',
        check: ['Number', 'String', 'Boolean', 'Array']
      }
    ],
    output: 'String',
    inputsInline: true,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'transfer_to_number',
    message0: Blockly.Msg.MATH_TRANSFER_TO_NUMBER,
    args0: [
      {
        type: 'input_value',
        name: 'SRC',
        check: ['Number', 'String', 'Boolean', 'Array']
      }
    ],
    output: 'Number',
    inputsInline: true,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'randomInt',
    message0: Blockly.Msg.MATH_RANDOM,
    args0: [
      {
        type: 'input_value',
        name: 'startNum',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'endNum',
        check: 'Number'
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'sinCos',
    message0: Blockly.Msg.MATH_DEGREE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          ['sin', 'Sin'],
          ['cos', 'Cos'],
          ['tan', 'Tan'],
          ['asin', 'Asin'],
          ['acos', 'Acos'],
          ['atan', 'Atan']
        ]
      },
      {
        type: 'input_value',
        name: 'degree',
        check: 'Number'
      }
    ],
    output: 'Number',
    inputsInline: true,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'mathRound',
    message0: Blockly.Msg.MATH_ROUND,
    args0: [
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          [Blockly.Msg.MATH_OPTS_math_round, 'RoundToInt'],
          [Blockly.Msg.MATH_OPTS_math_ceil, 'CeilToInt'],
          [Blockly.Msg.MATH_OPTS_math_floor, 'FloorToInt']
        ]
      },
      {
        type: 'input_value',
        name: 'value',
        check: 'Number'
      }
    ],
    output: 'Number',
    inputsInline: true,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'takeReminder', // 取余运算
    message0: Blockly.Msg.MATH_TAKEREMINDER,
    args0: [
      {
        type: 'input_value',
        name: 'dividend', // 被除数
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'divisor', // 除数
        check: 'Number'
      }
    ],
    output: 'Number',
    inputsInline: true,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'mapNumber',
    message0: Blockly.Msg.MATH_MAPNUMBER,
    args0: [
      {
        type: 'input_value',
        name: 'ks',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'ke',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'vs',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 've',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'key',
        check: 'Number'
      }
    ],
    output: 'Number',
    inputsInline: true,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'strJoin',
    message0: Blockly.Msg.MATH_STRJOIN,
    args0: [
      {
        type: 'input_value',
        name: 'str1',
        check: ['String', 'Number', 'Boolean']
      },
      {
        type: 'input_value',
        name: 'str2',
        check: ['String', 'Number', 'Boolean']
      }
    ],
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'strLen',
    message0: Blockly.Msg.MATH_STRLENGTH,
    args0: [
      {
        type: 'input_value',
        name: 'str',
        check: 'String'
      }
    ],
    output: 'Number',
    inputsInline: true,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'strSubstr',
    message0: Blockly.Msg.MATH_SUBSTR,
    args0: [
      {
        type: 'input_value',
        name: 'str',
        check: 'String'
      },
      {
        type: 'input_value',
        name: 'start',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'count',
        check: 'Number'
      }
    ],
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'strContain',
    message0: Blockly.Msg.MATH_STRCONTAIN,
    args0: [
      {
        type: 'input_value',
        name: 'all',
        check: 'String'
      },
      {
        type: 'input_value',
        name: 'sub',
        check: 'String'
      }
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'math_advanced',
    message0: Blockly.Msg.MATH_ADVANCED,
    args0: [
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          [Blockly.Msg.MATH_OPTS_ABS, 'abs'],
          [Blockly.Msg.MATH_OPTS_SQRT, 'sqrt'],
          [Blockly.Msg.MATH_OPTS_NEGATIVE, 'negative'],
          [Blockly.Msg.MATH_OPTS_LN, 'ln'],
          [Blockly.Msg.MATH_OPTS_LG, 'lg'],
          [Blockly.Msg.MATH_OPTS_E_N, 'e^'],
          [Blockly.Msg.MATH_OPTS_10_N, '10^']
        ]
      },
      {
        type: 'input_value',
        name: 'number',
        check: 'Number'
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'math_pick',
    message0: Blockly.Msg.MATH_PICK,
    args0: [
      {
        type: 'input_value',
        name: 'FIRST',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'SECOND',
        check: 'Number'
      },
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          [Blockly.Msg.MATH_OPTS_max, 'max'],
          [Blockly.Msg.MATH_OPTS_min, 'min']
        ]
      }
    ],
    output: 'Number',
    inputsInline: true,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  },
  {
    type: 'math_between',
    message0: Blockly.Msg.MATH_BETWEEN,
    args0: [
      {
        type: 'input_value',
        name: 'SRC',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'LIMIT_1',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'LIMIT_2',
        check: 'Number'
      }
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
  }
]);

common.resetColor(
  Blockly.Blocks.math_number,
  Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
);
common.resetColor(
  Blockly.Blocks.math_arithmetic,
  Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
);
common.resetColor(
  Blockly.Blocks.logic_compare,
  Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
);
common.resetColor(
  Blockly.Blocks.logic_operation,
  Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
);
common.resetColor(
  Blockly.Blocks.logic_negate,
  Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
);
common.resetColor(
  Blockly.Blocks.math_constrain,
  Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
);
common.resetColor(
  Blockly.Blocks.math_number_property,
  Blockly.Msg.VIRTUALHARDWARE_HEX_MATH
);
common.resetColor(Blockly.Blocks.text, Blockly.Msg.VIRTUALHARDWARE_HEX_MATH);
