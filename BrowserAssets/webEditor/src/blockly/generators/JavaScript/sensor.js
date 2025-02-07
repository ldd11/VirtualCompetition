import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

function getPrefix(type) {
  let prefix = '';
  switch (type) {
    case 'percentage':
    case 'x':
    case 'y':
    case 'z':
    case 'tangency':
    case 'curvature':
    case 'distance':
    case 'height':
      prefix = '(float)';
      break;
    default:
      return '(string)';
  }

  return prefix;
}

Blockly.JavaScript.enableInfraredDepthSensor = function (block) {
  const enable = block.getFieldValue('enable');
  const direction = block.getFieldValue('direction');
  return `${generateComment(block)}EnableInfraredDepthSensor(${enable}, "${direction}");\n`;
};

Blockly.JavaScript.getInfraredDepthSensorValue = function (block) {
  const direction = block.getFieldValue('direction');
  return [
    `GetInfraredDepthSensorValue("${direction}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.whenInfraredDepthSensorValue = function (block) {
  const functionName = Blockly.JavaScript.variableDB_.getDistinctName(
    'WhenInfraredDepthSensorValueFunction',
    Blockly.Variables.NAME_TYPE
  );
  const insideCodes = Blockly.JavaScript.statementToCode(block, 'DO');
  const direction = block.getFieldValue('direction');
  const condition = block.getFieldValue('condition');
  const value = Blockly.JavaScript.valueToCode(
    block,
    'value',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return `${generateComment(block)}WhenInfraredDepthSensorValue("${direction}", "${condition}", GetFloat(${value}), ${functionName});
    private IEnumerator ${functionName}() {
      ${generateComment(block)}
      if (false)
      {
        yield return null;
      }
      if (IsUseDeterministicPhysics()) {
        yield return SkipOneFixedUpdateAndDoNothing();
      }
      ${insideCodes}
    }\n`;
};

Blockly.JavaScript.enableTerrainAwareness = function (block) {
  const enable = block.getFieldValue('enable');
  return `${generateComment(block)}EnableTerrainAwareness(${enable});\n`;
};

Blockly.JavaScript.getTerrainAwarenessValue = function (block) {
  const index = block.getFieldValue('index');
  return [
    `GetTerrainAwarenessValue("${index}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.checkTerrainValue = function (block) {
  const index = block.getFieldValue('index');
  const value = block.getFieldValue('value');
  return [
    `CheckTerrainValue("${index}", "${value}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.getLongitudeOrLatitude = function (block) {
  const type = block.getFieldValue('type');
  return [
    `GetLongitudeOrLatitude("${type}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.getPosition = function (block) {
  const type = block.getFieldValue('type');
  return [`GetPosition("${type}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.checkIfPassCoordinate = function (block) {
  const x = Blockly.JavaScript.valueToCode(
    block,
    'x',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  const y = Blockly.JavaScript.valueToCode(
    block,
    'y',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 0;
  return [
    `CheckIfPassCoordinate(GetFloat(${x}), GetFloat(${y}))`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.getCountTime = function (block) {
  return ['GetCountTime()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.resetCountTime = function (block) {
  return `${generateComment(block)}ResetCountTime();\n`;
};

Blockly.JavaScript.takePhoto = function (block) {
  return `${generateComment(block)}yield return TakePhoto();\n`;
};

Blockly.JavaScript.recordVideo = function (block) {
  const action = block.getFieldValue('action');
  return `${generateComment(block)}RecordVideo("${action}");\n`;
};

Blockly.JavaScript.setSensorOn = function (block) {
  const cameraId = block.getFieldValue('camera');
  const enable = block.getFieldValue('enable');
  const sensorType = block.getFieldValue('sensor_type');

  return `${generateComment(block)}SetCameraSensorOn("${cameraId}", ${enable}, "${sensorType}");\n`;
};

Blockly.JavaScript.getRecognizedTrafficLightCount = function (block) {
  const cameraId = block.getFieldValue('camera');
  return [`GetTrafficLightCountByCamera("${cameraId}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedTrafficLightInfo = function (block) {
  const cameraId = block.getFieldValue('camera');
  const index = Blockly.JavaScript.valueToCode(
    block,
    'light_index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const infoType = block.getFieldValue('info_type');
  const prefix = getPrefix(infoType);

  return [`GetTrafficLightInfo("${cameraId}", GetInt(${index}), "${infoType}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedTrafficLightInfoOfText = function (block) {
  const cameraId = block.getFieldValue('camera');
  const index = Blockly.JavaScript.valueToCode(
    block,
    'light_index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const prefix = getPrefix('lightColor');

  return [`GetTrafficLightInfo("${cameraId}", GetInt(${index}), "lightColor")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedTrafficLightInfoOfNumber = Blockly.JavaScript.getRecognizedTrafficLightInfo;

Blockly.JavaScript.getRecognizedHumanCount = function (block) {
  const cameraId = block.getFieldValue('camera');

  return [`GetHumanCountByCamera("${cameraId}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedHumanName = function (block) {
  const cameraId = block.getFieldValue('camera');
  const index = Blockly.JavaScript.valueToCode(
    block,
    'human_index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );

  return [`GetHumanNameByCamera("${cameraId}", GetInt(${index}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript.getRecognizedHumanInfo = function (block) {
  const cameraId = block.getFieldValue('camera');
  const index = Blockly.JavaScript.valueToCode(
    block,
    'human_index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const infoType = block.getFieldValue('info_type');

  return [`GetHumanInfoByCamera("${cameraId}", GetInt(${index}), "${infoType}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.setRoadRecognizeColor = function (block) {
  const cameraId = block.getFieldValue('camera');
  const color = block.getFieldValue('color');

  return `${generateComment(block)}SetRecognizeRoadColor("${cameraId}", "${color}");\n`;
};

Blockly.JavaScript.getRecognizedRoadLineCount = function (block) {
  const cameraId = block.getFieldValue('camera');

  return [`GetRoadLineCount("${cameraId}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.isRecognizeRoadLineType = function (block) {
  const cameraId = block.getFieldValue('camera');
  const lineType = block.getFieldValue('line_type');

  return [`IsRecognizeRoadLineType("${cameraId}", "${lineType}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedRoadLineInfo = function (block) {
  const cameraId = block.getFieldValue('camera');
  const lineIndex = Blockly.JavaScript.valueToCode(
    block,
    'line_index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const pointIndex = Blockly.JavaScript.valueToCode(
    block,
    'point_index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const infoType = block.getFieldValue('info_type');
  const prefix = getPrefix(infoType);

  return [`${prefix}GetRecognizedRoadLineInfo("${cameraId}", GetInt(${lineIndex}), GetInt(${pointIndex}), "${infoType}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedTrafficSignCount = function (block) {
  const cameraId = block.getFieldValue('camera');

  return [`GetRecognizedTrafficSignCount("${cameraId}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedTrafficSignInfo = function (block) {
  const cameraId = block.getFieldValue('camera');
  const index = Blockly.JavaScript.valueToCode(
    block,
    'sign_index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const infoType = block.getFieldValue('info_type');
  const prefix = getPrefix(infoType);

  return [`GetRecognizedTrafficSignInfoByType("${cameraId}", GetInt(${index}), "${infoType}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedTrafficSignInfoOfText = function (block) {
  const cameraId = block.getFieldValue('camera');
  const index = Blockly.JavaScript.valueToCode(
    block,
    'sign_index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const prefix = getPrefix('tips');

  return [`GetRecognizedTrafficSignInfoByType("${cameraId}", GetInt(${index}), "tips")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedTrafficSignInfoOfNumber = Blockly.JavaScript.getRecognizedTrafficSignInfo;

Blockly.JavaScript.setRadarOn = function (block) {
  const enable = block.getFieldValue('enable');

  return `${generateComment(block)}Set360RadarOn(${enable});\n`;
};

Blockly.JavaScript.getRadarSensorCount = function (block) {
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );

  return [`Get360RadarSensorCount(GetFloat(${angle}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRadarSensorInfoInAngle = function (block) {
  const angle = Blockly.JavaScript.valueToCode(
    block,
    'angle',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const index = Blockly.JavaScript.valueToCode(
    block,
    'index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const infoType = block.getFieldValue('info_type');

  const prefix = getPrefix(infoType);

  return [`GetRadarSensorInfoInAngle(GetFloat(${angle}), GetInt(${index}), "${infoType}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.radarAngleParam = function (block) {
  const num = block.getFieldValue('NUM');
  return [`float.Parse((${num}).ToString())`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.getRecognizedItemCount = function (block) {
  const cameraId = block.getFieldValue('camera');

  return [`GetRecognizedItemCount("${cameraId}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedItemName = function (block) {
  const cameraId = block.getFieldValue('camera');
  const index = Blockly.JavaScript.valueToCode(
    block,
    'index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  return [`GetRecognizedItemName("${cameraId}", GetInt(${index}))`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getRecognizedItemInfo = function (block) {
  const cameraId = block.getFieldValue('camera');
  const index = Blockly.JavaScript.valueToCode(
    block,
    'index',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  );
  const infoType = block.getFieldValue('info_type');
  return [`GetRecognizedItemInfo("${cameraId}", GetInt(${index}), "${infoType}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getGyroscopeValue = function (block) {
  const id = block.getFieldValue('id');
  const type = block.getFieldValue('type');
  return [`GetGyroscopeValue("${id}", "${type}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getTemperatureValue = function (block) {
  const id = block.getFieldValue('id');
  return [`GetTemperatureValue("${id}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getLightValue = function (block) {
  const id = block.getFieldValue('id');
  return [`GetLightValue("${id}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getHumidityValue = function (block) {
  const id = block.getFieldValue('id');
  return [`GetHumidityValue("${id}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getGPSValue = function (block) {
  const id = block.getFieldValue('id');
  const type = block.getFieldValue('type');
  return [`GetGPSValue("${id}", "${type}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getInfraredValue = function (block) {
  const id = block.getFieldValue('id');
  return [`GetInfraredValue("${id}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getCO2Value = function (block) {
  const id = block.getFieldValue('id');
  return [`GetCO2Value("${id}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getSO2Value = function (block) {
  const id = block.getFieldValue('id');
  return [`GetSO2Value("${id}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getNoiseValue = function (block) {
  const id = block.getFieldValue('id');
  return [`GetNoiseValue("${id}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript.getTemperatureOneValue = function (block) {
  return [`GetTemperatureValue()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getLightOneValue = function (block) {
  return [`GetLightValue()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getHumindityOneValue = function (block) {
  return [`GetHumindityValue()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getCo2OneValue = function (block) {
  return [`GetCo2Value()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getSo2OneValue = function (block) {
  return [`GetSo2Value()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.getNoiseOneValue = function (block) {
  return [`GetNoiseValue()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
