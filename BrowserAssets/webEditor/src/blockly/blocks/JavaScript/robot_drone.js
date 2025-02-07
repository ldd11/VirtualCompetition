const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'droneSpeed',
    message0: '%1',
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: -10,
        max: 10,
        step: 0.1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TRICK,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'droneTrickDistance',
    message0: '%1',
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: 10,
        max: 50,
        step: 1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TRICK,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'dronePower',
    message0: '%1',
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: -100,
        max: 100,
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
    type: 'droneLightBrightnessVariation',
    message0: '%1',
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: -100,
        max: 100,
        step: 1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_LIGHT,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'droneLightBrightness',
    message0: '%1',
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: 0,
        max: 100,
        step: 1
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_LIGHT,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'horizontalCircularMoveThenHover',
    message0: Blockly.Msg.HORIZONTAL_CIRCULAR_MOVE_THEN_HOVER,
    args0: [
      {
        type: 'input_value',
        name: 'rotateSpeed',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'x',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'y',
        check: 'Number'
      },
      {
        type: 'field_dropdown',
        name: 'rotateDirection',
        options: [
          [Blockly.Msg.ROBOT_DRONE_CLOCK_WISE, 'clockwise'],
          [Blockly.Msg.ROBOT_DRONE_COUNTER_CLOCK_WISE, 'counterclockwise']
        ]
      },
      {
        type: 'input_value',
        name: 'laps',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TRICK
  },
  {
    type: 'horizontalSprialMoveThenHover',
    message0: Blockly.Msg.HORIZONTAL_SPRIAL_MOVE_THEN_HOVER,
    args0: [
      {
        type: 'input_value',
        name: 'rotateSpeed',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'motionSpeed',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'x',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'y',
        check: 'Number'
      },
      {
        type: 'field_dropdown',
        name: 'rotateDirection',
        options: [
          [Blockly.Msg.ROBOT_DRONE_CLOCK_WISE, 'clockwise'],
          [Blockly.Msg.ROBOT_DRONE_COUNTER_CLOCK_WISE, 'counterclockwise']
        ]
      },
      {
        type: 'input_value',
        name: 'laps',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TRICK
  },
  {
    type: 'tumblingMoveThenHover',
    message0: Blockly.Msg.TUMBLING_MOVE_THEN_HOVER,
    args0: [
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [Blockly.Msg.ROBOT_DRONE_FRONT, 'front'],
          [Blockly.Msg.ROBOT_DRONE_BACk, 'back'],
          [Blockly.Msg.ROBOT_DRONE_LEFT, 'left'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT, 'right']
        ]
      },
      {
        type: 'input_value',
        name: 'distance',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TRICK
  },
  {
    type: 'somersaultMoveThenHover',
    message0: Blockly.Msg.SOMESAULT_MOVE_THEN_HOVER,
    args0: [
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [Blockly.Msg.ROBOT_DRONE_FRONT, 'front'],
          [Blockly.Msg.ROBOT_DRONE_BACk, 'back'],
          [Blockly.Msg.ROBOT_DRONE_LEFT, 'left'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT, 'right']
        ]
      },
      {
        type: 'input_value',
        name: 'distance',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TRICK
  },
  {
    type: 'barrelRollMoveThenHover',
    message0: Blockly.Msg.BARREL_ROLL_MOVE_THEN_HOVER,
    args0: [
      {
        type: 'input_value',
        name: 'motionSpeed',
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
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TRICK
  },
  {
    type: 'serpentineMoveThenHover',
    message0: Blockly.Msg.SERPENTINE_MOVE_THEN_HOVER,
    args0: [
      {
        type: 'input_value',
        name: 'motionSpeed',
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
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TRICK
  },
  {
    type: 'forwardSprialMoveThenHover',
    message0: Blockly.Msg.FORWARD_SPRIAL_MOVE_THEN_HOVER,
    args0: [
      {
        type: 'input_value',
        name: 'motionSpeed',
        check: 'Number'
      },
      {
        type: 'field_dropdown',
        name: 'rotateDirection',
        options: [
          [Blockly.Msg.ROBOT_DRONE_CLOCK_WISE, 'clockwise'],
          [Blockly.Msg.ROBOT_DRONE_COUNTER_CLOCK_WISE, 'counterclockwise']
        ]
      },
      {
        type: 'input_value',
        name: 'time',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TRICK
  },
  {
    type: 'turnOnFlightStatus',
    message0: Blockly.Msg.TURN_ON_FLIGHT_STATUS,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'turnOffFlightStatus',
    message0: Blockly.Msg.TURN_OFF_FLIGHT_STATUS,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setDroneOutputPower',
    message0: Blockly.Msg.SET_DRONE_OUTPUT_POWER,
    args0: [
      {
        type: 'input_value',
        name: 'roll',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'pitch',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'throttle',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'yaw',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setDroneOutputPowerAndMoveThenHover',
    message0: Blockly.Msg.SET_DRONE_OUTPUT_POWER_AND_MOVE_THEN_HOVER,
    args0: [
      {
        type: 'input_value',
        name: 'roll',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'pitch',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'throttle',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'yaw',
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
    type: 'setDroneMotionSpeed',
    message0: Blockly.Msg.SET_DRONE_MOTION_SPEED,
    args0: [
      {
        type: 'input_value',
        name: 'motionSpeed',
        check: 'Number'
      },
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [Blockly.Msg.ROBOT_DRONE_FORWARD, 'front'],
          [Blockly.Msg.ROBOT_DRONE_BACKWARD, 'back'],
          [Blockly.Msg.ROBOT_DRONE_LEFT, 'left'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT, 'right'],
          [Blockly.Msg.ROBOT_DRONE_UP, 'up'],
          [Blockly.Msg.ROBOT_DRONE_DOWN, 'down']
        ]
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setDroneMotionSpeedAndMoveThenHover',
    message0: Blockly.Msg.SET_DRONE_MOTION_SPEED_AND_MOVE_THEN_HOVER,
    args0: [
      {
        type: 'input_value',
        name: 'motionSpeed',
        check: 'Number'
      },
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [Blockly.Msg.ROBOT_DRONE_FORWARD, 'front'],
          [Blockly.Msg.ROBOT_DRONE_BACKWARD, 'back'],
          [Blockly.Msg.ROBOT_DRONE_LEFT, 'left'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT, 'right'],
          [Blockly.Msg.ROBOT_DRONE_UP, 'up'],
          [Blockly.Msg.ROBOT_DRONE_DOWN, 'down']
        ]
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
    type: 'hoverAndRotateUntilEnd',
    message0: Blockly.Msg.HOVER_AND_ROTATE_UNTIL_END,
    args0: [
      {
        type: 'field_dropdown',
        name: 'rotateDirection',
        options: [
          [Blockly.Msg.ROBOT_DRONE_CLOCK_WISE, 'clockwise'],
          [Blockly.Msg.ROBOT_DRONE_COUNTER_CLOCK_WISE, 'counterclockwise']
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
    type: 'faceToPositionThenHover',
    message0: Blockly.Msg.FACE_TO_POSITION_THEN_HOVER,
    args0: [
      {
        type: 'input_value',
        name: 'x',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'y',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'setDroneRotationAngle',
    message0: Blockly.Msg.SET_DRONE_ROTATION_ANGLE,
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
    type: 'stopMotionThenHover',
    message0: Blockly.Msg.STOP_MOTION_THEN_HOVER,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'getMotionSpeedOrDirectionValue',
    message0: Blockly.Msg.GET_MOTION_SPEED_OR_DIRECTION_VALUE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'option',
        options: [
          [Blockly.Msg.ROBOT_DRONE_X_SPEED, 'xSpeed'],
          [Blockly.Msg.ROBOT_DRONE_Y_SPEED, 'ySpeed'],
          [Blockly.Msg.ROBOT_DRONE_Z_SPEED, 'zSpeed'],
          [Blockly.Msg.ROBOT_DRONE_ROTATE_SPEED, 'rotateSpeed'],
          [Blockly.Msg.ROBOT_DRONE_X_DIRECTION, 'direction']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'getDroneCoordinate',
    message0: Blockly.Msg.GET_DRONE_COORDINATE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'axis',
        options: [
          ['X', 'x'],
          ['Y', 'y'],
          ['Z', 'z']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION
  },
  {
    type: 'getDroneInfraredDepthSensorValue',
    message0: Blockly.Msg.GET_DRONE_INFRARED_DEPTH_SENSOR_VALUE,
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
  },
  {
    type: 'setDroneLightColor',
    message0: Blockly.Msg.SET_DRONE_LIGHT_COLOR,
    args0: [
      {
        type: 'field_dropdown',
        name: 'light',
        options: [
          [Blockly.Msg.ROBOT_DRONE_SIGNAL_LIGHT, 'signalLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_FRONT_LIGHT, 'leftFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_FRONT_LIGHT, 'rightFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_BACK_LIGHT, 'leftBackLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_BACK_LIGHT, 'rightBackLight'],
          [Blockly.Msg.ROBOT_DRONE_ALL_LIGHT, 'all']
        ]
      },
      {
        type: 'field_colour',
        name: 'color',
        colour: '#ffffff'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_LIGHT
  },
  {
    type: 'setDroneLightColorAndLastForSecond',
    message0: Blockly.Msg.SET_DRONE_LIGHT_COLOR_AND_LAST_FOR_SECOND,
    args0: [
      {
        type: 'field_dropdown',
        name: 'light',
        options: [
          [Blockly.Msg.ROBOT_DRONE_SIGNAL_LIGHT, 'signalLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_FRONT_LIGHT, 'leftFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_FRONT_LIGHT, 'rightFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_BACK_LIGHT, 'leftBackLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_BACK_LIGHT, 'rightBackLight'],
          [Blockly.Msg.ROBOT_DRONE_ALL_LIGHT, 'all']
        ]
      },
      {
        type: 'field_colour',
        name: 'color',
        colour: '#ffffff'
      },
      {
        type: 'input_value',
        name: 'second',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_LIGHT
  },
  {
    type: 'setDroneLightColorToFlash',
    message0: Blockly.Msg.SET_DRONE_LIGHT_COLOR_TO_FLASH,
    args0: [
      {
        type: 'field_dropdown',
        name: 'light',
        options: [
          [Blockly.Msg.ROBOT_DRONE_SIGNAL_LIGHT, 'signalLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_FRONT_LIGHT, 'leftFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_FRONT_LIGHT, 'rightFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_BACK_LIGHT, 'leftBackLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_BACK_LIGHT, 'rightBackLight'],
          [Blockly.Msg.ROBOT_DRONE_ALL_LIGHT, 'all']
        ]
      },
      {
        type: 'field_colour',
        name: 'color',
        colour: '#ffffff'
      },
      {
        type: 'input_value',
        name: 'intervalSecond',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'lightSecond',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_LIGHT
  },
  {
    type: 'setDroneLightColorToFlashAndLastForSecond',
    message0: Blockly.Msg.SET_DRONE_LIGHT_COLOR_TO_FLASH_AND_LAST_FOR_SECOND,
    args0: [
      {
        type: 'field_dropdown',
        name: 'light',
        options: [
          [Blockly.Msg.ROBOT_DRONE_SIGNAL_LIGHT, 'signalLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_FRONT_LIGHT, 'leftFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_FRONT_LIGHT, 'rightFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_BACK_LIGHT, 'leftBackLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_BACK_LIGHT, 'rightBackLight'],
          [Blockly.Msg.ROBOT_DRONE_ALL_LIGHT, 'all']
        ]
      },
      {
        type: 'field_colour',
        name: 'color',
        colour: '#ffffff'
      },
      {
        type: 'input_value',
        name: 'intervalSecond',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'lightSecond',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'totalSecond',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_LIGHT
  },
  {
    type: 'increaseDroneLightBrightness',
    message0: Blockly.Msg.INCREASE_DRONE_LIGHT_BRIGHTNESS,
    args0: [
      {
        type: 'field_dropdown',
        name: 'light',
        options: [
          [Blockly.Msg.ROBOT_DRONE_SIGNAL_LIGHT, 'signalLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_FRONT_LIGHT, 'leftFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_FRONT_LIGHT, 'rightFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_BACK_LIGHT, 'leftBackLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_BACK_LIGHT, 'rightBackLight'],
          [Blockly.Msg.ROBOT_DRONE_ALL_LIGHT, 'all']
        ]
      },
      {
        type: 'input_value',
        name: 'brightnessVariation',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_LIGHT
  },
  {
    type: 'setDroneLightBrightness',
    message0: Blockly.Msg.SET_DRONE_LIGHT_BRIGHTNESS,
    args0: [
      {
        type: 'field_dropdown',
        name: 'light',
        options: [
          [Blockly.Msg.ROBOT_DRONE_SIGNAL_LIGHT, 'signalLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_FRONT_LIGHT, 'leftFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_FRONT_LIGHT, 'rightFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_BACK_LIGHT, 'leftBackLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_BACK_LIGHT, 'rightBackLight'],
          [Blockly.Msg.ROBOT_DRONE_ALL_LIGHT, 'all']
        ]
      },
      {
        type: 'input_value',
        name: 'brightness',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_LIGHT
  },
  {
    type: 'getDroneLightBrightness',
    message0: Blockly.Msg.GET_DRONE_LIGHT_BRIGHTNESS,
    args0: [
      {
        type: 'field_dropdown',
        name: 'light',
        options: [
          [Blockly.Msg.ROBOT_DRONE_SIGNAL_LIGHT, 'signalLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_FRONT_LIGHT, 'leftFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_FRONT_LIGHT, 'rightFrontLight'],
          [Blockly.Msg.ROBOT_DRONE_LEFT_BACK_LIGHT, 'leftBackLight'],
          [Blockly.Msg.ROBOT_DRONE_RIGHT_BACK_LIGHT, 'rightBackLight']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_LIGHT
  }
]);
