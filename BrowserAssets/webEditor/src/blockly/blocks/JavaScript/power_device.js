import DropdownUtil from '@/utils/DropdownUtil';

const { Blockly } = window;

Blockly.Blocks.MotorRotate = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.MOTOR_ROTATE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'MOTOR',
          options() {
            return (
              DropdownUtil.getDropdownList('ENCODINGMOTOR') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'RPM',
          check: 'Number'
        },
        {
          type: 'field_dropdown',
          name: 'type',
          options: [
            [Blockly.Msg.MOTOR_ROTATE_FORWARD, '1'],
            [Blockly.Msg.MOTOR_ROTATE_BACK, '-1']
          ]
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.WHEEL_POWER = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.WHEEL_POWER,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('WHEEL_POWER') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'RPM',
          check: 'Number'
        },
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.motorParam1 = {
  init() {
    this.jsonInit({
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
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
    });
  }
};

Blockly.Blocks.motorParam2 = {
  init() {
    this.jsonInit({
      message0: '%1',
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
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
    });
  }
};

Blockly.Blocks.DuctedFanOutputPower = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.DUCTED_FAN_OUTPUT_POWER,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('DUCTED_FAN') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'power',
          check: 'Number'
        },
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.DuctedFanSetOutputPowerAngle = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.DUCTED_FAN_SET_OUTPUT_POWER_ANGLE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('DUCTED_FAN') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'pitch_angle',
          check: 'Number'
        },
        {
          type: 'input_value',
          name: 'roll_angle',
          check: 'Number'
        },
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.ductedFanAngleParam = {
  init() {
    this.jsonInit({
      message0: '%1',
      args0: [
        {
          type: 'field_slider',
          name: 'NUM',
          min: -15,
          max: 15,
          step: 0.01
        }
      ],
      input_valuesInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
    });
  }
};

Blockly.Blocks.ServoRotateTo = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.SERVO_180_ROTATE_TO,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('SERVO') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'targetAngle',
          check: 'Number'
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.ServoRotate = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.SERVO_180_ROTATE,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('SERVO') || [['?', '?']]
            );
          }
        },
        {
          type: 'input_value',
          name: 'targetAngle',
          check: 'Number'
        }
      ],
      inputsInline: true,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
      previousStatement: null,
      nextStatement: null,
      extensions: ['dropdown_unknown']
    });
  }
};

Blockly.Blocks.GetServoRotation = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.SERVO_180_GET_ROTATION,
      args0: [
        {
          type: 'field_dropdown',
          name: 'id',
          options() {
            return (
              DropdownUtil.getDropdownList('SERVO') || [['?', '?']]
            );
          }
        },
      ],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
      extensions: ['dropdown_unknown']
    });
  }
}

Blockly.Blocks.servoAngleParam = {
  init() {
    this.jsonInit({
      message0: '%1',
      args0: [
        {
          type: 'field_slider',
          name: 'NUM',
          min: -180,
          max: 180,
          step: 1
        }
      ],
      input_valuesInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
    });
  }
};

Blockly.Blocks.servoAngleParam2 = {
  init() {
    this.jsonInit({
      message0: '%1',
      args0: [
        {
          type: 'field_slider',
          name: 'NUM',
          min: -180,
          max: 180,
          step: 1
        }
      ],
      input_valuesInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_POWER_DEVICE,
    });
  }
};
