const { Blockly } = window;

// 通用
Blockly.Msg.USB_IMAGE = 'USB相机图片';
Blockly.Msg.VIRTUAL_IMAGE = '虚拟相机图片';
Blockly.Msg.LOCAL_IMAGE = '本地上传图片';
Blockly.Msg.DIRECTION_FRONT = '前方';
Blockly.Msg.DIRECTION_BACK = '后方';
Blockly.Msg.DIRECTION_LEFT = '左方';
Blockly.Msg.DIRECTION_RIGHT = '右方';
Blockly.Msg.DIRECTION_TOP = '上方';
Blockly.Msg.DIRECTION_BOTTOM = '下方';
Blockly.Msg.ENABLE = '开启';
Blockly.Msg.DISABLE = '关闭';
Blockly.Msg.POSITION_X = 'X坐标';
Blockly.Msg.POSITION_Y = 'Y坐标';
Blockly.Msg.POSITION_Z = 'Z坐标';
Blockly.Msg.VIEW_PERCENTAGE = '视窗占比';
Blockly.Msg.START = '开始';
Blockly.Msg.STOP = '停止';
Blockly.Msg.CANCEL = '取消';
Blockly.Msg.SIGN = '标志';

// ai
Blockly.Msg.AI_ENABLE_TARGET_RECOGNITION = 'AI %1 目标物体识别';
Blockly.Msg.AI_GET_TARGET_RECOGNITION_COUNT = '目标物体 %1 的数量';
Blockly.Msg.AI_GET_TARGET_RECOGNITION_VALUE = '第 %1 个 %2 %3';
Blockly.Msg.AI_CHECK_TARGET_RECOGNIZED = '识别到 %1 ?';
Blockly.Msg.AI_ENABLE_TARGET_RECOGNITION_ON = '开启';
Blockly.Msg.AI_ENABLE_TARGET_RECOGNITION_OFF = '关闭';
Blockly.Msg.AI_TARGET_MARS_WATER = '火星水';
Blockly.Msg.AI_TARGET_ALLUVIAL_FAN = '冲积扇';
Blockly.Msg.AI_TARGET_ROCKY_BEACH = '石滩';
Blockly.Msg.AI_TARGET_WATER_TRACES= '水痕迹';
Blockly.Msg.AI_TARGET_MARS_BLUEBERRY = '火星蓝莓';
Blockly.Msg.AI_TARGET_GYPSUM_ORE = '石膏矿石';
Blockly.Msg.AI_TARGET_QUARTZ_ORE= '石英矿石';
Blockly.Msg.AI_TARGET_METEORITE = '陨石';
Blockly.Msg.AI_TARGET_HUMAN = '行人';
Blockly.Msg.AI_TARGET_LIHUADAN = '礼花蛋';
Blockly.Msg.AI_TARGET_X_INFO = 'X坐标';
Blockly.Msg.AI_TARGET_Y_INFO = 'Y坐标';
Blockly.Msg.AI_TARGET_Z_INFO = 'Z坐标';
Blockly.Msg.AI_TARGET_PERCENTAGE_INFO = '视窗占比';


// animation
Blockly.Msg.ANIMATION_PLAY_SUR_PLACE = '原地踏步';
Blockly.Msg.ANIMATION_PLAY_TUMBLE = '翻跟头';
Blockly.Msg.ANIMATION_PLAY_RED_ENVELOPE = '讨红包';
Blockly.Msg.ANIMATION_PLAY_DOUBT = '疑问';
Blockly.Msg.ANIMATION_PLAY_NOD = '点头';
Blockly.Msg.ANIMATION_PLAY_DOWN = '趴下';
Blockly.Msg.ANIMATION_PLAY_SIT = '坐下';
Blockly.Msg.ANIMATION_PLAY_ROLL = '打滚';
Blockly.Msg.ANIMATION_PLAY_HAND_SHAKE = '握手';
Blockly.Msg.ANIMATION_PLAY_DANCE = '跳舞';
Blockly.Msg.ANIMATION_PLAY_FEAR = '恐惧';
Blockly.Msg.ANIMATION_PLAY_HAPPY = '高兴';
Blockly.Msg.ANIMATION_PLAY_BRAKE = '刹车';
Blockly.Msg.ANIMATION_PLAY_CHASE_TAIL = '追尾巴';

// control
Blockly.Msg.CONTROL_REPEAT_DO = '重复执行 %1 %2';
Blockly.Msg.CONTROL_REPEAT_DO_TIMES = '重复执行 %1 次';
Blockly.Msg.CONTROL_CONTROL_BREAK = '退出循环';
Blockly.Msg.CONTROL_WAIT = '等待 %1 秒';
Blockly.Msg.CONTROL_WAIT_UNTIL = '保持等待直到 %1';
Blockly.Msg.CONTROL_REPEAT_DO_AND_WAIT_UNTIL = '重复执行直到 %1 %2 %3';

// event
Blockly.Msg.EVENT_ON_RECV_BROADCAST = '当收到广播 %1 %2 %3';
Blockly.Msg.EVENT_SEND_BROADCAST = '发送广播 %1 并等待完成';
Blockly.Msg.EVENT_PRINT = '打印 %1';
Blockly.Msg.EVENT_FUNC_MAIN = '当开始运行时 %1 %2';

// extension
Blockly.Msg.EXTENSION_ACTIVE_ROBOT_ARM = '%1 机械臂扩展机构';
Blockly.Msg.EXTENSION_CHECK_ROBOT_ARM_STATUS = '机械臂被 %1?';
Blockly.Msg.EXTENSION_MOVE_PINCHER = '控制机械爪移动到绝对坐标 ( X %1, Y %2, Z %3 ) %4';
Blockly.Msg.EXTENSION_STORE_ITEM_IN_PINCHER = '机械爪收起当前夹持物';
Blockly.Msg.EXTENSION_LOAD_ITEM_FROM_PINCHER = '机械爪取出 %1 为夹持物';
Blockly.Msg.EXTENSION_ARM_LOAD_ACTION = '加载';
Blockly.Msg.EXTENSION_ARM_UNLOAD_ACTION = '卸载';
Blockly.Msg.EXTENSION_ARM_GET_ACTION = '抓取';
Blockly.Msg.EXTENSION_ARM_PUT_ACTION = '放置';
Blockly.Msg.EXTENSION_ITEM_ENERGY_BALL = '监测球';
Blockly.Msg.EXTENSION_ITEM_POTATO_BALL = '土豆植物球';
Blockly.Msg.EXTENSION_ITEM_TOMATO_BALL = '番茄植物球';
Blockly.Msg.EXTENSION_ITEM_CORN_BALL = '玉米植物球';

