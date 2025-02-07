const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'rateValueInWheel',
    message0: Blockly.Msg.MOTION_RATE_VALUE_IN_WHEEL,
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: -15.0,
        max: 15.0,
        step: 0.1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'rateValueInFoot',
    message0: Blockly.Msg.MOTION_RATE_VALUE_IN_FOOT,
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: -10.0,
        max: 10.0,
        step: 0.1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'distanceValueInFoot',
    message0: Blockly.Msg.MOTION_DISTANCE_VALUE_IN_FOOT,
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: 0.0,
        max: 30.0,
        step: 0.1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'jumpValueInFoot',
    message0: Blockly.Msg.MOTION_JUMP_VALUE_IN_FOOT,
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: 0.0,
        max: 30.0,
        step: 0.1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'backflipValueInFoot',
    message0: Blockly.Msg.MOTION_BACKFLIP_VALUE_IN_FOOT,
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: 0.0,
        max: 30.0,
        step: 0.1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'platformHeightValueInFoot',
    message0: Blockly.Msg.MOTION_PLATFORM_HEIGHT_VALUE_IN_FOOT,
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: 25.0,
        max: 40.0,
        step: 0.1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'singleAngle',
    message0: Blockly.Msg.MOTION_SINGLE_VALUE,
    args0: [
      {
        type: 'field_angle',
        name: 'angle',
        check: 'Number'
      }
    ],
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setMotionMode',
    message0: Blockly.Msg.MOTION_SET_MOTION_MODE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'mode',
        options: [
          ['足式形态', 'Foot'],
          ['轮式形态', 'Wheel']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'faceToPosition',
    message0: Blockly.Msg.MOTION_FACE_TO_POSITION,
    args0: [
      {
        type: 'input_value',
        name: 'x',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'z',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setRateInFoot',
    message0: Blockly.Msg.MOTION_SET_RATE_IN_FOOT,
    args0: [
      {
        type: 'input_value',
        name: 'rate',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setRateAndTimeInFoot',
    message0: Blockly.Msg.MOTION_SET_RATE_AND_TIME_IN_FOOT,
    args0: [
      {
        type: 'input_value',
        name: 'rate',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'time',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setRotation',
    message0: Blockly.Msg.MOTION_SET_ROTATION,
    args0: [
      {
        type: 'input_value',
        name: 'angle',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'rotateUntilEnd',
    message0: Blockly.Msg.MOTION_ROTATE_UNTIL_END,
    args0: [
      {
        type: 'field_dropdown',
        name: 'mode',
        options: [
          [Blockly.Msg.MOTION_FOOT_MODE, 'Foot'],
          [Blockly.Msg.MOTION_WHEEL_MODE, 'Wheel']
        ]
      },
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [Blockly.Msg.MOTION_ROTATE_LEFT, 'Left'],
          [Blockly.Msg.MOTION_ROTATE_RIGHT, 'Right']
        ]
      },
      {
        type: 'input_value',
        name: 'angle',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'jumpInFoot',
    message0: Blockly.Msg.MOTION_JUMP_IN_FOOT,
    args0: [
      {
        type: 'input_value',
        name: 'distance',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'height',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'backflipInFoot',
    message0: Blockly.Msg.MOTION_BACKFLIP_IN_FOOT,
    args0: [
      {
        type: 'input_value',
        name: 'distance',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'height',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setRateInWheel',
    message0: Blockly.Msg.MOTION_SET_RATE_IN_WHEEL,
    args0: [
      {
        type: 'input_value',
        name: 'rate',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setRateAndTimeInWheel',
    message0: Blockly.Msg.MOTION_SET_RATE_AND_TIME_IN_WHEEL,
    args0: [
      {
        type: 'input_value',
        name: 'rate',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'time',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'stopMotion',
    message0: Blockly.Msg.MOTION_STOP_MOTION,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'getDirection',
    message0: Blockly.Msg.MOTION_GET_DIRECTION,
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  // 物理引擎运动
  {
    type: 'setMovePower',
    message0: Blockly.Msg.SET_MOVE_POWER,
    args0: [
      {
        type: 'input_value',
        name: 'power_percent',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'action_type',
        options: [
          [Blockly.Msg.MOTION_FORWAR, 'forward'],
          [Blockly.Msg.MOTION_BACK, 'back'],
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setMovePowerInTime',
    message0: Blockly.Msg.SET_MOVE_POWER_IN_TIME,
    args0: [
      {
        type: 'input_value',
        name: 'power_percent',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'action_type',
        options: [
          ['前进', 'forward'],
          ['后退', 'back'],
        ]
      },
      {
        type: 'input_value',
        name: 'time',
        check: ['Number']
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setMovePowerInTime',
    message0: Blockly.Msg.SET_MOVE_POWER_IN_TIME,
    args0: [
      {
        type: 'input_value',
        name: 'power_percent',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'action_type',
        options: [
          [Blockly.Msg.MOTION_FORWAR, 'forward'],
          [Blockly.Msg.MOTION_BACK, 'back'],
        ]
      },
      {
        type: 'input_value',
        name: 'time',
        check: ['Number']
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'rotateInTime',
    message0: Blockly.Msg.ROTATE_IN_TIME,
    args0: [
      {
        type: 'field_dropdown',
        name: 'angle_type',
        options: [
          [Blockly.Msg.MOTION_ROTATE_LEFT, 'turn_left'],
          [Blockly.Msg.MOTION_ROTATE_RIGHT, 'turn_right'],
        ]
      },
      {
        type: 'input_value',
        name: 'angle',
        check: ['Number']
      },
      {
        type: 'input_value',
        name: 'power_percent',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'action_type',
        options: [
          [Blockly.Msg.MOTION_FORWAR, 'forward'],
          [Blockly.Msg.MOTION_BACK, 'back'],
        ]
      },
      {
        type: 'input_value',
        name: 'time',
        check: ['Number']
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'brakeUntilEnd',
    message0: Blockly.Msg.BRAKE_UNTIL_END,
    args0: [
      {
        type: 'input_value',
        name: 'power_percent',
        check: ['Number']
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'powerPercentParam',
    message0: '%1',
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: 0,
        max: 100,
        step: 0.01
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
  },
  {
    type: 'motionAngleParam',
    message0: '%1',
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: -30,
        max: 30,
        step: 0.01
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
  },
  {
    type: 'getMoveStatus',
    message0: Blockly.Msg.GET_MOVE_STATUS,
    args0: [
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          [Blockly.Msg.MOTION_MOVE_STATUS_DIRECTION, 'direction'],
          [Blockly.Msg.MOTION_MOVE_STATUS_ANGLE, 'angle'],
          [Blockly.Msg.MOTION_MOVE_STATUS_POWER, 'power'],
          [Blockly.Msg.MOTION_MOVE_STATUS_SPEED, 'speed'],
        ]
      },
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'getValueByPositionType',
    message0: Blockly.Msg.GET_VALUE_BY_POSITION_TYPE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          ['X', 'x'],
          ['Y', 'y'],
          ['Z', 'z'],
        ]
      },
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
]);
