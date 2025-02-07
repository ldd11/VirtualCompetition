const { Blockly } = window;

const MAX_RATE_ON_LAND = 20;
const MAX_RATE_ON_AIR = 30;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'rateValueOfLandInQQCar',
    message0: Blockly.Msg.MOTION_RATE_VALUE_IN_WHEEL,
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: 0,
        max: MAX_RATE_ON_LAND,
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
    type: 'rateValueOfAirInQQCar',
    message0: Blockly.Msg.MOTION_RATE_VALUE_IN_WHEEL,
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: 0,
        max: MAX_RATE_ON_AIR,
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
    type: 'angleValueInQQCar',
    message0: Blockly.Msg.MOTION_RATE_VALUE_IN_WHEEL,
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: 0,
        max: 35,
        step: 1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'timeValueOfQQCar',
    message0: Blockly.Msg.MOTION_RATE_VALUE_IN_WHEEL,
    args0: [
      {
        type: 'field_number',
        name: 'NUM',
        min: 0,
        max: Number.POSITIVE_INFINITY,
        step: 1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'setQQCarMotionMode',
    message0: Blockly.Msg.QQCAR_SET_MOTION_MODE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'mode',
        options: [
          [Blockly.Msg.QQCAR_MOTION_MODE_AIR, 'Air'],
          [Blockly.Msg.QQCAR_MOTION_MODE_LAND, 'Land']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setQQCarRateAndTimeOnLand',
    message0: Blockly.Msg.QQCAR_SET_RATE_AND_TIME_ON_LAND,
    args0: [
      {
        type: 'field_dropdown',
        name: 'dir',
        options: [
          [Blockly.Msg.QQCAR_DIR_FORWARD, 'forward'],
          [Blockly.Msg.QQCAR_DIR_BACK, 'back']
        ]
      },
      {
        type: 'input_value',
        name: 'rate',
        check: ['Number']
      },
      {
        type: 'input_value',
        name: 'time',
        check: ['Number']
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setQQCarRateOnLand',
    message0: Blockly.Msg.QQCAR_SET_RATE_ON_LAND,
    args0: [
      {
        type: 'field_dropdown',
        name: 'dir',
        options: [
          [Blockly.Msg.QQCAR_DIR_FORWARD, 'forward'],
          [Blockly.Msg.QQCAR_DIR_BACK, 'back']
        ]
      },
      {
        type: 'input_value',
        name: 'rate',
        check: ['Number']
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'rotateQQCarAndSetRateAndTimeOnLand',
    message0: Blockly.Msg.QQCAR_ROTATE_AND_SET_RATE_AND_TIME_ON_LAND,
    args0: [
      {
        type: 'field_dropdown',
        name: 'turn_dir',
        options: [
          [Blockly.Msg.QQCAR_TURN_LEFT, 'left'],
          [Blockly.Msg.QQCAR_TURN_RIGHT, 'right']
        ]
      },
      {
        type: 'input_value',
        name: 'angle',
        check: ['Number']
      },
      {
        type: 'input_value',
        name: 'rate',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'dir',
        options: [
          [Blockly.Msg.QQCAR_DIR_FORWARD, 'forward'],
          [Blockly.Msg.QQCAR_DIR_BACK, 'back']
        ]
      },
      {
        type: 'input_value',
        name: 'time',
        check: ['Number']
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'rotateQQCarAndSetRateOnLand',
    message0: Blockly.Msg.QQCAR_ROTATE_AND_SET_RATE_ON_LAND,
    args0: [
      {
        type: 'field_dropdown',
        name: 'turn_dir',
        options: [
          [Blockly.Msg.QQCAR_TURN_LEFT, 'left'],
          [Blockly.Msg.QQCAR_TURN_RIGHT, 'right']
        ]
      },
      {
        type: 'input_value',
        name: 'angle',
        check: ['Number']
      },
      {
        type: 'input_value',
        name: 'rate',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'dir',
        options: [
          [Blockly.Msg.QQCAR_DIR_FORWARD, 'forward'],
          [Blockly.Msg.QQCAR_DIR_BACK, 'back']
        ]
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'stopQQCarMotionOnLand',
    message0: Blockly.Msg.QQCAR_STOP_MOTION_ON_LAND,
    args0: [],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setQQCarRateAndTimeOnAir',
    message0: Blockly.Msg.QQCAR_SET_RATE_AND_TIME_ON_AIR,
    args0: [
      {
        type: 'field_dropdown',
        name: 'dir',
        options: [
          [Blockly.Msg.QQCAR_DIR_FORWARD, 'forward'],
          [Blockly.Msg.QQCAR_DIR_BACK, 'back'],
          [Blockly.Msg.QQCAR_DIR_LEFT, 'left'],
          [Blockly.Msg.QQCAR_DIR_RIGHT, 'right'],
          [Blockly.Msg.QQCAR_DIR_UP, 'up'],
          [Blockly.Msg.QQCAR_DIR_DOWN, 'down']
        ]
      },
      {
        type: 'input_value',
        name: 'rate',
        check: ['Number']
      },
      {
        type: 'input_value',
        name: 'time',
        check: ['Number']
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setQQCarRateOnAir',
    message0: Blockly.Msg.QQCAR_SET_RATE_ON_AIR,
    args0: [
      {
        type: 'field_dropdown',
        name: 'dir',
        options: [
          [Blockly.Msg.QQCAR_DIR_FORWARD, 'forward'],
          [Blockly.Msg.QQCAR_DIR_BACK, 'back'],
          [Blockly.Msg.QQCAR_DIR_LEFT, 'left'],
          [Blockly.Msg.QQCAR_DIR_RIGHT, 'right'],
          [Blockly.Msg.QQCAR_DIR_UP, 'up'],
          [Blockly.Msg.QQCAR_DIR_DOWN, 'down']
        ]
      },
      {
        type: 'input_value',
        name: 'rate',
        check: ['Number']
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'rotateQQCarAndSetRateAndTimeOnAir',
    message0: Blockly.Msg.QQCAR_ROTATE_AND_SET_RATE_AND_TIME_ON_AIR,
    args0: [
      {
        type: 'field_dropdown',
        name: 'turn_dir',
        options: [
          [Blockly.Msg.QQCAR_TURN_LEFT, 'left'],
          [Blockly.Msg.QQCAR_TURN_RIGHT, 'right']
        ]
      },
      {
        type: 'input_value',
        name: 'angle',
        check: ['Number']
      },
      {
        type: 'input_value',
        name: 'rate',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'dir',
        options: [
          [Blockly.Msg.QQCAR_DIR_FORWARD, 'forward'],
          [Blockly.Msg.QQCAR_DIR_BACK, 'back']
        ]
      },
      {
        type: 'input_value',
        name: 'time',
        check: ['Number']
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'rotateQQCarAndSetRateOnAir',
    message0: Blockly.Msg.QQCAR_ROTATE_AND_SET_RATE_ON_AIR,
    args0: [
      {
        type: 'field_dropdown',
        name: 'turn_dir',
        options: [
          [Blockly.Msg.QQCAR_TURN_LEFT, 'left'],
          [Blockly.Msg.QQCAR_TURN_RIGHT, 'right']
        ]
      },
      {
        type: 'input_value',
        name: 'angle',
        check: ['Number']
      },
      {
        type: 'input_value',
        name: 'rate',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'dir',
        options: [
          [Blockly.Msg.QQCAR_DIR_FORWARD, 'forward'],
          [Blockly.Msg.QQCAR_DIR_BACK, 'back']
        ]
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'startQQCarLanding',
    message0: Blockly.Msg.QQCAR_START_LANDING,
    args0: [],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'stopQQCarMotionOnAir',
    message0: Blockly.Msg.QQCAR_STOP_MOTION_ON_AIR,
    args0: [],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'getMotionStateOfQQCar',
    message0: Blockly.Msg.QQCAR_GET_MOTION_STATE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'state',
        options: [
          [Blockly.Msg.QQCAR_MOTION_STATE_X, 'x'],
          [Blockly.Msg.QQCAR_MOTION_STATE_Y, 'y'],
          [Blockly.Msg.QQCAR_MOTION_STATE_Z, 'z'],
          [Blockly.Msg.QQCAR_MOTION_STATE_RATE, 'rate'],
          [Blockly.Msg.QQCAR_MOTION_STATE_DIR, 'angle']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'switchLightAndSetColorOfQQCar',
    message0: Blockly.Msg.QQCAR_SWITCH_LIGHT_AND_SET_COLOR,
    args0: [
      {
        type: 'field_dropdown',
        name: 'enable',
        options: [
          [Blockly.Msg.QQCAR_LIGHT_ON, 'on'],
          [Blockly.Msg.QQCAR_LIGHT_OFF, 'off']
        ]
      },
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [Blockly.Msg.QQCAR_LIGHT_DIR_ALL, 'all'],
          [Blockly.Msg.QQCAR_LIGHT_DIR_LEFT_FORWARD, 'leftforward'],
          [Blockly.Msg.QQCAR_LIGHT_DIR_LEFT_BACK, 'leftback'],
          [Blockly.Msg.QQCAR_LIGHT_DIR_RIGHT_FORWARD, 'rightforward'],
          [Blockly.Msg.QQCAR_LIGHT_DIR_RIGHT_BACK, 'rightback'],
          [Blockly.Msg.QQCAR_LIGHT_DIR_UP, 'up'],
          [Blockly.Msg.QQCAR_LIGHT_DIR_DOWN, 'down']
        ]
      },
      {
        type: 'field_colour',
        name: 'color',
        colour: '#ff0000'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'getInfraredDepthSensorValueOfQQCar',
    message0: Blockly.Msg.GET_INFRARED_DEPTH_SENSOR_VALUE_OF_QQCAR,
    args0: [
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [Blockly.Msg.DIRECTION_FRONT, 'front'],
          [Blockly.Msg.DIRECTION_BACK, 'back'],
          [Blockly.Msg.DIRECTION_LEFT, 'left'],
          [Blockly.Msg.DIRECTION_RIGHT, 'right'],
          [Blockly.Msg.DIRECTION_TOP, 'top'],
          [Blockly.Msg.DIRECTION_BOTTOM, 'bottom']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  }
]);