// math
Blockly.Msg.MATH_STR_COMPARE = '%1 %2 %3';
Blockly.Msg.MATH_LENGTHV2 = '两点间直线距离: 坐标1(%1, %2) 坐标2(%3, %4)';
Blockly.Msg.MATH_TRANSFER_TO_STRING = '%1 转换为字符串';
Blockly.Msg.MATH_TRANSFER_TO_NUMBER = '%1 转换为数字';
Blockly.Msg.MATH_RANDOM = '在 %1 到 %2 间随机选一个整数';
Blockly.Msg.MATH_DEGREE = '%1 %2';
Blockly.Msg.MATH_ROUND = '%1 %2';
Blockly.Msg.MATH_TAKEREMINDER = '%1 除以 %2 的余数';
Blockly.Msg.MATH_MAPNUMBER = '映射 %1 从(%2, %3)到(%4, %5)';
Blockly.Msg.MATH_STRJOIN = '把 %1 %2 放在一起';
Blockly.Msg.MATH_STRLENGTH = '%1 的字符数';
Blockly.Msg.MATH_SUBSTR = '%1 从第 %2 个字符开始的 %3 个字符';
Blockly.Msg.MATH_STRCONTAIN = '%1 包含 %2';
Blockly.Msg.MATH_ADVANCED = '%1 %2';
Blockly.Msg.MATH_PICK = '取 %1, %2 的 %3';
Blockly.Msg.MATH_BETWEEN = '%1 的数值在 %2 到 %3 之间';
Blockly.Msg.MATH_OPTS_contain = '包含';
Blockly.Msg.MATH_OPTS_equal = '等于';
Blockly.Msg.MATH_OPTS_starts_with = '开始是';
Blockly.Msg.MATH_OPTS_ends_with = '结尾是';
Blockly.Msg.MATH_OPTS_number = '数字';
Blockly.Msg.MATH_OPTS_string = '字符串';
Blockly.Msg.MATH_OPTS_max = '大值';
Blockly.Msg.MATH_OPTS_min = '小值';
Blockly.Msg.MATH_OPTS_math_round = '四舍五入';
Blockly.Msg.MATH_OPTS_math_ceil = '向上取整';
Blockly.Msg.MATH_OPTS_math_floor = '向下取整';
Blockly.Msg.MATH_OPTS_ABS = '绝对值';
Blockly.Msg.MATH_OPTS_SQRT = '算术平方根';
Blockly.Msg.MATH_OPTS_NEGATIVE = '-';
Blockly.Msg.MATH_OPTS_LN = 'ln';
Blockly.Msg.MATH_OPTS_LG = 'lg';
Blockly.Msg.MATH_OPTS_E_N = 'e^';
Blockly.Msg.MATH_OPTS_10_N = '10^';


// motion
Blockly.Msg.MOTION_RATE_VALUE_IN_WHEEL = '%1';
Blockly.Msg.MOTION_RATE_VALUE_IN_FOOT = '%1';
Blockly.Msg.MOTION_DISTANCE_VALUE_IN_FOOT = '%1';
Blockly.Msg.MOTION_JUMP_VALUE_IN_FOOT = '%1';
Blockly.Msg.MOTION_BACKFLIP_VALUE_IN_FOOT = '%1';
Blockly.Msg.MOTION_PLATFORM_HEIGHT_VALUE_IN_FOOT = '%1';
Blockly.Msg.MOTION_SINGLE_VALUE = '%1';
Blockly.Msg.MOTION_SET_MOTION_MODE = '切换为 %1 运动模式';
Blockly.Msg.MOTION_FACE_TO_POSITION = '朝向 X坐标(%1), Y坐标(%2)';
Blockly.Msg.MOTION_SET_RATE_IN_FOOT = '足式形态 设置速度为 %1 米/秒';
Blockly.Msg.MOTION_SET_RATE_AND_TIME_IN_FOOT = '足式形态 设置速度为 %1 米/秒，持续 %2 秒';
Blockly.Msg.MOTION_SET_ROTATION = '设置运动角度为 %1 度';
Blockly.Msg.MOTION_ROTATE_UNTIL_END = '%1 %2 %3 度直到结束';
Blockly.Msg.MOTION_ADJUST_PLATFORM_HEIGHT_IN_FOOT = '足式形态 调整平台高度至 %1 厘米';
Blockly.Msg.MOTION_JUMP_IN_FOOT = '足式形态向前跳起 %1 厘米远，%2 厘米高';
Blockly.Msg.MOTION_BACKFLIP_IN_FOOT = '足式形态向后空翻 %1 厘米远, %2 厘米高';
Blockly.Msg.MOTION_SET_RATE_IN_WHEEL = '轮式形态 设置速度为%1 米/秒';
Blockly.Msg.MOTION_SET_RATE_AND_TIME_IN_WHEEL = '轮式形态 设置速度为 %1 米/秒，持续 %2 秒';
Blockly.Msg.MOTION_STOP_MOTION = '停止运动';
Blockly.Msg.MOTION_GET_DIRECTION = '当前的运动方向';
Blockly.Msg.MOTION_FOOT_MODE = '足式形态';
Blockly.Msg.MOTION_WHEEL_MODE = '轮式形态';
Blockly.Msg.MOTION_ROTATE_LEFT = '左转';
Blockly.Msg.MOTION_ROTATE_RIGHT = '右转';
Blockly.Msg.MOTION_FORWAR = '前进';
Blockly.Msg.MOTION_BACK = '后退';
Blockly.Msg.MOTION_MOVE_STATUS_DIRECTION = '运动方向';
Blockly.Msg.MOTION_MOVE_STATUS_ANGLE = '运动偏移角度';
Blockly.Msg.MOTION_MOVE_STATUS_POWER = '动力输出值';
Blockly.Msg.MOTION_MOVE_STATUS_SPEED = '速度';

