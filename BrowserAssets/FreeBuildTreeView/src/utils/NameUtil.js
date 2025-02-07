import { GROUP } from '@/config/TypeConfig';
import { TreeDataStore } from '@/store/index';

const ERROR_NAME_EMPTY = '名字不能为空';
const NAME_PATTERN = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
const NAME_PATTERN1 = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
const NAME_PATTERN3 = /\\/;
const NAME_PATTERN2 = /^[^0-9]/;
const ERROR_NAME_NUMBER = '首字符不可为数字';
const ERROR_NAME_STRING = '首字符不能为下划线';
const ERROR_NAME_TYPE = '名字仅支持由字母、数字、汉字和下划线组成';
const ERROR_NAME_DUP = '不可重名';
const ERROR_NAME_ESCAPE_CHARACTER = '名字中不支持"\\"字符';


export function nameValidate(str) {
  if (str === '') {
    return ERROR_NAME_EMPTY;
  }

  if (NAME_PATTERN3.test(str)) {
    return ERROR_NAME_ESCAPE_CHARACTER;
  }

  return '';
}

export function UpdateNameDict(data, oldName, newName) {
  const { nameDict } = TreeDataStore;
  if (data.type === GROUP) {
    const pos = nameDict[GROUP]?.indexOf(oldName);
    if (pos !== -1) {
      nameDict[GROUP].splice(pos, 1, newName);
    }
  }
}

export function isEqualArray(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }
  return true;
}

export function generateIconName(panelType) {
  let name = 't-icon-';
  switch (panelType) {
    case 'Base':
      name += 'base';
      break;
    case 'Power':
      name += 'power';
      break;
    case 'Actuator':
      name += 'monitor';
      break;
    case 'Sensor':
      name += 'axis';
      break;
    default:
      break;
  }
  return name;
}
