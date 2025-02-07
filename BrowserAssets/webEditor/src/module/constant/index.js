
export const defaultEdges = {
  EasyCode_topEdge: '舞台上边缘',
  EasyCode_bottomEdge: '舞台下边缘',
  EasyCode_leftEdge: '舞台左边缘',
  EasyCode_rightEdge: '舞台右边缘',
  EasyCode_allEdge: '舞台边缘',
};

export const defaultGroups = {
  EasyCode_YellowGroup: '黄色阵营',
  EasyCode_RedGroup: '红色阵营',
  EasyCode_BlueGroup: '蓝色阵营',
  EasyCode_NullGroup: '无阵营',
};

export const SCENE_CALL = {
  RESET_SCENE: 'reset_scene',
  DESTROY_SCENE: 'destroy_scene',
};

export const EDITOR_CALL = {
  PLAY: 'play',
  STOP: 'stop',
  STOP_PART_FINISH: 'stop_part_finish',
  LOOP_END: 'loopEnd',
  SAVE_PROJECT: 'save_project'
};

export const EVT_MUSIC = {
  MUSIC_PLAY_NOTE: 'music_play_note'
};

export const ACTOR_CALL = {
  CHECK_TWO_COLOR_TOUCHING: 'checkTwoColorTouching',
  CHECK_TOUCHING_COLOR: 'checkTouchingColor',
  CHECK_INSIDE_SCENE: 'checkInsideScene',
  CHECK_INTOUCH: 'checkInTouch',
  ROTATE_AROUND: 'rotateAround',
  BOUNCE_ON_EDGES: 'bounceOnEndges',
  FACE_TO: 'faceTo',
  MOVE_TO: 'moveTo',
  LAYER_OVER_ACTOR: 'layerOverActor',
  CACULATE_DISTANCE: 'caculateDistance',
  STOP_CODE: 'stopCode',
  CLONE: 'clone',

  TAKE_SNAPSHOT: 'takeSnapshot',

  JOINTO_GROUP: 'joinToGroup',
  QUIT_GROUP: 'quitGroup',
  ASK_QUESTION: 'askQuestion',
  QUESTION_ANSWERS: 'questionAnswers',

  RUN_CODE: 'runCode',
  RUN_BLOCK: 'runBlock',

  SWITCH_SCENE: 'switchScene',
  DELETE_ACTOR: 'deleteActor',
  SET_MUSIC_TARGET: 'setMusicTarget',
};

export const MPYTHON_CALL = {
  MPYTHON_KEY_DOWN: 'mpython_key_down',
  MPYTHON_KEY_UP: 'mpython_key_up',
};