// sensor
Blockly.Msg.SENSOR_ENABLE_INFRARED_DEPTH_SENSOR = '%1 %2 红外深度传感器测距';
Blockly.Msg.SENSOR_GET_INFRARED_DEPTH_SENSOR_VALUE = '%1 红外深度传感器测距值(米)';
Blockly.Msg.SENSOR_WHEN_INFRARED_DEPTH_SENSOR_VALUE = '当 %1 红外深度传感器 %2 %3 米时 %4 %5';
Blockly.Msg.SENSOR_ENABLE_TERRAIN_AWARENESS = '%1 360°地形感知';
Blockly.Msg.SENSOR_GET_TERRAIN_AWARENESS_VALUE = '地形感知 %1 地块类型';
Blockly.Msg.SENSOR_CHECK_TERRAIN_VALUE = '%1 地块类型为 %2 ?';
Blockly.Msg.SENSOR_GET_LONGITUDE_OR_LATITUDE = '当前机器人大经纬坐标 %1';
Blockly.Msg.SENSOR_GET_POSITION = '机器人的 %1';
Blockly.Msg.SENSOR_CHECK_IF_PASS_COORDINATE = '经过X坐标 %1 Y坐标 %2';
Blockly.Msg.SENSOR_GET_COUNT_TIME = '计时器';
Blockly.Msg.SENSOR_RESET_COUNT_TIME = '计时器归零';
Blockly.Msg.SENSOR_TAKE_PHOTO = '拍照';
Blockly.Msg.SENSOR_RECORD_VIDEO = '%1 录制视频';
Blockly.Msg.SENSOR_VIRTUAL_TAKE_PHOTO = '%1 %2 拍照，并存储为"虚拟相机图片"';
Blockly.Msg.SENSOR_FLAT_GROUND = '平坦平地';
Blockly.Msg.SENSOR_CONCAVE_CONVEX_FLAT = '凹凸平地';
Blockly.Msg.SENSOR_OBSTACLE = '障碍物';
Blockly.Msg.SENSOR_LONGITUDE_VALUE = '经度值';
Blockly.Msg.SENSOR_LATITUDE_VALUE = '纬度值';
Blockly.Msg.SENSOR_TRAFFIC_LIGHT = '红绿灯';
Blockly.Msg.SENSOR_HUMAN = '行人';
Blockly.Msg.SENSOR_ROAD = '路线标识';
Blockly.Msg.SENSOR_TRAFFIC_SIGN = '交通标识';
Blockly.Msg.SENSOR_ITEM = '道具物品';
Blockly.Msg.SENSOR_LIGHT_COLOR = '灯光颜色'
Blockly.Msg.SENSOR_ROAD_NO_LINE = '无引导线';
Blockly.Msg.SENSOR_ROAD_ONE_LINE = '单线';
Blockly.Msg.SENSOR_ROAD_Y_LINE = 'Y字路口';
Blockly.Msg.SENSOR_ROAD_CROSS_LINE = '十字路口';
Blockly.Msg.SENSOR_ROAD_LINE_VIEW_X = '视窗X坐标';
Blockly.Msg.SENSOR_ROAD_LINE_VIEW_Y = '视窗Y坐标';
Blockly.Msg.SENSOR_ROAD_LINE_TANGENCY = '切线角';
Blockly.Msg.SENSOR_ROAD_LINE_CURVATURE = '曲率';
Blockly.Msg.SENSOR_OBSTACLE_DISTANCE = '障碍物距离';
Blockly.Msg.SENSOR_OBSTACLE_HEIGHT = '障碍物高度';
Blockly.Msg.SENSOR_ACCEL = '加速度';
Blockly.Msg.SENSOR_SPEED = '瞬时速度';
Blockly.Msg.SENSOR_YAW_ANGLE = '航向角';
Blockly.Msg.SENSOR_PITCH_ANGLE = '俯仰角';
Blockly.Msg.SENSOR_ROLL_ANGLE = '横滚角';

// sentence_recognition

// variable
Blockly.Msg.VARIABLES_DEFAULT_NAME = 'item';
Blockly.Msg.VARIABLES_SET = '%1 = %2';
Blockly.Msg.MATH_CHANGE_TITLE = '%1 += %2';
Blockly.Msg.PROCESSING_VARIABLES_SET = '设置变量 %1 的值为 %2';
Blockly.Msg.PROCESSING_VARIABLES_GETGLOBAL = '变量 %1';
Blockly.Msg.PROCESSING_VARIABLES_CHANGE = '使变量 %1 %2 %3';
Blockly.Msg.PROCESSING_VARIABLES_DELETE = '删除变量 %1';
Blockly.Msg.PROCESSING_VARIABLES_MODIFY = '修改变量 %1';
Blockly.Msg.PROCESSING_VARIABLES_VISIBLE = '%1 变量 %2';
Blockly.Msg.PROCESSING_LISTS_GETGLOBAL = '列表 %1';
Blockly.Msg.PROCESSING_LISTS_APPEND = '将 %1 加入 %2';
Blockly.Msg.PROCESSING_LISTS_REMOVENTHELEMENT = '删除 %1 的第 %2 项';
Blockly.Msg.PROCESSING_LISTS_REMOVEALL = '删除 %1 的全部项目';
Blockly.Msg.PROCESSING_LISTS_INSERTELEMENTBEFORENTHELEMENT = '在 %1 的第 %2 项前插入 %3';
Blockly.Msg.PROCESSING_LISTS_REPLACENTHELEMENT = '将 %1 的第 %2 项替换为 %3';
Blockly.Msg.PROCESSING_LISTS_NTHELEMENT = '%1 的第 %2 项';
Blockly.Msg.PROCESSING_LISTS_FIRSTPOSOFELEMENTAPPEARS = '%1 中第一个 %2 的编号';
Blockly.Msg.PROCESSING_LISTS_ELEMENTSNUM = '%1 的项目数';
Blockly.Msg.PROCESSING_LISTS_CONTAINSELEMENT = '%1 包含 %2 ?';
Blockly.Msg.PROCESSING_LISTS_VISIBLE = '%1 列表 %2';

// sentence_recognition
Blockly.Msg.SENTENCE_RECOGNITION_START_SENTENCE_RECOGNITION = '开启 %1 语音识别';
Blockly.Msg.SENTENCE_RECOGNITION_GET_SENTENCE_RECOGNITION_RESULT = '语音识别结果';
Blockly.Msg.SENTENCE_LANGUAGE_ZH = '普通话';
Blockly.Msg.SENTENCE_LANGUAGE_EN = '英语';
Blockly.Msg.SENTENCE_LANGUAGE_CA = '粤语';

// AI机器人闲聊
Blockly.Msg.EASY_AI_ROBOT_CHOOSE_CHAT = '对 %1 说 %2';
Blockly.Msg.EASY_AI_ROBOT_I_SAY = '我说 %1';
Blockly.Msg.EASY_AI_ROBOT_AI_SAYS = '对方的发言';
Blockly.Msg.EASY_AI_ROBOT_AI_INPUT = '请输入文字';
Blockly.Msg.EASY_AI_ROBOT_NAME_WYNNE = '维尼';
Blockly.Msg.EASY_AI_ROBOT_NAME_JENNY = '珍妮';
Blockly.Msg.EASY_AI_ROBOT_NAME_JASON = '杰森';
Blockly.Msg.EASY_AI_ROBOT_NAME_JIMMY = '吉米';
Blockly.Msg.EASY_AI_ROBOT_NAME_USER = '我';
Blockly.Msg.START_AI_ROBOT_CHAT = '%1 问 %2 ： %3';
Blockly.Msg.GET_AI_ROBOT_AI_ANSWER = '%1 的回答';

