import { observable, action } from 'mobx';

/**
 * 用于保存项目的属性
 *
 * @class ProjectStore
 */
class ProjectStore {

  @observable isRunning = false; // 是否运行

  @observable permissionDict = {};

  @action.bound
  changeRunningState(runState) {
    this.isRunning = runState;
  }

  @action
  clearPermission() {
    this.permissionDict = {};
  }

  @action
  setPermission(feature, hasPermission) {
    console.log(`[ProjectStore] set permission ${feature} ${hasPermission}`);
    this.permissionDict[feature] = hasPermission;
  }
}

export default new ProjectStore();
