const { Blockly } = window;

Blockly.Blocks.setRobotInitialPos = {
  init() {
    this.jsonInit(
      {
        type: 'setRobotInitialPos',
        message0: Blockly.Msg.SET_ROBOT_INITIAL_POS,
        args0: [
          {
            type: 'input_value',
            name: 'x',
            check: ['Number']
          },
          {
            type: 'input_value',
            name: 'y',
            check: ['Number']
          },
          {
            type: 'input_value',
            name: 'angle',
            check: ['Number']
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ANIMATION,
        extensions: ['debugContext']
      }
    );
  }
};

Blockly.Blocks.setRobotDroneInitialPos = {
  init() {
    this.jsonInit(
      {
        type: 'setRobotDroneInitialPos',
        message0: Blockly.Msg.SET_ROBOT_DRONE_INITIAL_POS,
        args0: [
          {
            type: 'input_value',
            name: 'x',
            check: ['Number']
          },
          {
            type: 'input_value',
            name: 'y',
            check: ['Number']
          },
          {
            type: 'input_value',
            name: 'z',
            check: ['Number']
          },
          {
            type: 'input_value',
            name: 'angle',
            check: ['Number']
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: Blockly.Msg.VIRTUALHARDWARE_HEX_ANIMATION,
        extensions: ['debugContext']
      }
    );
  }
};

Blockly.Blocks.posValueOfDebug = {
  init() {
    this.jsonInit({
      type: 'posValueDebug',
      message0: Blockly.Msg.MOTION_RATE_VALUE_IN_WHEEL,
      args0: [
        {
          type: 'field_number',
          name: 'NUM',
          min: 0,
          max: 1000,
          step: 1
        }
      ],
      input_valuesInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_MOTION,
      tooltip: '',
      helpUrl: ''
    });
  }
};

Blockly.Extensions.register('debugContext', function () {
  this.isDebugBlock = true;
  if (!Blockly.Settings.isDebugMode) {
    this.setDisabled(true);
  }

  this.customContextMenu = function (menuList) {
    if (Blockly.Settings.isDebugMode) {
      return;
    }

    const len = menuList.length;
    let targetIndex = -1;
    for (let i = 0; i < len; ++i) {
      const item = menuList[i];
      if (item.text == Blockly.Msg.DISABLE_BLOCK || item.text == Blockly.Msg.ENABLE_BLOCK) {
        targetIndex = i;
        break;
      }
    }
    if (targetIndex !== -1) {
      menuList.splice(targetIndex, 1);
    }
  };
});
