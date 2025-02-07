
/**
 * 全局消息配置
 * @type {{SAVE_SCENES: string}}
 */

export const EVT_GAME = {
  SAVE_SCENES: 'game_saveScenes',
  START: 'game_start',
  STOP: 'game_stop',
  RENDER: 'game_render',
  UPDATE_CODE: 'game_update_code',
  SUBMIT: 'game_submit',
  SWITCH_SCENE: 'switch_scene',
  DESTROY_SCENE: 'destroy_scene',
  CHECK_GRID_COLOR: 'check_grid_color',
  CHECK_GRID_COLOR_DONE: 'check_grid_color_done',
  USER_STOP: 'game_user_stop',
  CHANGE_STAGE_RATIO: 'change_stage_ratio',
  IMPORT_SPRITE: 'import_sprite',
  IMPORT_SPRITE_BAG: 'import_sprite_bag'
};

export const EVT_ANIM = {
  ADD_BACKGROUND: 'background_add',
  DEL_BACKGROUND: 'background_del',
  CLEAR_BACKGROUND: 'background_clear',
  SELECT_BACKGROUND: 'background_select',
  UPDATE_BACKGROUND: 'background_update',
  CHECK_BACKGROUND: 'background_check',
  ADD_ANIM: 'anim_add',
  ADD_ANIM_IMG: 'anim_addimg',
  UPDATE_ANIM_IMG: 'anim_updateimg',
  DELETE_ANIM_IMG: 'delete_updateimg',
  COPY_ANIM_IMG: 'copy_anim_img',
  UPDATE_ANIM_IMG_DELAYTIME: 'anim_updateimg_delaytime',
  MODIFY_ANIM_NAME: 'anim_modify_name',
  UPDATE_ANIM: 'anim_update',
  SELECT_ANIM: 'anim_select_anim',
  DELETE_ANIM: 'anim_delete_anim',
  COPY_ANIM: 'anim_copy_anim',
  ANIM_DATA_UPDATE: 'anim_data_update',
  SET_BACKGROUND_ANIM: 'anim_set_background',
  CANCEL_BACKGROUND_ANIM: 'anim_cancel_background',
  SWITCH_TAB: 'anim_switch_tab',
  CHOOSE_FRAME: 'anim_choose_frame',
  UPDATE_CURR_ANIM_IMG: 'update_curr_anim_img',
  UPDATE_CURR_ANIM_IMG_NAME: 'update_curr_anim_img_name',
  REMOVE_CURR_ANIM_IMG_PIVOT: 'remove_curr_anim_img_pivot',
  ADD_MULTI_IMGS: 'add_multi_imgs',
  MOVE_FRAME: 'anim_move_frame',
  MOVE_FRAME_REAL: 'anim_move_frame_real',
  HIDE_BG_DROPDOWN: 'hide_bg_dropdown',
  LOAD_ANIM: 'load_anim',
};

export const EVT_AUDIO = {
  ADD_AUDIO: 'audio_add',
  MODIFY_AUDIO_NAME: 'audio_modify_name',
  SELECT_AUDIO: 'select_audio',
  DELETE_AUDIO: 'delete_audio',
  COPY_AUDIO: 'copy_audio',
  SWITCH_AUDIO: 'switch_audio',
  PLAY_AUDIO: 'play_audio',
  SWITCH_TAB: 'switch_audio_tab'
};

export const EVT_DEBUG = {
  STEP_IN: 'debug_step_in',
  STEP_OUT: 'debug_step_out',
  STEP_OVER: 'debug_step_over',
  CONTINUE_PAUSE: 'debug_continue_pause',
  NEXT_STEP: 'debug_next_step',
  OVER: 'debug_over',
  CONSOLE: 'debug_console',
  EXPAND_DEBUG: 'expand_debug'
};

export const EVT_COURSE = {
  EXPAND_COURSE: 'expand_course'
};

export const EVT_SCENES = {
  ADD_SCENE: 'scene_add',
  CHOOSE_SCENE: 'scene_choose',
  RENAME_SCENE: 'scene_rename',
  DELETE_SCENE: 'scene_delete',
  RESET_SCENE: 'scene_reset',
  MOVE_SCENE_START: 'scene_move_start',
  MOVE_SCENE_END: 'scene_move_end',
  REPLACE_ALL_SCENES: 'replace_all_scenes',
};

