import eventEmitter from './utils/event_emitter';
import { jsCallNative } from './tge';
import TMPredictImage from './tm/image';
import TMPredictPose from './tm/pose';
import TMPredictAudio from './tm/audio';


eventEmitter.on('TMPredictImage', TMPredictImage);
eventEmitter.on('TMPredictPose', TMPredictPose);
eventEmitter.on('TMPredictAudio', TMPredictAudio);


console.log(jsCallNative);
jsCallNative('NotifyPageEvent', [{ name: 'PageJSLoaded' }]);