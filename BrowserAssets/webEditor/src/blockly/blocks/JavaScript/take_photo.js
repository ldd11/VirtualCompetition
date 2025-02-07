import { EDITOR_CALL } from '@/runtime/constant/index';
import DropdownUtil from '@/utils/DropdownUtil';
import EventUtil from '@/utils/EventUtil';

const { Blockly } = window;

Blockly.Blocks.takePhotoByUsbCamera = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.TAKE_PHOTO_BY_USB_CAMERA,
      args0: [
        {
          type: 'field_dropdown',
          name: 'delayTime',
          options: [
            [Blockly.Msg.TAKE_PHOTO_AUTO, '0'],
            [Blockly.Msg.TAKE_PHOTO_AUTO1, '1'],
            [Blockly.Msg.TAKE_PHOTO_AUTO3, '3'],
            [Blockly.Msg.TAKE_PHOTO_AUTO5, '5'],
            [Blockly.Msg.TAKE_PHOTO_AUTO10, '10'],
            [Blockly.Msg.TAKE_PHOTO_NO_AUTO, '-1']
          ]
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TAKE_PHOTO
    });
  }
};

Blockly.Blocks.usbImage = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.USB_IMAGE,
      inputsInline: true,
      output: 'String',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TAKE_PHOTO
    });
  }
};

Blockly.Blocks.takePhotoByVirtualCamera = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.TAKE_PHOTO_BY_VIRTUAL_CAMERA,
      args0: [
        {
          type: 'field_dropdown',
          name: 'delayTime',
          options: [
            [Blockly.Msg.TAKE_PHOTO_AUTO, '0'],
            [Blockly.Msg.TAKE_PHOTO_AUTO1, '1'],
            [Blockly.Msg.TAKE_PHOTO_AUTO3, '3'],
            [Blockly.Msg.TAKE_PHOTO_AUTO5, '5'],
            [Blockly.Msg.TAKE_PHOTO_AUTO10, '10'],
            [Blockly.Msg.TAKE_PHOTO_NO_AUTO, '-1']
          ]
        },
        {
          type: 'input_dummy',
          name: 'camera',
        }
      ],
      extensions: ['dynamic_virtual_camera_extension'],
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TAKE_PHOTO
    });
  }
};


Blockly.Extensions.register('dynamic_virtual_camera_extension', function () {
  this.getInput('camera').appendField(
    new Blockly.FieldDropdown(() => DropdownUtil.getDropdownList('virtual_camera') || [['无设备', 'empty']]),
    'camera'
  );
});

EventUtil.on(EDITOR_CALL.UPDATE_DROPDOWN, ({ key, list, oldList }) => {
  if (key === 'virtual_camera') {
    EventUtil.emit(EDITOR_CALL.UPDATE_DROPDOWN_VALUE, 'takePhotoByVirtualCamera', 'camera', list, oldList);
  }
});

Blockly.Blocks.virtualImage = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.VIRTUAL_IMAGE,
      inputsInline: true,
      output: 'String',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TAKE_PHOTO
    });
  }
};

Blockly.Blocks.takePhotoByLocalCamera = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_LOCAL_PHOTO,
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TAKE_PHOTO
    });
  }
};

Blockly.Blocks.localImage = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.LOCAL_IMAGE,
      inputsInline: true,
      output: 'String',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_TAKE_PHOTO
    });
  }
};
