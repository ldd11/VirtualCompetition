import { jsCallNative } from './../tge';
import JSZip from 'jszip';
import TM from './tm';
import eventEmitter from '../utils/event_emitter';
import { getCanvasFromBase64 } from '../utils/dom';

const tf = window.tf;
const tmImage = window.tmImage;

const loadedModels: { [key: string]: any } = {};

eventEmitter.on('TMClearLoadedModels', () => {
  console.log('[TM image] TMClearLoadedModels before', loadedModels);
  Object.keys(loadedModels).forEach((key) => {
    delete loadedModels[key];
  });
  console.log('[TM image] TMClearLoadedModels after', loadedModels);
});

export default async function TMPredictImage(data: { data: PredictInputParam }, cbKey: string) {
  console.log('TM] TMPredictImage', data, cbKey);
  const { model, imageType, modelFile, image } = data.data;
  console.log('[TM image] model content:', model);
  jsCallNative('TMDateTransferEnd', []);
  var perf = {} as Perf;

  perf.dataTransferEndTime = performance.now();
  perf.unzipBeginTime = performance.now();


  let tmModel = loadedModels[model.id];
  if (modelFile == "") {
    console.log(`[TM image] model previously loaded: ${model.id}`);
  } else {
    console.log(`[TM image] need to load new model: ${model.id}`);

    const modelData = await TM.parseModelDataFromBase64(modelFile);

    perf.unzipEndTime = performance.now();
    perf.modelLoadBeginTime = performance.now();

    // convert to tf.io.ModelArtifacts
    const modelArtifacts/*: tf.io.ModelArtifacts*/ = TM.getModelArtifacts(modelData);
    const modelMetadata = TM.getModelMetadata(modelData);
    console.log('[TM image] modelArtifacts:', modelArtifacts);
    console.log('[TM image] modelMetadata:', modelMetadata);

    // @ts-ignore
    tmModel = await tmImage.load(tf.io.fromMemory(modelArtifacts), modelMetadata);

    loadedModels[model.id] = tmModel;
  }
  console.log('[TM image] tmModel:', tmModel);
  perf.modelLoadEndTime = performance.now();

  const canvas = await getCanvasFromBase64(`data:image/png;base64,${image}`, 224, 224);

  perf.predictBeginTime = performance.now();
  const prediction = await tmModel.predict(canvas);
  perf.predictEndTime = performance.now();

  console.log('[TM image] prediction result:', prediction);

  const result = {
    modelID: model.id,
    imageType,
    result: JSON.stringify({ prediction, perf, backend: tf.getBackend() }),
  }
  jsCallNative(cbKey, result);
}