// 语音合成
Blockly.Msg.SPEAKER_ALOUND_SOMETHING = '朗读 %1';
Blockly.Msg.SPEAKER_ALOUND_SOMETHING_UTIL = '朗读 %1 直到结束';
Blockly.Msg.SPEAKER_TYPE_SET = '发音人设置 %1';
Blockly.Msg.SPEAKER_SPEED_SET = '将语速设为 %1';
Blockly.Msg.SPEAKER_NORMAL = '智逍遥';
Blockly.Msg.SPEAKER_NORMAL1 = '智瑜';
Blockly.Msg.SPEAKER_NORMAL2 = '智聆';
Blockly.Msg.SPEAKER_NORMAL3 = '智美';
Blockly.Msg.SPEAKER_NORMAL4 = '智云';
Blockly.Msg.SPEAKER_NORMAL5 = '智莉';
Blockly.Msg.SPEAKER_NORMAL6 = '智娜';
Blockly.Msg.SPEAKER_NORMAL7 = '智琪';
Blockly.Msg.SPEAKER_NORMAL8 = '智芸';
Blockly.Msg.SPEAKER_NORMAL9 = '智华';
Blockly.Msg.SPEAKER_NORMAL10 = '智蓉';
Blockly.Msg.SPEAKER_NORMAL11 = '智靖';
Blockly.Msg.SPEAKER_NORMAL12 = 'WeJack';
Blockly.Msg.SPEAKER_NORMAL13 = 'WeRose';
Blockly.Msg.SPEAKER_SPEED1 = '0.6倍';
Blockly.Msg.SPEAKER_SPEED2 = '0.8倍';
Blockly.Msg.SPEAKER_SPEED3 = '1倍';
Blockly.Msg.SPEAKER_SPEED4 = '1.2倍';

// 翻译
Blockly.Msg.TRANSLATE_TEXT = '%1 将 %2 翻译为 %3';
Blockly.Msg.TEXT_TRANSLATE_ZH = '中文';
Blockly.Msg.TEXT_TRANSLATE_EN = '英文';
Blockly.Msg.TEXT_TRANSLATE_KR = '韩文';
Blockly.Msg.TEXT_TRANSLATE_JP = '日文';

// 人脸识别
Blockly.Msg.START_FACE_DETECT = '对 %1 进行人脸检测';
Blockly.Msg.GET_FACE_DETECT_INFO = '人脸检测 %1';
Blockly.Msg.GET_FACE_DETECT_INFO_OF_TEXT = '人脸检测 到的 %1 信息';
Blockly.Msg.GET_FACE_DETECT_INFO_OF_NUMBER = '人脸检测 到的 %1 数值';
Blockly.Msg.GET_FACE_DETECT_INFO_OF_BOOL = '人脸检测，识别到 %1 ?';
Blockly.Msg.FACE_DETECT_RESULT_AGE = '年龄';
Blockly.Msg.FACE_DETECT_RESULT_GENDER = '性别';
Blockly.Msg.FACE_DETECT_RESULT_EMOTION = '情绪';
Blockly.Msg.FACE_DETECT_RESULT_GLASS = '眼镜';
Blockly.Msg.FACE_DETECT_RESULT_MASK = '口罩';
Blockly.Msg.FACE_DETECT_RESULT_BEATURY = '魅力值';
Blockly.Msg.FACE_DETECT_RESULT_HAIR = '头发';


// 拍照
Blockly.Msg.TAKE_PHOTO_BY_USB_CAMERA = ' %1 , USB相机拍照, 并存储为 USB相机图片';
Blockly.Msg.USB_IMAGE_KEY = 'Usb';
Blockly.Msg.TAKE_PHOTO_BY_VIRTUAL_CAMERA = '%1 , 使用摄像机%2拍照, 并存储为 虚拟相机图片';
Blockly.Msg.VIRTUAL_IMAGE_KEY = 'Virtual';
Blockly.Msg.GET_LOCAL_PHOTO = '上传本地图片，存储为 本地图片';
Blockly.Msg.LOCAL_IMAGE_KEY = 'Local';
Blockly.Msg.TAKE_PHOTO_AUTO = '立即(自动)';
Blockly.Msg.TAKE_PHOTO_AUTO1 = '延迟1秒(自动)';
Blockly.Msg.TAKE_PHOTO_AUTO3 = '延迟3秒(自动)';
Blockly.Msg.TAKE_PHOTO_AUTO5 = '延迟5秒(自动)';
Blockly.Msg.TAKE_PHOTO_AUTO10 = '延迟10秒(自动)';
Blockly.Msg.TAKE_PHOTO_NO_AUTO = '手动触发';

// 识别物体-微信识物版本
Blockly.Msg.DETECT_PRODUCT_BETA = '对 %1 进行微信识物';
Blockly.Msg.DETECT_PRODUCT_BETA_RESULT = '微信识物结果';

// 文字识别
Blockly.Msg.TEXT_RECOGNITION_START = '对 %2 进行 %1 识别';
Blockly.Msg.TEXT_RECOGNITION_1 = '印刷体文字';
Blockly.Msg.TEXT_RECOGNITION_2 = '手写体文字';
Blockly.Msg.TEXT_RECOGNITION_RESULT = '文字识别结果';

// 键盘事件
Blockly.Msg.KEYBOARD_EVENT1 = '%1 键盘 %2 %3 %4';
Blockly.Msg.KEYBOARD_EVENT2 = '%1 键盘 %2';
Blockly.Msg.KEYBOARD_PRESS = '按下';
Blockly.Msg.KEYBOARD_PRESSUP = '松开';
Blockly.Msg.KEYBOARD_PRESSHOLD = '按住';
Blockly.Msg.KEYBOARD_A = 'A';
Blockly.Msg.KEYBOARD_B = 'B';
Blockly.Msg.KEYBOARD_C = 'C';
Blockly.Msg.KEYBOARD_D = 'D';
Blockly.Msg.KEYBOARD_E = 'E';
Blockly.Msg.KEYBOARD_F = 'F';
Blockly.Msg.KEYBOARD_G = 'G';
Blockly.Msg.KEYBOARD_H = 'H';
Blockly.Msg.KEYBOARD_I = 'I';
Blockly.Msg.KEYBOARD_J = 'J';
Blockly.Msg.KEYBOARD_K = 'K';
Blockly.Msg.KEYBOARD_L = 'L';
Blockly.Msg.KEYBOARD_M = 'M';
Blockly.Msg.KEYBOARD_N = 'N';
Blockly.Msg.KEYBOARD_O = 'O';
Blockly.Msg.KEYBOARD_P = 'P';
Blockly.Msg.KEYBOARD_Q = 'Q';
Blockly.Msg.KEYBOARD_R = 'R';
Blockly.Msg.KEYBOARD_S = 'S';
Blockly.Msg.KEYBOARD_T = 'T';
Blockly.Msg.KEYBOARD_U = 'U';
Blockly.Msg.KEYBOARD_V = 'V';
Blockly.Msg.KEYBOARD_W = 'W';
Blockly.Msg.KEYBOARD_X = 'X';
Blockly.Msg.KEYBOARD_Y = 'Y';
Blockly.Msg.KEYBOARD_Z = 'Z';
Blockly.Msg.KEYBOARD_UP = '↑';
Blockly.Msg.KEYBOARD_DOWN = '↓';
Blockly.Msg.KEYBOARD_LEFT = '←';
Blockly.Msg.KEYBOARD_RIGHT = '→';

