interface Model {
  id: string;
  name: string;
  type: string;
}

interface PredictInputParam {
  model: Model;
  imageType: string;
  modelURL: string;
  metadataURL: string;
  image: string; // base64
  modelFile: string;
}

interface PredictInput {
  model: string;
  modelID: string;
  imageType: string;
  modelURL: string;
  metadataURL: string;
  image: string; // base64
  modelFile: string;
}

interface Perf {
  dataTransferBeginTime: number;
  dataTransferEndTime: number;
  unzipBeginTime: number;
  unzipEndTime: number;
  modelLoadBeginTime: number;
  modelLoadEndTime: number;
  predictBeginTime: number;
  predictEndTime: number;

}

interface PredictImageInput {
  modelID: string;
  imageType: string;
  modelURL: string;
  metadataURL: string;
  image: string; // base64
  model: string;
}