export const EVT_SPRITES = {
  UPDATE_BGSPRITE: 'bgsprite_update',
  ADD_SPRITE: 'sprite_add',
  DELETE_SPRITE: 'sprite_delete',
  CHOOSE_SPRITE: 'sprite_choose',
  CHOOSE_EDIT_SPRITE: 'choose_edit_sprite',
  RESET_EDIT_SPRITE: 'reset_edit_sprite',
  MOVE_SPRITE: 'sprite_move',
  RENAME_SPRITE: 'sprite_rename',
  SET_SPRITE_VISIBLE: 'sprite_visible',
  EDIT_SPRITE: 'sprite_edit',
  CLONE_SPRITE: 'sprite_clone',
  ADD_SPRITE_FINISH: 'sprite_add_finish',
  SPRITE_PARAM: 'spriteParam',
  SET_X: 'setX',
  SET_Y: 'setY',
  PROP_LOCK: 'propLock',
  SET_PIVOT_X: 'setPivotX',
  SET_PIVOT_Y: 'setPivotY',
  SET_XFLIP: 'setXFlip',
  SET_SCALE: 'setScale',
  SET_ROTATE: 'setRotate',
  SET_DIRECTION: 'setDirection',
  REFRESH_CURR_EDIT_SPRITE: 'sprite_curr_refresh',
  UPDATE_SPRITE_INFO: 'updateSpriteInfo',
  UPDATE_SPRITE_DIRECTION: 'updateSpriteDirection',
  SPRITE_SET_FRAME: 'sprite_set_frame',
  DRAG_START_EDIT_SPRITE: 'drag_start_edit_sprite',
  DRAG_EDIT_SPRITE: 'drag_edit_sprite',
  DRAG_END_EDIT_SPRITE: 'drag_end_edit_sprite',
  DRAG_EDIT_SPRITE_OFFSET: 'drag_edit_sprite.offset',
  LOCATE_BOX: 'locateBox',
  UPDATE_BOX: 'updateBox',
  SHOW_BOX: 'showBox',
  HIDE_BOX: 'hideBox',
  TEMPORARY_HIDE_BOX: 'temporaryHideBox',
  HIDE_CLOCK_DIRECTION: 'hideClockDirection',
  SHOW_CLOCK_DIRECTION: 'showClockDirection',
  NOTIFY_CLOCK_ANGLE: 'notifyClockAngle',
  EXPORT_ACTOR: 'exportActor',
  ADD_TO_BAG: 'add_to_bag',
  SYNC_RUNNING_ACTOR_INFO: 'sync_running_actor_info',
  CLEAR_ANALYZER_REF: 'clear_analyzer_ref',
  UPDATE_ANALYZER_CURRENT_REF: 'update_analyzer_current_ref',
};

export const EVT_MYBAG = {
  UPLOAD_TO_BAG: 'upload_to_bag',
  FETCH_MY_BAG: 'fetch_my_bag',
  CREATE_BAG_TAG: 'create_bag_tag',
  MODIFY_BAG_TAG_NAME: 'modify_bag_tag_name',
  DELETE_BAG_TAG: 'delete_bag_tag',
  FETCH_BAG_ITEM_LIST: 'fetch_bag_item_list',
  MOVE_TO_BAG_TAG: 'move_to_bag_tag',
  MODIFY_BAG_ITEM: 'modify_bag_item',
  DELETE_BAG_ITEM: 'delete_bag_item',
  FETCH_BAG_ITEM_DETAIL: 'fetch_bag_item_detail',
  OPEN_SPRITE_TAG: 'open_sprite_tag',
  FETCH_MY_GROUP: 'fetch_my_group'
};

export const EVT_MATERIAL_AUDIO = {
  ADD: 'AUDIO_ADD',
  RENAME: 'AUDIO_RENAME',
  DELETE: 'AUDIO_DELETE',
  EDIT: 'AUDIO_EDIT',
  SELECT: 'AUDIO_SELECT',
  IMPORT: 'AUDIO_IMPORT',
  ADD_CACHE: 'AUDIO_ADD_CACHE',
  CLONE: 'AUDIO_CLONE',
  UPDATE_DURATION: 'AUDIO_DURATION',
};

export const EVT_INTERPRETER = {
  STOP: 'interpreter_stop',
  PAUSE: 'interpreter_pause',
  ERROR: 'interpreter_error',
  WARN: 'interpreter_warn',
  NEXT: 'interpreter_next_step_changed'
};