// Teachable Machine
Blockly.Msg.START_TM_PREDICT = '开始使用机器学习模型 %1 对 %2 进行预测';
Blockly.Msg.CHECK_TM_PREDICT_RESULT_BOOL = '机器学习模型 %1 对 %2 的预测结果为 %3';
Blockly.Msg.GET_TM_PREDICT_RESULT_PROBABILITY = '机器学习模型 %1 对 %2 的预测结果';

Blockly.Msg.START_TM_PREDICT_IMAGE = '图片机器学习模型 %1 对 %2 进行预测';
Blockly.Msg.CHECK_TM_PREDICT_IMAGE_RESULT = '图片机器学习模型 %1 对 %2 的预测结果';
Blockly.Msg.CHECK_TM_PREDICT_IMAGE_RESULT_BOOL = '图片机器学习模型 %1 对 %2 的预测结果为 %3';
Blockly.Msg.GET_TM_PREDICT_IMAGE_RESULT_PROBABILITY = '机器学习模型 %1 对 %2 的预测结果置信度（%）';

Blockly.Msg.START_TM_PREDICT_AUDIO = '使用 %1 音频机器学习模型，对USB音频流进行实时预测';
Blockly.Msg.CHECK_TM_PREDICT_AUDIO_RESULT = '音频机器学习模型 %1 的预测结果';
Blockly.Msg.CHECK_TM_PREDICT_AUDIO_RESULT_BOOL = '音频机器学习模型 %1 的预测结果为 %2';
Blockly.Msg.GET_TM_PREDICT_AUDIO_RESULT_PROBABILITY = '音频机器学习模型 %1 的预测结果置信度（%）';

Blockly.Msg.START_TM_PREDICT_POSE = '姿态机器学习模型 %1 对 %2 进行预测';
Blockly.Msg.CHECK_TM_PREDICT_POSE_RESULT = '姿态机器学习模型 %1 对 %2 的预测结果';
Blockly.Msg.CHECK_TM_PREDICT_POSE_RESULT_BOOL = '姿态机器学习模型 %1 对 %2 的预测结果为 %3';
Blockly.Msg.GET_TM_PREDICT_POSE_RESULT_PROBABILITY = '姿态机器学习模型 %1 对 %2 的预测结果置信度（%）';



// 新机器狗识别
Blockly.Msg.SET_SENSOR_ON = '虚拟摄像头 %1 %2 %3 识别';
Blockly.Msg.GET_RECOGNIZED_TRAFFIC_LIGHT_COUNT = '摄像头 %1 识别到的红绿灯数量';
Blockly.Msg.GET_RECOGNIZED_TRAFFIC_LIGHT_INFO = '摄像头 %1 识别到的第 %2 个 红绿灯 %3 信息';
Blockly.Msg.GET_RECOGNIZED_TRAFFIC_LIGHT_INFO_OF_TEXT = '摄像头 %1 识别到的第 %2 个红绿灯 灯光信息';
Blockly.Msg.GET_RECOGNIZED_TRAFFIC_LIGHT_INFO_OF_NUMBER = '摄像头 %1 识别到的第 %2 个红绿灯 %3 数值';
Blockly.Msg.GET_RECOGNIZED_HUMAN_COUNT = '摄像头 %1 识别到的行人数量';
Blockly.Msg.GET_RECOGNIZED_HUMAN_INFO = '摄像头 %1 识别到的第 %2 个行人 %3 信息';
Blockly.Msg.GET_RECOGNIZED_HUMAN_NAME = '摄像头 %1 识别到的第 %2 个行人名称';
Blockly.Msg.SET_ROAD_RECOGNIZE_COLOR = '设置 %1 摄像头识别颜色为 %2';
Blockly.Msg.GET_RECOGNIZED_ROAD_LINE_COUNT = '摄像头 %1 识别到的路线数量';
Blockly.Msg.IS_RECOGNIZE_ROAD_LINE_TYPE = '摄像头 %1 识别到的路线类型为 %2';
Blockly.Msg.GET_RECOGNIZED_ROAD_LINE_INFO = '摄像头 %1 识别到的第 %2 条线的第 %3 个点的 %4 数值';
Blockly.Msg.GET_RECOGNIZED_TRAFFIC_SIGN_COUNT = '摄像头 %1 识别到的交通标志数量';
Blockly.Msg.GET_RECOGNIZED_TRAFFIC_SIGN_INFO = '摄像头 %1 识别到的第 %2 个交通标志 %3 信息';
Blockly.Msg.GET_RECOGNIZED_TRAFFIC_SIGN_INFO_OF_TEXT = '摄像头 %1 识别到的第 %2 个交通标志信息';
Blockly.Msg.GET_RECOGNIZED_TRAFFIC_SIGN_INFO_OF_NUMBER = '摄像头 %1 识别到的第 %2 个交通标志 %3 数值';
Blockly.Msg.GET_RECOGNIZED_ITEM_COUNT = '摄像头 %1 识别到的道具数量';
Blockly.Msg.GET_RECOGNIZED_ITEM_NAME = '摄像头 %1 识别到的第 %2 个道具名称';
Blockly.Msg.GET_RECOGNIZED_ITEM_INFO = '摄像头 %1 识别到的第 %2 个道具 %3 信息';

// 雷达感知
Blockly.Msg.SET_RADAR_ON = '%1 360雷达障碍感知';
Blockly.Msg.GET_RADAR_SENSOR_COUNT = '360雷达: 在 %1 °方向的障碍物数量';
Blockly.Msg.GET_RADAR_SENSOR_INFO_IN_ANGLE = '360雷达: 在 %1 °方向的第 %2 个障碍物的 %3 数值（米）';

