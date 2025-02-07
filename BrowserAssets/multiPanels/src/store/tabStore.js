import { defaultTabEngNames } from '@/config/tabConfig';
import { jsCallNative, JS_UNITY_CMD } from '@/utils/NativeCall';
import { observable, action } from 'mobx';

class TabStore {
  @observable selectedTabIndex = 1; // 选中的Tab索引

  @action.bound
  setSelectedTabIndex(tabIndex) {
    this.selectedTabIndex = tabIndex;

    jsCallNative(JS_UNITY_CMD.SwitchTab, { tab: defaultTabEngNames[this.selectedTabIndex] });
  }
}

export default new TabStore();
