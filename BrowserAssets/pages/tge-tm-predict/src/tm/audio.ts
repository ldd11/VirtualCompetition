import { jsCallNative } from './../tge';
import JSZip from 'jszip';
import TM from './tm';
import eventEmitter from '../utils/event_emitter';

const tf = window.tf;
const speechCommands = window.speechCommands;

const loadedModels: { [key: string]: any } = {};

eventEmitter.on('TMClearLoadedModels', () => {
  console.log('[TM image] TMClearLoadedModels before', loadedModels);
  Object.keys(loadedModels).forEach((key) => {
    delete loadedModels[key];
  });
  console.log('[TM image] TMClearLoadedModels after', loadedModels);
});

export default async function TMPredictAudio(data: { data: PredictInputParam }, cbKey: string) {
  console.log('[TM audio] TMPredictAudio:', data, cbKey);
  const { model, modelFile } = data.data;

  console.log('[TM audio] model content:', model);
  jsCallNative('TMDateTransferEnd', []);
  var perf = {} as Perf;

  perf.dataTransferEndTime = performance.now();
  perf.unzipBeginTime = performance.now();

  let tmModel = loadedModels[model.id];
  if (modelFile == "") {
    console.log(`[TM audio] model previously loaded: ${model.id}`);
  } else {
    console.log(`[TM audio] need to load new model: ${model.id}`);
    const modelData = await TM.parseModelDataFromBase64(modelFile);

    perf.unzipEndTime = performance.now();
    perf.modelLoadBeginTime = performance.now();

    // convert to tf.io.ModelArtifacts
    const modelArtifacts/*: tf.io.ModelArtifacts*/ = TM.getModelArtifacts(modelData);
    const metadata = TM.getModelMetadata(modelData);
    console.log('[TM audio] modelArtifacts:', modelArtifacts);
    console.log('[TM audio] metadata:', metadata);

    tmModel = speechCommands.create(
      'BROWSER_FFT', // fourier transform type, not useful to change
      undefined, // speech commands vocabulary feature, not useful for your models
      modelArtifacts,
      metadata);
    await tmModel.ensureModelLoaded();

    loadedModels[model.id] = tmModel;
  }

  console.log('[TM audio] tmModel:', tmModel);

  perf.modelLoadEndTime = performance.now();

  var prediction: any = null;
  var cnt = 0;
  perf.predictBeginTime = performance.now();
  tmModel.listen((result: any) => {
    console.log('[TM audio] result:', result)
    const scores = result.scores; // probability of prediction for each class
    if (prediction == null) {
      prediction = Array(scores.length).fill(0)
    }

    for (let i = 0; i < scores.length; i++) {
      if (Number.isNaN(scores[i])) {
        cnt -= 1;
        break;
      }
      prediction[i] += scores[i];
    }


    cnt++;

    result.device = tmModel.audioDataExtractor.stream.getAudioTracks()[0].label;

    jsCallNative('SyncAudioSpectrogram', result);
  }, {
    includeSpectrogram: true, // in case listen should return result.spectrogram
    probabilityThreshold: 0.75,
    invokeCallbackOnNoiseAndUnknown: true,
    overlapFactor: 0.75 // probably want between 0.5 and 0.75. More info in README
  });

  // Stop the recognition in 5 seconds.
  setTimeout(() => {
    tmModel.stopListening();
    perf.predictEndTime = performance.now();

    console.log('[TM audio] prediction result', prediction, cnt);

    for (let i = 0; i < prediction.length; i++) {
      prediction[i] = {
        index: i,
        className: tmModel.words[i],
        probability: prediction[i] / cnt
      }
    }

    console.log('[TM audio] prediction result', prediction);

    const result = {
      modelID: model.id,
      result: JSON.stringify({ prediction, perf, backend: tf.getBackend() }),
    };

    jsCallNative(cbKey, result);
  }, 3000);
}