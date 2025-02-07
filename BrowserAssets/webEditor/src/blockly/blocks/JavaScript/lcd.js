import DropdownUtil from '@/utils/DropdownUtil';

const { Blockly } = window;

function getDisplayScreenDropdownList()
{
  let arr1 = DropdownUtil.getDropdownList('DISPLAYSCREEN') || [];
  let arr2 = DropdownUtil.getDropdownList('DISPLAYSCREENMIDDLE') || [];

  if (arr1.length == 1 && arr1[0][0] == '?') {
    arr1 = [];
  }

  if (arr2.length == 1 && arr2[0][0] == '?') {
    arr2 = [];
  }
  
  let result = [...arr1, ...arr2];

  if (result.length == 0) {
    result = [['?', '?']];
  }

  return result;
}

Blockly.defineBlocksWithJsonArray([
  {
    type: 'setLCDBackground',
    message0: Blockly.Msg.SET_LCD_BACKGROUND,
    args0: [
      {
        type: 'field_dropdown',
        name: 'LCD', // 已发布的小型lcd显示内容的积木使用的LCD更新下拉，这里需要统一，否则原发布的积木无法更新下拉了
        options() {
          return (
            getDisplayScreenDropdownList()
          );
        }
      },
      {
        type: 'field_dropdown',
        name: 'color',
        options: [
          [Blockly.Msg.LCD_COLOR_BLACK, 'black'],
          [Blockly.Msg.LCD_COLOR_YELLOW, 'yellow'],
          [Blockly.Msg.LCD_COLOR_RED, 'red'],
          [Blockly.Msg.LCD_COLOR_BLUE, 'blue'],
          [Blockly.Msg.LCD_COLOR_GREEN, 'green'],
          [Blockly.Msg.LCD_COLOR_WHITE, 'white']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
    extensions: ['dropdown_unknown']
  },
  {
    type: 'LCDClear',
    message0: Blockly.Msg.LCD_CLEAR,
    args0: [
      {
        type: 'field_dropdown',
        name: 'LCD',
        options() {
          return (
            getDisplayScreenDropdownList()
          );
        }
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
    extensions: ['dropdown_unknown']
  },
  {
    type: 'setLCDFont',
    message0: Blockly.Msg.SET_LCD_FONT,
    args0: [
      {
        type: 'field_dropdown',
        name: 'LCD',
        options() {
          return (
            getDisplayScreenDropdownList()
          );
        }
      },
      {
        type: 'field_dropdown',
        name: 'font_size',
        options: [
          [Blockly.Msg.LCD_FONT_SMALL, 'small'],
          [Blockly.Msg.LCD_FONT_MIDIUM, 'medium'],
          [Blockly.Msg.LCD_FONT_LARGE, 'large'],
        ]
      },
      {
        type: 'field_dropdown',
        name: 'color',
        options: [
          [Blockly.Msg.LCD_COLOR_BLACK, 'black'],
          [Blockly.Msg.LCD_COLOR_YELLOW, 'yellow'],
          [Blockly.Msg.LCD_COLOR_RED, 'red'],
          [Blockly.Msg.LCD_COLOR_BLUE, 'blue'],
          [Blockly.Msg.LCD_COLOR_GREEN, 'green'],
          [Blockly.Msg.LCD_COLOR_WHITE, 'white']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
    extensions: ['dropdown_unknown']
  },
  {
    type: 'rotateLCDFont',
    message0: Blockly.Msg.ROTATE_LCD_FONT,
    args0: [
      {
        type: 'field_dropdown',
        name: 'LCD',
        options() {
          return (
            getDisplayScreenDropdownList()
          );
        }
      },
      {
        type: 'field_dropdown',
        name: 'angle',
        options: [
          [Blockly.Msg.LCD_FONT_ANGLE_0, '0'],
          [Blockly.Msg.LCD_FONT_ANGLE_90, '90'],
          [Blockly.Msg.LCD_FONT_ANGLE_180, '180'],
          [Blockly.Msg.LCD_FONT_ANGLE_270, '270'],
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
    extensions: ['dropdown_unknown']
  },
  {
    type: 'LCDPrint',
    message0: Blockly.Msg.LCD_PRINT,
    args0: [
      {
        type: 'field_dropdown',
        name: 'LCD',
        options() {
          return (
            getDisplayScreenDropdownList()
          );
        }
      },
      {
        type: 'input_value',
        name: 'content',
        check: ['String']
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
    extensions: ['dropdown_unknown']
  },
  {
    type: 'LCDPrintln',
    message0: Blockly.Msg.LCD_PRINTLN,
    args0: [
      {
        type: 'field_dropdown',
        name: 'LCD',
        options() {
          return (
            getDisplayScreenDropdownList()
          );
        }
      },
      {
        type: 'input_value',
        name: 'content',
        check: ['String']
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ACTUATOR,
    extensions: ['dropdown_unknown']
  }
]);
