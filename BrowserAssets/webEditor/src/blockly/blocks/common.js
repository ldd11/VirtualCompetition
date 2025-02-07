import { toJS } from 'mobx';
import SceneData from '../../runtime/SceneData';
import { dataSetStore } from '@/store/index';
import EventUtil from '@/utils/EventUtil';
import { EDITOR_CALL } from '@/runtime/constant/index';

export const defaultOptions = [['?', '?']];

export const getAllModel = function () {
  let models = [];
  const modelDatas = SceneData.getAllModel();
  modelDatas.forEach((data) => {
    const { uuid, name } = data;
    models.push([name, uuid]);
  });
  if (models.length === 0) {
    models = [['?', '?']];
  }
  return models;
};

export const resetColor = function (block, colorHex) {
  const oldInit = block.init;

  block.init = function () {
    oldInit.call(this);
    this.setColour(colorHex);
  };
};

export const getListDatasetOptions = function () {
  const dataList = toJS(dataSetStore.dataSetList);
  let options = [];
  const optionsIdArr = [];
  if (dataList instanceof Array) {
    options = dataList.map((data) => {
      optionsIdArr.push(data.dataId);
      return [data.dataName, data.dataId];
    });
    options = [...options];
  }
  const mutationData = toJS(dataSetStore.mutationSaved);
  if (mutationData.length >= 1) {
    const mutationDataArr = [];
    mutationData.forEach((item) => {
      if (optionsIdArr.indexOf(item.dataId) === -1) {
        const temp = [item.dataName, item.dataId];
        mutationDataArr.push(temp);
      }
    });
    options = [...options, ...mutationDataArr];

    // console.log('setDataListFromMutation mutationData inner', options, mutationData);
  }
  
  // options = dataArr.map(name => [name, name]);
  options = [...options];
  if (options.length < 1) {
    options = [['?', '?']];
  }
  // console.log('getListDatasetOptions', options, mutationData);
  return options;
};

export const updateDataSetDropdown = function (oldList) {
  const blockNameList = ['list_dataset_num', 'list_dataset_getdata', 'list_dataset_getonedata'];
  const inputName = 'dateSetData';
  const list = toJS(dataSetStore.getDatasetDropdown());
  EventUtil.emit(EDITOR_CALL.UPDATE_DROPDOWN_VALUE, {
    blockNameList,
    inputName,
    list,
    oldList
  });
}
