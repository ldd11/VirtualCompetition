const { Blockly } = window;

Blockly.defineBlocksWithJsonArray([
  {
    type: 'startFaceDetect',
    message0: Blockly.Msg.START_FACE_DETECT,
    args0: [
      {
        type: 'field_dropdown',
        name: 'imageType',
        options: [
          [Blockly.Msg.USB_IMAGE, 'Usb'],
          [Blockly.Msg.VIRTUAL_IMAGE, 'Virtual'],
          [Blockly.Msg.LOCAL_IMAGE, 'Local']
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
  },
  {
    type: 'getFaceDetectResult',
    message0: Blockly.Msg.GET_FACE_DETECT_INFO,
    args0: [
      {
        type: 'field_dropdown',
        name: 'attr',
        options: [
          [Blockly.Msg.FACE_DETECT_RESULT_AGE, 'age'],
          [Blockly.Msg.FACE_DETECT_RESULT_GENDER, 'gender'],
          [Blockly.Msg.FACE_DETECT_RESULT_EMOTION, 'emotion'],
          [Blockly.Msg.FACE_DETECT_RESULT_GLASS, 'glass'],
          [Blockly.Msg.FACE_DETECT_RESULT_MASK, 'mask'],
          [Blockly.Msg.FACE_DETECT_RESULT_BEATURY, 'beauty'],
          [Blockly.Msg.FACE_DETECT_RESULT_HAIR, 'hair']
        ]
      }
    ],
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
  },
  {
    type: 'getFaceDetectResultOfText',
    message0: Blockly.Msg.GET_FACE_DETECT_INFO_OF_TEXT,
    args0: [
      {
        type: 'field_dropdown',
        name: 'attr',
        options: [
          [Blockly.Msg.FACE_DETECT_RESULT_GENDER, 'gender'],
          [Blockly.Msg.FACE_DETECT_RESULT_EMOTION, 'emotion']
        ]
      }
    ],
    inputsInline: true,
    output: 'String',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
  },
  {
    type: 'getFaceDetectResultOfNumber',
    message0: Blockly.Msg.GET_FACE_DETECT_INFO_OF_NUMBER,
    args0: [
      {
        type: 'field_dropdown',
        name: 'attr',
        options: [
          [Blockly.Msg.FACE_DETECT_RESULT_AGE, 'age'],
          [Blockly.Msg.FACE_DETECT_RESULT_BEATURY, 'beauty']
        ]
      }
    ],
    inputsInline: true,
    output: 'Number',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
  },
  {
    type: 'getFaceDetectResultOfBool',
    message0: Blockly.Msg.GET_FACE_DETECT_INFO_OF_BOOL,
    args0: [
      {
        type: 'field_dropdown',
        name: 'attr',
        options: [
          [Blockly.Msg.FACE_DETECT_RESULT_GLASS, 'glass'],
          [Blockly.Msg.FACE_DETECT_RESULT_MASK, 'mask'],
          [Blockly.Msg.FACE_DETECT_RESULT_HAIR, 'hair']
        ]
      }
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
  }
]);
