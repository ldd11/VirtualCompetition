import imageShoot from './ImageShoot.xml';
import keyboardEvents from './KeyboardEvents.xml';
import speechRecognition from './SpeechRecognition.xml';
import faceRecognition from './FaceRecognition.xml';
import wechatRecognition from './WechatRecognition.xml';
import speechSynthesis from './SpeechSynthesis.xml';
import textRecognition from './TextRecognition.xml';
import machineLearning from './MachineLearning.xml';
import smartChat from './SmartChat.xml';
import translate from './Translate.xml';

const extensions = [{
  name: '扩展',
  id: 'extensions',
  categories: [
    {
      id: 'imageShoot',
      name: '图像拍摄',
      description: '可通过 虚拟摄像头、USB摄像头拍摄照片，用于图像Ai识别。',
      xml: imageShoot
    },
    {
      id: 'keyboardEvents',
      name: '键盘事件',
      description: '可监听键盘事件，用于机器人控制、事件触发等。',
      xml: keyboardEvents
    },
    {
      id: 'speechRecognition',
      name: '语音识别',
      description: '可获取USB 麦克风，用于语音识别，支持普通话、英语、粤语。',
      xml: speechRecognition
    },
    {
      id: 'faceRecognition',
      name: '人脸识别',
      description: '可通过照片识别人脸的性别、年龄、情绪、眼镜等信息。',
      xml: faceRecognition
    },
    {
      id: 'wechatRecognition',
      name: '微信识物',
      description: '与微信扫一扫同源，可对图片中的物品信息进行分类识别。',
      xml: wechatRecognition
    },
    {
      id: 'speechSynthesis',
      name: '语音合成',
      description: '可对指定文本进行语音合成， 支持12种音色。',
      xml: speechSynthesis
    },
    {
      id: 'textRecognition',
      name: '文字识别',
      description: '可通过照片对印刷字体、手写字体进行 文字识别。',
      xml: textRecognition
    },
    {
      id: 'machineLearning',
      name: '机器学习',
      description: '可根据需求训练 图像、音频、姿态三种模型，满足定制化Ai需求。',
      xml: machineLearning
    },
    {
      id: 'smartChat',
      name: '智能聊天',
      description: '支持对4种不同虚拟机器人进行对话。',
      xml: smartChat
    },
    {
      id: 'translate',
      name: '翻译',
      description: '支持 英文、中文、韩文、日文  四种文本翻译。',
      xml: translate
    }
  ]
}];

export default extensions;
