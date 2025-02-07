import { jsCallNative } from './../tge';
import TM from './tm';
import eventEmitter from '../utils/event_emitter';
import { getCanvasFromBase64 } from '../utils/dom';

const tf = window.tf;
const tmPose = window.tmPose;

const loadedModels: { [key: string]: any } = {};

eventEmitter.on('TMClearLoadedModels', () => {
  console.log('[TM image] TMClearLoadedModels before', loadedModels);
  Object.keys(loadedModels).forEach((key) => {
    delete loadedModels[key];
  });
  console.log('[TM image] TMClearLoadedModels after', loadedModels);
});

export default async function TMPredictPose(data: { data: PredictInputParam }, cbKey: string) {
  console.log('[TM pose] TMPredictPose', data, cbKey);
  const { model, imageType, modelFile, image } = data.data;
  console.log('[TM pose] model content:', model);
  jsCallNative('TMDateTransferEnd', []);
  var perf = {} as Perf;

  perf.dataTransferEndTime = performance.now();
  perf.unzipBeginTime = performance.now();

  let tmModel = loadedModels[model.id];
  if (modelFile == "") {
    console.log(`[TM pose] model previously loaded: ${model.id}`);
  } else {
    console.log(`[TM pose] need to load new model: ${model.id}`);

    const modelData = await TM.parseModelDataFromBase64(modelFile);

    perf.unzipEndTime = performance.now();
    perf.modelLoadBeginTime = performance.now();


    // convert to tf.io.ModelArtifacts
    const modelArtifacts/*: tf.io.ModelArtifacts*/ = TM.getModelArtifacts(modelData);
    const modelMetadata = TM.getModelMetadata(modelData);
    console.log('[TM pose] modelArtifacts:', modelArtifacts);
    console.log('[TM pose] modelMetadata:', modelMetadata);


    tmModel = await tmPose.load(tf.io.fromMemory(modelArtifacts), modelMetadata);
    loadedModels[model.id] = tmModel;
  }
  console.log('[TM pose] tmModel:', tmModel);
  perf.modelLoadEndTime = performance.now();

  const canvas = await getCanvasFromBase64(`data:image/png;base64,${image}`, 257, 257);

  perf.predictBeginTime = performance.now();
  const { pose, posenetOutput } = await tmModel.estimatePose(canvas);
  console.log('[TM pose] pose:', pose);
  console.log('[TM pose] posenetOutput:', posenetOutput);
  const prediction = await tmModel.predict(posenetOutput);
  perf.predictEndTime = performance.now();

  console.log('[TM pose] prediction result', prediction);

  const result = {
    modelID: model.id,
    imageType,
    result: JSON.stringify({ prediction, perf, backend: tf.getBackend() }),
  };
  jsCallNative(cbKey, result);
}


// async getImage
