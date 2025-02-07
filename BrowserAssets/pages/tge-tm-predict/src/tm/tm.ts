import JSZip from "jszip"

class ModelData {
    metadataJSON: string | undefined;
    weights: ArrayBuffer | undefined;
    modelJSON: string | undefined;
}

export default class TM {
    public static parseModelDataFromBase64 = async (modelFile: string): Promise<ModelData> => {
        const zip = new JSZip();
        const modelZip = await zip.loadAsync(modelFile, { base64: true });

        const metadataJSON = await modelZip.file('metadata.json')?.async('string');
        const weights = await modelZip.file('model.weights.bin')?.async('arraybuffer');
        const modelJSON = await modelZip.file('model.json')?.async('string');

        return {
            metadataJSON,
            weights,
            modelJSON
        };

    }

    public static getModelArtifacts = (modelData: ModelData): Object => {
        const model = JSON.parse(modelData.modelJSON || '{}');
        const weights = modelData.weights;

        return {
            modelTopology: model.modelTopology,
            weightSpecs: model.weightsManifest[0].weights,
            weightData: weights,
            generatedBy: 'TensorFlow.js tfjs-layers v1.3.1',
            convertedBy: 'Teachable Machine',
            userDefinedMetadata: {},
            format: 'layers-model',
        }
    }

    public static getModelMetadata = (modelData: ModelData): Object => {
        return JSON.parse(modelData.metadataJSON || '{}');
    }

}