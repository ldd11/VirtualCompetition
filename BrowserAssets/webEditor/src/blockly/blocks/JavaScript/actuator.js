import DropdownUtil from '@/utils/DropdownUtil';

const { Blockly } = window;

// Blockly.Blocks.LCDClear = {
//   init() {
//     this.jsonInit({
//       message0: Blockly.Msg.LCD_CLEAR,
//       args0: [
//         {
//           type: 'field_dropdown',
//           name: 'LCD',
//           options() {
//             return (
//               DropdownUtil.getDropdownList('DISPLAYSCREEN') || [['?', '?']]
//             );
//           }
//         }
//       ],
//       inputsInline: true,
//       colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
//       previousStatement: null,
//       nextStatement: null
//     });
//   }
// };

// 废弃 lcd相关请查看lcd.js
Blockly.Blocks.LCDSetBgColor = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LCD_SET_BG_COLOR,
      args0: [
        {
          type: 'field_dropdown',
          name: 'LCD',
          options() {
            return (
              DropdownUtil.getDropdownList('DISPLAYSCREEN') || [['?', '?']]
            );
          }
        },
        {
          type: 'field_dropdown',
          name: 'COLOR',
          options: [
            ['红色', 'red'],
            ['绿色', 'green'],
            ['蓝色', 'blue'],
            ['黄色', 'yellow'],
            ['紫色', 'purple'],
            ['青色', 'Cyan'],
            ['白色', 'white'],
            ['黑色', 'black']
          ]
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

// 废弃 lcd相关请查看lcd.js
Blockly.Blocks.LCDSetFontSize = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LCD_SET_FONT_SIZE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'LCD',
          options() {
            return (
              DropdownUtil.getDropdownList('DISPLAYSCREEN') || [['?', '?']]
            );
          }
        },
        {
          type: 'field_dropdown',
          name: 'FONT_SIZE',
          options: [
            ['默认字体', '10'],
            ['中字体', '12'],
            ['大字体', '14'],
            ['特大字体', '16'],
            ['超大字体', '18']
          ]
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

// 废弃 lcd相关请查看lcd.js
Blockly.Blocks.LCDShowStringOnNthLine = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LCD_SHOW_STRING_ON_NTH_LINE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'LCD',
          options() {
            return (
              DropdownUtil.getDropdownList('DISPLAYSCREEN') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'str',
          check: 'String'
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.LEDSetColor = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LED_SET_COLOR,
      args0: [
        {
          type: 'field_dropdown',
          name: 'LED',
          options() {
            return (
              DropdownUtil.getDropdownList('LIGHTSDISPLAY') || [['?', '?']]
            );
          }
        },
        {
          type: 'field_colour',
          name: 'color',
          colour: '#ffffff'
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.LEDSetColorWithSecond = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LED_SET_COLOR_WITH_SECOND,
      args0: [
        {
          type: 'field_dropdown',
          name: 'LED',
          options() {
            return (
              DropdownUtil.getDropdownList('LIGHTSDISPLAY') || [['?', '?']]
            );
          }
        },
        {
          type: 'field_colour',
          name: 'color',
          colour: '#ffffff'
        },
        {
          type: 'input_value',
          name: 'SEC',
          check: 'Number'
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.LEDSetRgb = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LED_SET_RGB,
      args0: [
        {
          type: 'field_dropdown',
          name: 'LED',
          options() {
            return (
              DropdownUtil.getDropdownList('LIGHTSDISPLAY') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'R',
          check: 'Number'
        },
        {
          type: 'input_value',
          name: 'G',
          check: 'Number'
        },
        {
          type: 'input_value',
          name: 'B',
          check: 'Number'
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.LEDSetRgbWithSecond = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LED_SET_RGB_WITH_SECOND,
      args0: [
        {
          type: 'field_dropdown',
          name: 'LED',
          options() {
            return (
              DropdownUtil.getDropdownList('LIGHTSDISPLAY') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'R',
          check: 'Number'
        },
        {
          type: 'input_value',
          name: 'G',
          check: 'Number'
        },
        {
          type: 'input_value',
          name: 'B',
          check: 'Number'
        },
        {
          type: 'input_value',
          name: 'SEC',
          check: 'Number'
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.LEDAddBrightness = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LED_ADD_BRIGHTBRIGHTNESS,
      args0: [
        {
          type: 'field_dropdown',
          name: 'LED',
          options() {
            return (
              DropdownUtil.getDropdownList('LIGHTSDISPLAY') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'brightness',
          check: 'Number'
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.LEDSetBrightness = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LED_SET_BRIGHTBRIGHTNESS,
      args0: [
        {
          type: 'field_dropdown',
          name: 'LED',
          options() {
            return (
              DropdownUtil.getDropdownList('LIGHTSDISPLAY') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'brightness',
          check: 'Number'
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.LEDGetBrightness = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LED_GET_BRIGHTBRIGHTNESS,
      args0: [
        {
          type: 'field_dropdown',
          name: 'LED',
          options() {
            return (
              DropdownUtil.getDropdownList('LIGHTSDISPLAY') || [['?', '?']]
            );
          }
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      output: 'Number',
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.brightnessParam1 = {
  init() {
    this.jsonInit({
      message0: ' %1 ',
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
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      // extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.brightnessParam2 = {
  init() {
    this.jsonInit({
      message0: ' %1 ',
      args0: [
        {
          type: 'field_slider',
          name: 'NUM',
          min: -100,
          max: 100,
          step: 0.01
        }
      ],
      input_valuesInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      // extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.rgbParam = {
  init() {
    this.jsonInit({
      message0: ' %1 ',
      args0: [
        {
          type: 'field_slider',
          name: 'NUM',
          min: 0,
          max: 255,
          step: 1
        }
      ],
      input_valuesInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
    });
  }
};

Blockly.Blocks.moveArmPincher = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.ACTUATOR_MOVE_ARM_PINCHER,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('FULL_ARM') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'x',
          check: 'Number'
        },
        {
          type: 'input_value',
          name: 'z',
          check: 'Number'
        },
        {
          type: 'input_value',
          name: 'y',
          check: 'Number'
        },
        {
          type: 'field_dropdown',
          name: 'action',
          options: [
            [Blockly.Msg.ACTUATOR_MOVE_ARM_PINCHER_GET, 'Get'],
            [Blockly.Msg.ACTUATOR_MOVE_ARM_PINCHER_PUT, 'Put']
          ]
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
      extensions: ['dropdown_unknown']
    });
  }
};
