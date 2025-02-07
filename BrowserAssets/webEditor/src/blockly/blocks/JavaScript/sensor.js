import DropdownUtil from '@/utils/DropdownUtil';

const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'enableInfraredDepthSensor',
    message0: Blockly.Msg.SENSOR_ENABLE_INFRARED_DEPTH_SENSOR,
    args0: [
      {
        type: 'field_dropdown',
        name: 'enable',
        options: [
          [Blockly.Msg.ENABLE, '1'],
          [Blockly.Msg.DISABLE, '0']
        ]
      },
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [Blockly.Msg.DIRECTION_FRONT, 'front'],
          [Blockly.Msg.DIRECTION_LEFT, 'left'],
          [Blockly.Msg.DIRECTION_RIGHT, 'right'],
          [Blockly.Msg.DIRECTION_BACK, 'back']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getInfraredDepthSensorValue',
    message0: Blockly.Msg.SENSOR_GET_INFRARED_DEPTH_SENSOR_VALUE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [Blockly.Msg.DIRECTION_FRONT, 'front'],
          [Blockly.Msg.DIRECTION_LEFT, 'left'],
          [Blockly.Msg.DIRECTION_RIGHT, 'right'],
          [Blockly.Msg.DIRECTION_BACK, 'back']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'whenInfraredDepthSensorValue',
    message0: Blockly.Msg.SENSOR_WHEN_INFRARED_DEPTH_SENSOR_VALUE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [Blockly.Msg.DIRECTION_FRONT, 'front'],
          [Blockly.Msg.DIRECTION_LEFT, 'left'],
          [Blockly.Msg.DIRECTION_RIGHT, 'right'],
          [Blockly.Msg.DIRECTION_BACK, 'back']
        ]
      },
      {
        type: 'field_dropdown',
        name: 'condition',
        options: [
          ['>=', '>='],
          ['<=', '<=']
        ]
      },
      {
        type: 'input_value',
        name: 'value',
        check: 'Number'
      },
      {
        type: 'input_dummy',
        align: 'CENTRE'
      },
      {
        type: 'input_statement',
        name: 'DO'
      }
    ],
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR,
    inputsInline: true
  },
  {
    type: 'enableTerrainAwareness',
    message0: Blockly.Msg.SENSOR_ENABLE_TERRAIN_AWARENESS,
    args0: [
      {
        type: 'field_dropdown',
        name: 'enable',
        options: [
          [Blockly.Msg.ENABLE, '1'],
          [Blockly.Msg.DISABLE, '0']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getTerrainAwarenessValue',
    message0: Blockly.Msg.SENSOR_GET_TERRAIN_AWARENESS_VALUE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'index',
        options: [
          ['A', 'A'],
          ['B', 'B'],
          ['C', 'C'],
          ['D', 'D'],
          ['E', 'E'],
          ['F', 'F'],
          ['G', 'G'],
          ['H', 'H']
        ]
      }
    ],
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'checkTerrainValue',
    message0: Blockly.Msg.SENSOR_CHECK_TERRAIN_VALUE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'index',
        options: [
          ['A', 'A'],
          ['B', 'B'],
          ['C', 'C'],
          ['D', 'D'],
          ['E', 'E'],
          ['F', 'F'],
          ['G', 'G'],
          ['H', 'H']
        ]
      },
      {
        type: 'field_dropdown',
        name: 'value',
        options: [
          [Blockly.Msg.SENSOR_FLAT_GROUND, '平坦平地'],
          [Blockly.Msg.SENSOR_CONCAVE_CONVEX_FLAT, '凹凸平地'],
          [Blockly.Msg.SENSOR_OBSTACLE, '障碍物']
        ]
      }
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getLongitudeOrLatitude',
    message0: Blockly.Msg.SENSOR_GET_LONGITUDE_OR_LATITUDE,
    args0: [
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          [Blockly.Msg.SENSOR_LONGITUDE_VALUE, 'longitude'],
          [Blockly.Msg.SENSOR_LATITUDE_VALUE, 'latitude']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getPosition',
    message0: Blockly.Msg.SENSOR_GET_POSITION,
    args0: [
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          [Blockly.Msg.POSITION_X, 'x'],
          [Blockly.Msg.POSITION_Y, 'y']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'checkIfPassCoordinate',
    message0: Blockly.Msg.SENSOR_CHECK_IF_PASS_COORDINATE,
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
    inputsInline: true,
    output: 'Boolean',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getCountTime',
    message0: Blockly.Msg.SENSOR_GET_COUNT_TIME,
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'resetCountTime',
    message0: Blockly.Msg.SENSOR_RESET_COUNT_TIME,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'takePhoto',
    message0: Blockly.Msg.SENSOR_TAKE_PHOTO,
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'recordVideo',
    message0: Blockly.Msg.SENSOR_RECORD_VIDEO,
    args0: [
      {
        type: 'field_dropdown',
        name: 'action',
        options: [
          [Blockly.Msg.START, 'start'],
          [Blockly.Msg.STOP, 'stop'],
          [Blockly.Msg.CANCEL, 'cancel']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'setSensorOn',
    message0: Blockly.Msg.SET_SENSOR_ON,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'field_dropdown',
        name: 'enable',
        options: [
          [Blockly.Msg.ENABLE, 'true'],
          [Blockly.Msg.DISABLE, 'false'],
        ]
      },
      {
        type: 'field_dropdown',
        name: 'sensor_type',
        options: [
          [Blockly.Msg.SENSOR_TRAFFIC_LIGHT, 'trafficLight'],
          [Blockly.Msg.SENSOR_HUMAN, 'human'],
          [Blockly.Msg.SENSOR_ROAD, 'road'],
          [Blockly.Msg.SENSOR_TRAFFIC_SIGN, 'trafficSign'],
          [Blockly.Msg.SENSOR_ITEM, 'item']
        ]
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedTrafficLightCount',
    message0: Blockly.Msg.GET_RECOGNIZED_TRAFFIC_LIGHT_COUNT,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedTrafficLightInfo',
    message0: Blockly.Msg.GET_RECOGNIZED_TRAFFIC_LIGHT_INFO,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'light_index',
        check: ['String', 'Number']
      },
      {
        type: 'field_dropdown',
        name: 'info_type',
        options: [
          [Blockly.Msg.SENSOR_LIGHT_COLOR, 'lightColor'],
          [Blockly.Msg.VIEW_PERCENTAGE, 'percentage'],
          [Blockly.Msg.POSITION_X, 'x'],
          [Blockly.Msg.POSITION_Y, 'y'],
          [Blockly.Msg.POSITION_Z, 'z'],
        ]
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedTrafficLightInfoOfText',
    message0: Blockly.Msg.GET_RECOGNIZED_TRAFFIC_LIGHT_INFO_OF_TEXT,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'light_index',
        check: ['String', 'Number']
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedTrafficLightInfoOfNumber',
    message0: Blockly.Msg.GET_RECOGNIZED_TRAFFIC_LIGHT_INFO_OF_NUMBER,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'light_index',
        check: ['String', 'Number']
      },
      {
        type: 'field_dropdown',
        name: 'info_type',
        options: [
          [Blockly.Msg.VIEW_PERCENTAGE, 'percentage'],
          [Blockly.Msg.POSITION_X, 'x'],
          [Blockly.Msg.POSITION_Y, 'y'],
          [Blockly.Msg.POSITION_Z, 'z'],
        ]
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedHumanCount',
    message0: Blockly.Msg.GET_RECOGNIZED_HUMAN_COUNT,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedHumanName',
    message0: Blockly.Msg.GET_RECOGNIZED_HUMAN_NAME,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'human_index',
        check: ['Number']
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedHumanInfo',
    message0: Blockly.Msg.GET_RECOGNIZED_HUMAN_INFO,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'human_index',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'info_type',
        options: [
          [Blockly.Msg.VIEW_PERCENTAGE, 'percentage'],
          [Blockly.Msg.POSITION_X, 'x'],
          [Blockly.Msg.POSITION_Y, 'y'],
          [Blockly.Msg.POSITION_Z, 'z'],
        ]
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'setRoadRecognizeColor',
    message0: Blockly.Msg.SET_ROAD_RECOGNIZE_COLOR,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'field_dropdown',
        name: 'color',
        options: [
          ['红色', 'red'],
          ['蓝色', 'blue'],
        ]
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedRoadLineCount',
    message0: Blockly.Msg.GET_RECOGNIZED_ROAD_LINE_COUNT,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'isRecognizeRoadLineType',
    message0: Blockly.Msg.IS_RECOGNIZE_ROAD_LINE_TYPE,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'field_dropdown',
        name: 'line_type',
        options: [
          [Blockly.Msg.SENSOR_ROAD_NO_LINE, 'noLine'],
          [Blockly.Msg.SENSOR_ROAD_ONE_LINE, 'oneLine'],
          [Blockly.Msg.SENSOR_ROAD_Y_LINE, 'yLine'],
          [Blockly.Msg.SENSOR_ROAD_CROSS_LINE, 'crossLine'],
        ]
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Boolean',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedRoadLineInfo',
    message0: Blockly.Msg.GET_RECOGNIZED_ROAD_LINE_INFO,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'line_index',
        check: ['Number']
      },
      {
        type: 'input_value',
        name: 'point_index',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'info_type',
        options: [
          [Blockly.Msg.SENSOR_ROAD_LINE_VIEW_X, 'x'],
          [Blockly.Msg.SENSOR_ROAD_LINE_VIEW_Y, 'y'],
          [Blockly.Msg.SENSOR_ROAD_LINE_TANGENCY, 'tangency'],
          [Blockly.Msg.SENSOR_ROAD_LINE_CURVATURE, 'curvature'],
        ]
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedTrafficSignCount',
    message0: Blockly.Msg.GET_RECOGNIZED_TRAFFIC_SIGN_COUNT,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      }
    ],
    extensions: ['dynamic_virtual_camera_extension'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedTrafficSignInfo',
    message0: Blockly.Msg.GET_RECOGNIZED_TRAFFIC_SIGN_INFO,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'sign_index',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'info_type',
        options: [
          [Blockly.Msg.SIGN, 'tips'],
          [Blockly.Msg.VIEW_PERCENTAGE, 'percentage'],
          [Blockly.Msg.POSITION_X, 'x'],
          [Blockly.Msg.POSITION_Y, 'y'],
          [Blockly.Msg.POSITION_Z, 'z'],
        ]
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedTrafficSignInfoOfText',
    message0: Blockly.Msg.GET_RECOGNIZED_TRAFFIC_SIGN_INFO_OF_TEXT,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'sign_index',
        check: ['Number']
      },
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedTrafficSignInfoOfNumber',
    message0: Blockly.Msg.GET_RECOGNIZED_TRAFFIC_SIGN_INFO_OF_NUMBER,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'sign_index',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'info_type',
        options: [
          [Blockly.Msg.VIEW_PERCENTAGE, 'percentage'],
          [Blockly.Msg.POSITION_X, 'x'],
          [Blockly.Msg.POSITION_Y, 'y'],
          [Blockly.Msg.POSITION_Z, 'z'],
        ]
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  // 雷达积木接口
  {
    type: 'setRadarOn',
    message0: Blockly.Msg.SET_RADAR_ON,
    args0: [
      {
        type: 'field_dropdown',
        name: 'enable',
        options: [
          [Blockly.Msg.ENABLE, 'true'],
          [Blockly.Msg.DISABLE, 'false'],
        ]
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRadarSensorCount',
    message0: Blockly.Msg.GET_RADAR_SENSOR_COUNT,
    args0: [
      {
        type: 'input_value',
        name: 'angle',
        check: ['Number']
      },
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRadarSensorInfoInAngle',
    message0: Blockly.Msg.GET_RADAR_SENSOR_INFO_IN_ANGLE,
    args0: [
      {
        type: 'input_value',
        name: 'angle',
        check: ['Number']
      },
      {
        type: 'input_value',
        name: 'index',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'info_type',
        options: [
          [Blockly.Msg.SENSOR_OBSTACLE_DISTANCE, 'distance'],
          [Blockly.Msg.SENSOR_OBSTACLE_HEIGHT, 'height'],
        ]
      },
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'radarAngleParam',
    message0: '%1',
    args0: [
      {
        type: 'field_slider',
        name: 'NUM',
        min: -180,
        max: 180,
        step: 0.01
      }
    ],
    input_valuesInline: true,
    output: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR,
  },
  {
    type: 'getRecognizedItemCount',
    message0: Blockly.Msg.GET_RECOGNIZED_ITEM_COUNT,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedItemName',
    message0: Blockly.Msg.GET_RECOGNIZED_ITEM_NAME,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'index',
        check: ['Number']
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  },
  {
    type: 'getRecognizedItemInfo',
    message0: Blockly.Msg.GET_RECOGNIZED_ITEM_INFO,
    args0: [
      {
        type: 'input_dummy',
        name: 'camera',
      },
      {
        type: 'input_value',
        name: 'index',
        check: ['Number']
      },
      {
        type: 'field_dropdown',
        name: 'info_type',
        options: [
          [Blockly.Msg.VIEW_PERCENTAGE, 'percentage'],
          [Blockly.Msg.POSITION_X, 'x'],
          [Blockly.Msg.POSITION_Y, 'y'],
          [Blockly.Msg.POSITION_Z, 'z'],
        ]
      }
    ],
    extensions: ['dynamic_virtual_camera_extension', 'dropdown_unknown'],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR
  }
]);

Blockly.Blocks.getGyroscopeValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_GYROSCOPE_VALUE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('GYROSCOPE') || [['?', '?']]
            );
          }
        },
        {
          type: 'field_dropdown',
          name: 'type',
          options() {
            return (
              [
                [Blockly.Msg.SENSOR_ACCEL, 'accel'],
                [Blockly.Msg.SENSOR_SPEED, 'speed'],
                [Blockly.Msg.SENSOR_YAW_ANGLE, 'yawAngle'],
                [Blockly.Msg.SENSOR_PITCH_ANGLE, 'pitchAngle'],
                [Blockly.Msg.SENSOR_ROLL_ANGLE, 'rollAngle']
              ]
            );
          }
        }
      ],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_FREEBUILD_SENSOR,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.getTemperatureValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_TEMPERATURE_VALUE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('TEMPERATURE_SENSOR') || [['?', '?']]
            );
          }
        }
      ],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_FREEBUILD_SENSOR,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.getLightValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_LIGHT_VALUE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('LIGHT_SENSOR') || [['?', '?']]
            );
          }
        }
      ],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_FREEBUILD_SENSOR,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.getHumidityValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_HUMIDITY_VALUE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('HUMIDITY_SENSOR') || [['?', '?']]
            );
          }
        }
      ],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_FREEBUILD_SENSOR,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.getGPSValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_GPS_VALUE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('GPS') || [['?', '?']]
            );
          }
        },
        {
          type: 'field_dropdown',
          name: 'type',
          options() {
            return (
              [
                ['X', 'x'],
                ['Y', 'y'],
                ['Z', 'z'],
              ]
            );
          }
        }
      ],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_FREEBUILD_SENSOR,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.getInfraredValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_INFRARED_VALUE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('INFRARED_SENSOR') || [['?', '?']]
            );
          }
        }
      ],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_FREEBUILD_SENSOR,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.getCO2Value = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_CO2_VALUE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('CO2_SENSOR') || [['?', '?']]
            );
          }
        }
      ],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_FREEBUILD_SENSOR,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.getSO2Value = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_SO2_VALUE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('SO2_SENSOR') || [['?', '?']]
            );
          }
        }
      ],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_FREEBUILD_SENSOR,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.getNoiseValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_NOISE_VALUE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('NOISE_SENSOR') || [['?', '?']]
            );
          }
        }
      ],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_FREEBUILD_SENSOR,
      extensions: ['dropdown_unknown']
    });
  }
};

//获取max2和gogo的温度传感器值
Blockly.Blocks.getTemperatureOneValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_ONE_TEMPERATURE_VALUE,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR,
    });
  }
};

//获取max2和gogo的光线传感器值
Blockly.Blocks.getLightOneValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_ONE_LIGHT_VALUE,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR,
    });
  }
};

//获取max2和gogo的湿度传感器值
Blockly.Blocks.getHumindityOneValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_ONE_HUMIDITY_VALUE,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR,
    });
  }
};

//获取max2和gogo的二氧化碳传感器值
Blockly.Blocks.getCo2OneValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_ONE_CO2_VALUE,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR,
    });
  }
};

//获取max2和gogo的二氧化硫传感器值
Blockly.Blocks.getSo2OneValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_ONE_SO2_VALUE,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR,
    });
  }
};

//获取max2和gogo的一个噪音传感器值
Blockly.Blocks.getNoiseOneValue = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_ONE_NOISE_VALUE,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_SENSOR,
    });
  }
};
