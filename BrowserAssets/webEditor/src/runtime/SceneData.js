import EventUtil from '../utils/EventUtil';
import { SCENE_CMD } from './constant';

class SceneData {
  constructor() {
    this.uuid2Model = {};
  }

  getAllModel = () => {
    const models = Object.values(this.uuid2Model);
    return models;
  };

  getModel = uuid => this.uuid2Model[uuid];

  addModel = (uuid, modeldata) => {
    if (this.uuid2Model[uuid]) return;
    this.uuid2Model[uuid] = modeldata;
    EventUtil.emit(SCENE_CMD.MODEL_NEW, [uuid]);
  };

  deleteModel = (uuid) => {
    if (!this.uuid2Model[uuid]) return;
    delete this.uuid2Model[uuid];
    EventUtil.emit(SCENE_CMD.MODEL_DEL, [uuid]);
  };

  recvAllModel = (modeldatas) => {
    if (!modeldatas) return;
    // 先清空之前的模型信息
    const deleteUuids = Object.keys(this.uuid2Model);
    EventUtil.emit(SCENE_CMD.MODEL_DEL, [deleteUuids]);
    // 替换最新的模型信息
    this.uuid2Model = {};
    const addUuids = [];
    modeldatas.forEach((data) => {
      const { uuid } = data;
      if (!this.uuid2Model[uuid]) {
        this.uuid2Model[uuid] = data;
        addUuids.push(uuid);
      }
    });
    EventUtil.emit(SCENE_CMD.MODEL_NEW, [addUuids]);
  };
}

export default new SceneData();
