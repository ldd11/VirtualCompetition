import { GROUP } from '@/config/TypeConfig';
import { observable, action } from 'mobx';
import React from 'react';

class TreeDataStore {
    treeRef = React.createRef();

    @observable treeNodes = [];

    nameDict = {};

    @action.bound
    setTreeNodes(treeNodes = []) {
      this.treeNodes = treeNodes;

      // 数据更新的时候准备好名称的字典
      // this.setNameDict();
    }

    setNameDict() {
      this.treeNodes.forEach((item) => {
        const { type } = item;
        if (type === GROUP) {
          if (!this.nameDict[type]) {
            this.nameDict[type] = [];
          }
          this.nameDict[type].push(item.label);
        } else {
          const { unitType } = item;
          if (!this.nameDict[unitType]) {
            this.nameDict[unitType] = [];
          }
          this.nameDict[unitType].push(item.label);
        }
      });
    }

    @action.bound
    updateNameByType(type, newName, oldName) {
      if (this.nameDict[type]) {
        const pos = this.nameDict[type].indexOf(oldName);
        if (pos !== -1) {
          this.nameDict[type][pos] = newName;
        }
      }
    }
}

export default new TreeDataStore();