// 物理引擎运动
Blockly.Msg.SET_MOVE_POWER = '以 %1 % 动力 %2';
Blockly.Msg.SET_MOVE_POWER_IN_TIME = '以 %1 % 动力 %2，持续 %3 秒';
Blockly.Msg.ROTATE_IN_TIME = '%1 %2 °，以 %3 % 动力 %4，持续 %5 秒';
Blockly.Msg.BRAKE_UNTIL_END = '以 %1 % 动力刹车，直到静止';
Blockly.Msg.GET_MOVE_STATUS = '机器人当前的运动状态: %1 数值';
Blockly.Msg.GET_VALUE_BY_POSITION_TYPE = '机器人当前的 %1 坐标值';

// 执行器
Blockly.Msg.LCD_SET_BG_COLOR = '小型LCD显示屏 %1 ：设置背景色为 %2';
Blockly.Msg.LCD_SET_FONT_SIZE = '小型LCD显示屏 %1 ：设置字体大小为 %2';
Blockly.Msg.LCD_SHOW_STRING_ON_NTH_LINE = '小型LCD显示屏 %1 ：显示字符 %2';
Blockly.Msg.MOTOR_ROTATE = '编码电机 %1 ：以 %2 RPM %3';
Blockly.Msg.MOTOR_ROTATE_WITH_SECOND = '编码电机 %1 ：以 %2 RPM %3，持续 %4 秒';
Blockly.Msg.MOTOR_ROTATE_WITH_ANGLE = '编码电机 %1 ：以 %2 RPM %3 %4度';
Blockly.Msg.LED_SET_COLOR = 'LED彩灯模块 %1 ：显示 %2';
Blockly.Msg.LED_SET_COLOR_WITH_SECOND = 'LED彩灯模块 %1 ：显示 %2 持续 %3 秒';
Blockly.Msg.LED_SET_RGB = 'LED彩灯模块 %1 ：显示 R %2 G %3 B %4';
Blockly.Msg.LED_SET_RGB_WITH_SECOND = 'LED彩灯模块 %1 ：显示 R %2 G %3 B %4 持续 %5 秒';
Blockly.Msg.LED_ADD_BRIGHTBRIGHTNESS = 'LED彩灯模块 %1 ：将亮度增加 %2 %';
Blockly.Msg.LED_SET_BRIGHTBRIGHTNESS = 'LED彩灯模块 %1 ：将亮度设置为 %2 %';
Blockly.Msg.LED_GET_BRIGHTBRIGHTNESS = 'LED彩灯模块 %1 的亮度';
Blockly.Msg.BRIGHTNESS_PARAM = '%1';
Blockly.Msg.WHEEL_POWER = 'R45动力轮 %1 ：以 %2 % 动力旋转';
Blockly.Msg.MOTOR_ROTATE_FORWARD = '正转';
Blockly.Msg.MOTOR_ROTATE_BACK = '反转';

// 传感器
Blockly.Msg.GET_GYROSCOPE_VALUE = '陀螺仪 %1的 %2 数值';
Blockly.Msg.GET_TEMPERATURE_VALUE = '温度传感器 %1的温度数值（℃）';
Blockly.Msg.GET_LIGHT_VALUE = '光线强度传感器 %1光线强度数值';
Blockly.Msg.GET_HUMIDITY_VALUE = '湿度传感器 %1的湿度数值';
Blockly.Msg.GET_GPS_VALUE = 'GPS传感器 %1 的 %2 数值';
Blockly.Msg.GET_INFRARED_VALUE = '红外测距传感器 %1 的距离数值（厘米）';
Blockly.Msg.GET_CO2_VALUE = '二氧化碳传感器 %1的二氧化碳含量值（%）';
Blockly.Msg.GET_SO2_VALUE = '二氧化硫传感器 %1的二氧化硫含量值（%）';
Blockly.Msg.GET_NOISE_VALUE = '噪声传感器 %1的噪声分贝值（dB）';

// 动力装置
Blockly.Msg.DUCTED_FAN_OUTPUT_POWER = '涵道风扇 %1 ：以 %2 %动力输出';
Blockly.Msg.DUCTED_FAN_SET_OUTPUT_POWER_ANGLE = '涵道风扇 %1 ：设置动力输出角度 俯仰角 %2 °，翻滚角 %3 °';
Blockly.Msg.SERVO_180_ROTATE_TO = '设置舵机 %1 转动到 %2 °';
Blockly.Msg.SERVO_180_ROTATE = '设置舵机 %1 转动 %2 °';
Blockly.Msg.SERVO_180_GET_ROTATION = '舵机 %1 的当前角度值（°）';

// LCD
Blockly.Msg.SET_LCD_BACKGROUND = 'LCD显示器 %1 设置背景色为 %2';
Blockly.Msg.LCD_CLEAR = 'LCD显示器 %1 ：清空屏幕';
Blockly.Msg.SET_LCD_FONT = 'LCD显示器 %1 设置字号为 %2 ，颜色为 %3';
Blockly.Msg.ROTATE_LCD_FONT = 'LCD显示器 %1 设置文本旋转方向 %2';
Blockly.Msg.LCD_PRINT = 'LCD显示器 %1 ：打印 %2';
Blockly.Msg.LCD_PRINTLN = 'LCD显示器 %1 ：打印 %2 并换行';
Blockly.Msg.LCD_COLOR_BLACK = '黑色';
Blockly.Msg.LCD_COLOR_YELLOW = '黄色';
Blockly.Msg.LCD_COLOR_RED = '红色';
Blockly.Msg.LCD_COLOR_BLUE = '蓝色';
Blockly.Msg.LCD_COLOR_GREEN = '绿色';
Blockly.Msg.LCD_COLOR_WHITE = '白色';
Blockly.Msg.LCD_FONT_SMALL = '小';
Blockly.Msg.LCD_FONT_MIDIUM = '中';
Blockly.Msg.LCD_FONT_LARGE = '大';
Blockly.Msg.LCD_FONT_ANGLE_0 = '0° （默认）';
Blockly.Msg.LCD_FONT_ANGLE_90 = '90° （右）';
Blockly.Msg.LCD_FONT_ANGLE_180 = '180° （倒置）';
Blockly.Msg.LCD_FONT_ANGLE_270 = '270° （左）';


// debug
Blockly.Msg.SET_ROBOT_INITIAL_POS = '调试： 设置机器人初始坐标 X %1 Y %2 朝向 %3 °';
Blockly.Msg.SET_ROBOT_DRONE_INITIAL_POS = '调试： 设置无人机初始坐标 X %1 Y %2 Z %3 朝向 %4 度并开启飞行模式';