export const EVT_EDITOR = {
  UNDO: 'editor_undo',
  REDO: 'editor_redo',
  SWITCH_SPRITE_LIB: 'editor_switch_sprite_lib',
  SWITCH_AUDIO_LIB: 'editor_switch_audio_lib',
  SWITCH_SPRITE_BAG: 'editor_switch_sprite_bag',
  RESIZE: 'editor_resize',
  PALETTE_TOGGLE: 'editor_palette_toggle',
  ZOOM: 'editor_zoom',
  SENDOUT_MESSAGE: 'editor_sendout_message',
  CHANGE_EDITOR_TAB: 'editor_change_editor_tab',
  SWITCH_CODE: 'editor_switch_to_code',
  ALERT: 'editor_alert',
  TOAST: 'editor_toast',
  CLOSE_LEAVE_TIPS: 'close_leave_tips',
  OPEN_LEAVE_TIPS: 'open_leave_tips',
  SHOW_CUSTOM_DATA_EDITOR: 'show_custom_data_editor',
  SHOW_CUSTOM_CONFLICT: 'show_custom_conflict',
  CLICK_WORKSPACE: 'click_workspace',
  OPEN_MY_BAG: 'open_my_bag',
  OPEN_GROUP_BAG: 'open_group_bag',
  OPEN_PERSONAL_GROUP: 'open_personal_group',
  RESIZE_STAGE_MIN_WIDTH: 'resize_stage_min_width',
  SHOW_LOADING_FULL_MASK: 'show_loading_full_mask',
  HIDE_LOADING_FULL_MASK: 'hide_loading_full_mask',
  SHOW_SCRATCH_NO_CORRESPONDING: 'show_scratch_no_corresponding',
};

export const EVT_SPRITE_LIB_API = {
  SUSPEND: 'suspend',
  REBOOT: 'reboot',
  CHECK_IN_CLICK_STATE: 'checkInClickState',
  ROTATE_AROUND: 'rotateAround',
  BROADCAST_MSG: 'broadcastMsg',
  CHECK_SCENE_CHANGED: 'checkSceneChanged',
  BOUNCE_ON_EDGES: 'bounceOnEdges',
  FACE_TO: 'faceTo',
  MOVE_TO: 'moveTo',
  SET_XY_FOR_SEC: 'moveXYForSec',
  PLAY_SOUND: 'playSound',
  SET_SOUND_VOLUME: 'setSoundVolume',
  STOP_SOUND: 'stopSound',
  SHOW_DIALOG: 'showDialog',
  CALCULATE_DISTANCE: 'calculateDistance',
  CHECK_IN_SCENE: 'checkInScene',
  CHECK_LEAVE_EDGES: 'checkLeaveEdges',
  STOP_CODE: 'stopCode',
  CLONE_TARGET: 'cloneTarget',
  CLONE_SNAPSHOT: 'cloneSnapshot',
  STOP_ALL_SOUND: 'stopAllSound',
  DELETE_ACTOR_NAME: 'deleteActorName',
  JOINTO_GROUP: 'joinToGroup',
  QUIT_GROUP: 'quitGroup',
  CHECK_ACTOR_TOUCHING: 'checkActorTouching',
  SWITCH_BG_FRAME: 'switchBGFrame',
  ASK_QUESTION: 'askQuestion',
  TOUCHING_COLOR: 'touchingColor',
  TWO_COLOR_TOUCHING: 'twoColorTouching',
  SET_LAYER_OVER_ACTOR: 'setLayerOverActor',
  QUESTION_ANSWERS: 'questionAnswers'
};

export const EVT_DROPLET = {
  ADD_FUNC: 'add_func'
};

export const EVT_WORLD = {
  GET_PARAM: 'get_param',
  SET_PARAM: 'set_param'
};

export const EVT_BLOCKLY = {
  VARIABLE_CHANGE: 'variable_change',
  SHOW_USER_DATA: 'show_user_data',
  HIDE_USER_DATA: 'hide_user_data',
  REFRESH_TOOLBOX: 'refresh_toolbox',
  INIT: 'blockly_init',
  CHANGE_WORKSPACE: 'change_workspace',
  CLEAR_WORKSPACE: 'clear_workspace',
  CLEAR_UNDO: 'clear_undo',
  CHANGE_ENV: 'change_env',
};

export const EVT_TOOLTIPS = {
  SHOW_TOOLTIPS: 'showTooltips',
  HIDE_TOOLTIPS: 'hideTooltips'
};

export const EVT_MPYTHON = {
  MPYTNON_DEVICE_CONNECTED: 'mpython_device_connected',
  MPYTNON_DEVICE_DISCONNECT: 'mpython_device_disconnect',
  MPYTNON_DEBUG_MSG: 'mpython_debug_msg',
  MPYTNON_MONITOR_RUNNING: 'mpython_monitor_running',
  MPYTHON_GAME_START: 'mpython_game_start',
  MPYTHON_GAME_START_REAL: 'mpython_game_start_real',
  MPYTHON_SEND_MSG: 'mpython_send_msg',
};

export const EVT_MUSIC = {
  MUSIC_PLAY_NOTE: 'music_play_note'
};

export const EVT_CANVAS = {
  FULL_CANVAS: 'FULL_CANVAS',
  NOTIFY_FULL_CANVAS: 'NOTIFY_FULL_CANVAS'
};

export const EVT_HARDWARE = {
  CONNECT_AGENT_FAILED: 'connect_agent_failed',
};

export const EVT_VIDEO = {
  ADD_VIDEO: 'add_video'
};