import { JS_UNITY_CMD, jsCallNative } from '@/utils/NativeCall';
import { observable, action } from 'mobx';

class DataSetStore {

  @observable dataSetList = [];

  @observable mutationSaved = [];

  @observable deleteDataArr = [];

  @action
  addDatasetList({
    dataName, dataId, dataSet, dataType, uploadUrl, forceNotifyUnity
  }) {
    console.log(`[DataSetStore] addDatasetList => dataId: ${dataId}, dataName: ${dataName}, dataSet: ${dataSet}`);
    if (!dataId || !dataSet) {
      return false;
    }
    const dataIdArr = this.dataSetList.map(item => item.dataId);
    if (dataIdArr.indexOf(dataId) !== -1) {
      console.log('[DataSetStore] addDatasetList error: duplicate dataId')
      return false;
    }
    this.dataSetList.push({
      dataName, dataId, dataSet, dataType, uploadUrl
    });
    // unity客户端进行数据更新（传递全量数据）
    if (forceNotifyUnity) {
      jsCallNative(JS_UNITY_CMD.NotifyAddDataSet, {
        dataName, dataId, dataSet, dataType, uploadUrl
      });
    }
    return true;
  }

  @action
  deleteDatasetList(dataId) {
    let currentIndex;
    let mutaionIndex;
    this.dataSetList.filter((item, index) => {
      if (item.dataId === dataId) {
        currentIndex = index;
      }
    });
    this.dataSetList.splice(currentIndex, 1);
    this.mutationSaved.filter((item, index) => {
      if (item.dataId === dataId) {
        mutaionIndex = index;
      }
    });
    this.mutationSaved.splice(mutaionIndex, 1);
    this.deleteDataArr.push(dataId);
    // unity客户端同步数据删除
    jsCallNative(JS_UNITY_CMD.NotifyDelDataSet, {dataId});
    console.log('[DataSetStore] deleteDatasetList', this.dataSetList, currentIndex,this.mutationSaved);
  }

  @action
  // 这个方法用于导入作品的时候，根据数据重新导入
  refreshDatasetList(dataArr) {
    if (!dataArr || dataArr.length === 0) {
      return;
    }
    console.log('[DataSetStore] refreshDatasetList', dataArr);

    const dataIdArr = dataArr.map(item => item.dataId);

    this.mutationSaved = this.mutationSaved.map((item) => {
      if (dataIdArr.indexOf(item.dataId) !== -1) {
        return item;
      }
    });
    dataArr.map((item) => {
      if (item.dataType === 'default') {
        return;
      }
      this.addDatasetList({
        dataName: item.dataName,
        dataId: item.dataId,
        dataSet: item.dataSet,
        dataType: item.dataType,
        uploadUrl: item.uploadUrl,
        forceNotifyUnity: true
      });
    });
  }

  @action
  setDataListFromMutation(arr) {
    const dataList = arr.split(',,,,,');
    const obj = {};
    obj.dataName = dataList[0];
    obj.dataId = dataList[1];
    const mutationDataIdArr = this.mutationSaved.map(item => item.dataId);
    if (mutationDataIdArr.indexOf(dataList[1]) === -1
      && this.deleteDataArr.indexOf(dataList[1]) === -1) {
      this.mutationSaved.push(obj);
    }
    console.log('[DataSetStore] setDataListFromMutation innner', dataList, this.mutationSaved);
  }

  @action
  // 导入新作品之前都需要调用
  initDataListStoreTemporaryData() {
    this.dataSetList = [];
    this.mutationSaved = [];
    this.deleteDataArr = [];
  }

  @action
  getDateset(dataId) {
    const currentData = this.dataSetList.filter((item) => {
      if (item.dataId === dataId) {
        return true;
      }
    });
    return currentData[0];
  }

  @action
  getDatasetList() {
    return this.dataSetList;
  }

  @action
  getDatasetDropdown() {
    return this.dataSetList.map(({ dataName, dataId }) => [dataName, dataId]);
  }

  @action
  getDatasetDropdown() {
    return this.dataSetList.map(({ dataName, dataId }) => [dataName, dataId]);
  }

  @action
  getNameArr() {
    return this.dataSetList.map(({ dataName }) => dataName);
  }
}

const dataSetStore = new DataSetStore();
export default dataSetStore;