// qqcar
Blockly.Msg.QQCAR_SET_MOTION_MODE = '切换运动模式为 %1';
Blockly.Msg.QQCAR_SET_RATE_AND_TIME_ON_LAND = '陆地模式：%1 以速度 %2 m/s，持续 %3 秒';
Blockly.Msg.QQCAR_SET_RATE_ON_LAND = '陆地模式：%1 设置速度 为%2 m/s';
Blockly.Msg.QQCAR_ROTATE_AND_SET_RATE_AND_TIME_ON_LAND = '陆地模式：%1 %2 °，以 %3 m/s速度 %4，持续 %5 秒';
Blockly.Msg.QQCAR_ROTATE_AND_SET_RATE_ON_LAND = '陆地模式：%1 %2 °，以 %3 m/s速度 %4';
Blockly.Msg.QQCAR_STOP_MOTION_ON_LAND = '陆地模式：停止运动';
Blockly.Msg.QQCAR_SET_RATE_AND_TIME_ON_AIR = '飞行模式：%1 以速度 %2 m/s，持续 %3 秒';
Blockly.Msg.QQCAR_SET_RATE_ON_AIR = '飞行模式：%1 设置速度 为%2 m/s';
Blockly.Msg.QQCAR_ROTATE_AND_SET_RATE_AND_TIME_ON_AIR = '飞行模式：%1 %2 °，以 %3 m/s速度 %4，持续 %5 秒';
Blockly.Msg.QQCAR_ROTATE_AND_SET_RATE_ON_AIR = '飞行模式：%1 %2 °，以 %3 m/s速度 %4';
Blockly.Msg.QQCAR_START_LANDING = '飞行模式：垂直降落';
Blockly.Msg.QQCAR_STOP_MOTION_ON_AIR = '飞行模式：停止运动，并悬停';
Blockly.Msg.QQCAR_GET_MOTION_STATE = '当前的运动状态：%1 的数值';
Blockly.Msg.QQCAR_SWITCH_LIGHT_AND_SET_COLOR = '%1 %2 灯，设置颜色为 %3';
Blockly.Msg.GET_INFRARED_DEPTH_SENSOR_VALUE_OF_QQCAR = '%1 红外深度传感器的返回值（米）';
Blockly.Msg.QQCAR_MOTION_MODE_AIR = '飞行模式';
Blockly.Msg.QQCAR_MOTION_MODE_LAND = '陆地模式';
Blockly.Msg.QQCAR_DIR_FORWARD = '前进';
Blockly.Msg.QQCAR_DIR_BACK = '后退';
Blockly.Msg.QQCAR_DIR_LEFT = '向左';
Blockly.Msg.QQCAR_DIR_RIGHT = '向右';
Blockly.Msg.QQCAR_DIR_UP = '上升';
Blockly.Msg.QQCAR_DIR_DOWN = '下降';
Blockly.Msg.QQCAR_TURN_LEFT = '左转向';
Blockly.Msg.QQCAR_TURN_RIGHT = '右转向';
Blockly.Msg.QQCAR_MOTION_STATE_X = 'X坐标';
Blockly.Msg.QQCAR_MOTION_STATE_Y = 'Y坐标';
Blockly.Msg.QQCAR_MOTION_STATE_Z = 'Z坐标';
Blockly.Msg.QQCAR_MOTION_STATE_RATE = '速度';
Blockly.Msg.QQCAR_MOTION_STATE_DIR = '运动方向';
Blockly.Msg.QQCAR_LIGHT_ON = '开启';
Blockly.Msg.QQCAR_LIGHT_OFF = '关闭';
Blockly.Msg.QQCAR_LIGHT_DIR_ALL = '全部';
Blockly.Msg.QQCAR_LIGHT_DIR_LEFT_FORWARD = '左前';
Blockly.Msg.QQCAR_LIGHT_DIR_LEFT_BACK = '左后';
Blockly.Msg.QQCAR_LIGHT_DIR_RIGHT_FORWARD = '右前';
Blockly.Msg.QQCAR_LIGHT_DIR_RIGHT_BACK = '右后';
Blockly.Msg.QQCAR_LIGHT_DIR_UP = '上方';
Blockly.Msg.QQCAR_LIGHT_DIR_DOWN = '下方';


// planet
Blockly.Msg.CONFIG_PLANET_ACTION = '设置 %1 为第 %2 轨道，公转周期 %3 天，自转周期 %4 天';
Blockly.Msg.CONFIG_SOLAR_SYSTEM_TIME = '设置太阳系时间流速为 %1 秒/天';

// robot drone
Blockly.Msg.HORIZONTAL_CIRCULAR_MOVE_THEN_HOVER = '以 %1 米/秒线速度绕坐标（X %2, Y %3） %4 水平圆周运动 %5 圈后悬停';
Blockly.Msg.HORIZONTAL_SPRIAL_MOVE_THEN_HOVER = '以 %1 米/秒线速度 %2 米/秒上升速度 绕坐标（X %3, Y %4） %5 水平螺旋运动 %6 圈后悬停';
Blockly.Msg.TUMBLING_MOVE_THEN_HOVER = '%1 翻滚 %2 厘米';
Blockly.Msg.SOMESAULT_MOVE_THEN_HOVER = '%1 筋斗特技 %2 厘米';
Blockly.Msg.BARREL_ROLL_MOVE_THEN_HOVER = '以 %1 米/秒向前桶滚飞行 %2 秒后悬停';
Blockly.Msg.SERPENTINE_MOVE_THEN_HOVER = '以 %1 米/秒向前蛇形飞行 %2 秒后悬停';
Blockly.Msg.FORWARD_SPRIAL_MOVE_THEN_HOVER = '以 %1 米/秒向前 %2 螺旋飞行 %3 秒后悬停';
Blockly.Msg.TURN_ON_FLIGHT_STATUS = '启动飞行状态';
Blockly.Msg.TURN_OFF_FLIGHT_STATUS = '垂直降落并关闭飞行状态';
Blockly.Msg.SET_DRONE_OUTPUT_POWER = '设置动力输出 向左 %1 向前 %2 向上 %3 自旋 %4';
Blockly.Msg.SET_DRONE_OUTPUT_POWER_AND_MOVE_THEN_HOVER = '设置动力输出 向左 %1 向前 %2 向上 %3 自旋 %4 运动 %5 秒后悬停';
Blockly.Msg.SET_DRONE_MOTION_SPEED = '以 %1 米/秒 %2';
Blockly.Msg.SET_DRONE_MOTION_SPEED_AND_MOVE_THEN_HOVER = '以 %1 米/秒 %2 持续 %3 秒后悬停';
Blockly.Msg.HOVER_AND_ROTATE_UNTIL_END = '悬停并 %1 旋转 %2 度直到结束';
Blockly.Msg.FACE_TO_POSITION_THEN_HOVER = '朝向坐标（X %1, Y %2） 后悬停';
Blockly.Msg.SET_DRONE_ROTATION_ANGLE = '设置运动角度为 %1 度';
Blockly.Msg.STOP_MOTION_THEN_HOVER = '停止运动并悬停';
Blockly.Msg.GET_MOTION_SPEED_OR_DIRECTION_VALUE = '获取当前 %1 数值';
Blockly.Msg.GET_DRONE_COORDINATE = '获取当前 %1 坐标';
Blockly.Msg.GET_DRONE_INFRARED_DEPTH_SENSOR_VALUE = '%1 红外深度传感器的返回值（米）';
Blockly.Msg.SET_DRONE_LIGHT_COLOR = '无人机 %1 显示 %2';
Blockly.Msg.SET_DRONE_LIGHT_COLOR_AND_LAST_FOR_SECOND = '无人机 %1 显示 %2 持续 %3 秒';
Blockly.Msg.SET_DRONE_LIGHT_COLOR_TO_FLASH = '无人机 %1 以 %2 闪烁，每 %3 秒点亮 %4 秒';
Blockly.Msg.SET_DRONE_LIGHT_COLOR_TO_FLASH_AND_LAST_FOR_SECOND = '无人机 %1 以 %2 闪烁，每 %3 秒点亮 %4 秒持续 %5 秒';
Blockly.Msg.INCREASE_DRONE_LIGHT_BRIGHTNESS = '无人机 %1 将亮度增加 %2 %';
Blockly.Msg.SET_DRONE_LIGHT_BRIGHTNESS = '无人机 %1 将亮度设置为 %2 %';
Blockly.Msg.GET_DRONE_LIGHT_BRIGHTNESS = '无人机 %1 的亮度';

