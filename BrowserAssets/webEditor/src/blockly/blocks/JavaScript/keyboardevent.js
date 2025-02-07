const { Blockly } = window;

Blockly.Blocks.keyboardpresstype1 = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.KEYBOARD_EVENT1,
      args0: [
        {
          type: 'field_dropdown',
          name: 'Keyboard_event_type',
          options: [
            [Blockly.Msg.KEYBOARD_PRESS, '0'],
            [Blockly.Msg.KEYBOARD_PRESSUP, '1'],
            [Blockly.Msg.KEYBOARD_PRESSHOLD, '2']
          ]
        },
        {
          type: 'field_grid_dropdown',
          columns: '8',
          name: 'Keyboard_code',
          options: [
            [Blockly.Msg.KEYBOARD_A, 'a'],
            [Blockly.Msg.KEYBOARD_B, 'b'],
            [Blockly.Msg.KEYBOARD_C, 'c'],
            [Blockly.Msg.KEYBOARD_D, 'd'],
            [Blockly.Msg.KEYBOARD_E, 'e'],
            [Blockly.Msg.KEYBOARD_F, 'f'],
            [Blockly.Msg.KEYBOARD_G, 'g'],
            [Blockly.Msg.KEYBOARD_H, 'h'],
            [Blockly.Msg.KEYBOARD_I, 'i'],
            [Blockly.Msg.KEYBOARD_J, 'j'],
            [Blockly.Msg.KEYBOARD_K, 'k'],
            [Blockly.Msg.KEYBOARD_L, 'l'],
            [Blockly.Msg.KEYBOARD_M, 'm'],
            [Blockly.Msg.KEYBOARD_N, 'n'],
            [Blockly.Msg.KEYBOARD_O, 'o'],
            [Blockly.Msg.KEYBOARD_P, 'p'],
            [Blockly.Msg.KEYBOARD_Q, 'q'],
            [Blockly.Msg.KEYBOARD_R, 'r'],
            [Blockly.Msg.KEYBOARD_S, 's'],
            [Blockly.Msg.KEYBOARD_T, 't'],
            [Blockly.Msg.KEYBOARD_U, 'u'],
            [Blockly.Msg.KEYBOARD_V, 'v'],
            [Blockly.Msg.KEYBOARD_W, 'w'],
            [Blockly.Msg.KEYBOARD_X, 'x'],
            [Blockly.Msg.KEYBOARD_Y, 'y'],
            [Blockly.Msg.KEYBOARD_Z, 'z'],
            [Blockly.Msg.KEYBOARD_UP, 'up'],
            [Blockly.Msg.KEYBOARD_DOWN, 'down'],
            [Blockly.Msg.KEYBOARD_LEFT, 'left'],
            [Blockly.Msg.KEYBOARD_RIGHT, 'right']
          ]
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
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ANIMATION,
      inputsInline: true
    });
  }
};
Blockly.Blocks.keyboardpresstype2 = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.KEYBOARD_EVENT2,
      args0: [
        {
          type: 'field_dropdown',
          name: 'Keyboard_event_type',
          options: [
            [Blockly.Msg.KEYBOARD_PRESS, '0'],
            [Blockly.Msg.KEYBOARD_PRESSUP, '1'],
            [Blockly.Msg.KEYBOARD_PRESSHOLD, '2']
          ]
        },
        {
          type: 'field_grid_dropdown',
          columns: '8',
          name: 'Keyboard_code',
          options: [
            [Blockly.Msg.KEYBOARD_A, 'a'],
            [Blockly.Msg.KEYBOARD_B, 'b'],
            [Blockly.Msg.KEYBOARD_C, 'c'],
            [Blockly.Msg.KEYBOARD_D, 'd'],
            [Blockly.Msg.KEYBOARD_E, 'e'],
            [Blockly.Msg.KEYBOARD_F, 'f'],
            [Blockly.Msg.KEYBOARD_G, 'g'],
            [Blockly.Msg.KEYBOARD_H, 'h'],
            [Blockly.Msg.KEYBOARD_I, 'i'],
            [Blockly.Msg.KEYBOARD_J, 'j'],
            [Blockly.Msg.KEYBOARD_K, 'k'],
            [Blockly.Msg.KEYBOARD_L, 'l'],
            [Blockly.Msg.KEYBOARD_M, 'm'],
            [Blockly.Msg.KEYBOARD_N, 'n'],
            [Blockly.Msg.KEYBOARD_O, 'o'],
            [Blockly.Msg.KEYBOARD_P, 'p'],
            [Blockly.Msg.KEYBOARD_Q, 'q'],
            [Blockly.Msg.KEYBOARD_R, 'r'],
            [Blockly.Msg.KEYBOARD_S, 's'],
            [Blockly.Msg.KEYBOARD_T, 't'],
            [Blockly.Msg.KEYBOARD_U, 'u'],
            [Blockly.Msg.KEYBOARD_V, 'v'],
            [Blockly.Msg.KEYBOARD_W, 'w'],
            [Blockly.Msg.KEYBOARD_X, 'x'],
            [Blockly.Msg.KEYBOARD_Y, 'y'],
            [Blockly.Msg.KEYBOARD_Z, 'z'],
            [Blockly.Msg.KEYBOARD_UP, 'up'],
            [Blockly.Msg.KEYBOARD_DOWN, 'down'],
            [Blockly.Msg.KEYBOARD_LEFT, 'left'],
            [Blockly.Msg.KEYBOARD_RIGHT, 'right']
          ]
        }
      ],
      inputsInline: true,
      output: 'Boolean',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ANIMATION
    });
  }
};