// actuator
Blockly.Msg.ACTUATOR_MOVE_ARM_PINCHER = '机械臂%1: 伸向绝对坐标(X %2, Y %3, Z %4), 并执行 %5';
Blockly.Msg.ACTUATOR_MOVE_ARM_PINCHER_GET = '抓取';
Blockly.Msg.ACTUATOR_MOVE_ARM_PINCHER_PUT = '放置';

// pid
Blockly.Msg.PID_SET_DEVIATION_VALUES = '设置PID控制器%1的误差：目标值%2 减 实际值 %3';
Blockly.Msg.PID_SET_NEW_PARAMETERS = '设置PID控制器%1的参数Kp %2 Ki %3 Kd %4';
Blockly.Msg.PID_SET_DEVIATION = '设置PID控制器%1的误差为%2';
Blockly.Msg.PID_SET_PARAMETERS = '设置PID控制器%1的参数Kp %2 Ki %3 Kd %4';
Blockly.Msg.PID_GET_OUTPUT = 'PID控制器%1的输出';

// planet
Blockly.Msg.PLANET_SHUI_XING = '水星';
Blockly.Msg.PLANET_JIN_XING = '金星';
Blockly.Msg.PLANET_EARTH = '地球';
Blockly.Msg.PLANET_HUO_XING = '火星';
Blockly.Msg.PLANET_MU_XING = '木星';
Blockly.Msg.PLANET_TU_XING = '土星';
Blockly.Msg.PLANET_TIAN_WANG_XING = '天王星';
Blockly.Msg.PLANET_HAI_WANG_XING = '海王星';

// robot_drone
Blockly.Msg.ROBOT_DRONE_CLOCK_WISE = '顺时针';
Blockly.Msg.ROBOT_DRONE_COUNTER_CLOCK_WISE = '逆时针';
Blockly.Msg.ROBOT_DRONE_FRONT = '向前';
Blockly.Msg.ROBOT_DRONE_BACk = '向后';
Blockly.Msg.ROBOT_DRONE_FORWARD = '前进';
Blockly.Msg.ROBOT_DRONE_BACKWARD = '后退';
Blockly.Msg.ROBOT_DRONE_LEFT = '向左';
Blockly.Msg.ROBOT_DRONE_RIGHT = '向右';
Blockly.Msg.ROBOT_DRONE_UP = '上升';
Blockly.Msg.ROBOT_DRONE_DOWN = '下降';
Blockly.Msg.ROBOT_DRONE_X_SPEED = 'X轴速度';
Blockly.Msg.ROBOT_DRONE_Y_SPEED = 'Y轴速度';
Blockly.Msg.ROBOT_DRONE_Z_SPEED = 'Z轴速度';
Blockly.Msg.ROBOT_DRONE_ROTATE_SPEED = '自旋速度';
Blockly.Msg.ROBOT_DRONE_X_DIRECTION = '运动方向';
Blockly.Msg.ROBOT_DRONE_SIGNAL_LIGHT = '信号灯';
Blockly.Msg.ROBOT_DRONE_LEFT_FRONT_LIGHT = '左前灯';
Blockly.Msg.ROBOT_DRONE_RIGHT_FRONT_LIGHT = '右前灯';
Blockly.Msg.ROBOT_DRONE_LEFT_BACK_LIGHT = '左后灯';
Blockly.Msg.ROBOT_DRONE_RIGHT_BACK_LIGHT = '右后灯';
Blockly.Msg.ROBOT_DRONE_ALL_LIGHT = '全部';

// task
Blockly.Msg.TASK_GET_COUNT = '任务数量';
Blockly.Msg.TASK_GET_TOTAL_SCORE = '当前总得分分值';
Blockly.Msg.TASK_GET_POSITION_INFO = '第 %1 个任务的模糊 %2';
Blockly.Msg.TASK_IS_COMPLETED = '第 %1 个任务已完成？';
// csvdata
Blockly.Msg.DATASET_ROW_OR_COL_NUM = '%1 所包含的 %2';
Blockly.Msg.DATASET_GET_DATA = '%1 的第 %2 %3 （列表）';
Blockly.Msg.DATASET_GET_ONE_DATA = '%1 的第 %2 行第 %3 列的内容（字符串）';


Blockly.Msg.GET_ONE_TEMPERATURE_VALUE = '温度传感器的温度数值（℃）';
Blockly.Msg.GET_ONE_LIGHT_VALUE = '光线强度传感器光线强度数值';
Blockly.Msg.GET_ONE_HUMIDITY_VALUE = '湿度传感器的湿度数值（%）';
Blockly.Msg.GET_ONE_CO2_VALUE = '二氧化碳传感器的二氧化碳含量值（%）';
Blockly.Msg.GET_ONE_SO2_VALUE = '二氧化硫传感器的二氧化硫含量值（%）';
Blockly.Msg.GET_ONE_NOISE_VALUE = '噪声传感器的噪声分贝值（dB）';