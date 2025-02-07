import { Dialog, Toast } from '@tencent/eui';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import jschardet from 'jschardet';
import papa from 'papaparse';
import React, { Component } from 'react';
import { dataSetStore } from '@/store/index';
import { updateDataSetDropdown } from '@/blockly/blocks/common';
import './index.less';

const prefixCls = 'blocklyUpload';

@observer
class UploadDataFiles extends Component {
  constructor(props) {
    super(props);
    this.chooseFile = React.createRef();
    this.state = {
      deleteName: '',
      deleteId: null,
      showDeleteConfirm: false
    };
  }

  // 检查编排
  checkEncoding = (base64Str) => {
    if (!base64Str) return null;
    // 空文件上传，chrome得到"data:text/csv;base64"正常解析，zfb中得到"data:"导致异常
    const a = base64Str.split(';base64,')[1];
    if (!a) return null;
    const str = atob(a); // atob方法 Window 对象 定义和用法 atob() 方法用于解码使用 base-64 编码的字符
    // 要用二进制格式
    let encoding = jschardet.detect(str);
    encoding = encoding.encoding;
    // 有时候会识别错误
    if (encoding === 'windows-1252') {
      encoding = 'ANSI';
    }
    return encoding;
  }

  getCsvLocal = file => new Promise((resolve, reject) => {
    const fReader = new FileReader();
    const _this = this;
    let type = file.name && file.name.split('.');
    type = type[type.length - 1];
    if (type.toLowerCase() != 'csv') {
      reject(1);
      return;
    }

    fReader.readAsDataURL(file); //  readAsDataURL 读取本地文件 得到的是一个base64值
    fReader.onload = function (evt) { // 读取文件成功
      const data = evt.target.result;

      const encoding = _this.checkEncoding(data);
      console.log('[UploadDataFiles] getCsvLocal =>', encoding, evt, file, data);

      // papaparse.js 用来解析转换成二维数组
      papa.parse(file, {
        header: false,
        encoding,
        complete(results) { // UTF8 \r\n与\n混用时有可能会出问题
          if (results.data == null || results.data.length < 1) {
            reject(1);
            return;
          }

          let res = results.data.slice();
          // 去掉最后一行，最后一行可能是错的
          if (res[res.length - 1].length !== res[0].length) {
            if (res[res.length - 1] && res[res.length - 1].length > 0) {
              if (res[res.length - 1].length === 1 && res[res.length - 1][0] === '') {
                res = res.slice(0, -1);
              }
            }
          }

          // 按照产品现阶段的需求，内容检查暂时都不考虑，只检查文档是否空的
          // if (!encoding || (encoding.toLowerCase().indexOf('ansi') === -1
          //   && encoding.toLowerCase().indexOf('ascii') === -1
          //   && encoding.toLowerCase().indexOf('GB2312') === -1)) {
          //   const lenArr = [];
          //   const tempRes = res.slice(0, 5);
          //   tempRes.map((item) => {
          //     if (lenArr.indexOf(item.length) === -1) {
          //       lenArr.push(item.length);
          //     }
          //   });

          //   const judgeStringType = (str) => {
          //     const wordReg = new RegExp('[\u4E00-\u9FA5]+');
          //     const strReg = new RegExp('[A-Za-z]+');
          //     const numReg = new RegExp('[0-9]+');
          //     if (wordReg.test(str) || strReg.test(str) || numReg.test(str)) {
          //       return true;
          //     }
          //     return false;
          //   };

            
          //   if (lenArr.length > 2 || !judgeStringType(tempRes[1] && tempRes[1][0])) {
          //     reject(1);
          //     return;
          //   }
          // }
          // console.log('[UploadDataFiles] load csv success =>', res);
          resolve(res);
        },
        error: (err) => {
          if (err && !file) { // file 不存在时，认为是网络问题没加载到
            reject(1);
          }
        }
      });
    };
  })

  saveToDatabase = (data) => {
    let dataId;
    dataId = Blockly.utils.genUid();
    const success = dataSetStore.addDatasetList({
      dataName: data.dataName,
      dataId,
      dataSet: data.dataSet,
      dataType: 'upload',
      uploadUrl: '',
      forceNotifyUnity: true
    });
    if (success) {
      Toast.success('文件上传成功');
    } else {
      Toast.warning('文件上传失败');
    }
    this.setState({
      visible: false,
      showSpecification: false
    });
    this.refreshSelectionHeight();
  }

  handleClick = () => {
    // 上传文件数量限制
    const fileNumLimit = 10;
    const list = dataSetStore.getDatasetList();
    if (list && list.length >= fileNumLimit) {
      Toast.warning(`最多支持上传 ${fileNumLimit} 个本地数据文件`);
      return;
    }
    this.chooseFile.current.click();
  }

  async handleFilePick(files) {
    const fileSizeLimit = 500; // kb
    const [file] = files;
    console.log('handleFilePick', file);
    // 数据的大小限制
    if (file.size > fileSizeLimit * 1024) {
      Toast.warning(`仅支持上传小于 ${fileSizeLimit}k 的数据文件`);
      return;
    }

    try {
      const fileData = await this.getCsvLocal(file);
      console.log('getCsvLocalhandleFilePick', fileData);
      if (!fileData || fileData.length < 1) {
        Toast.warning('文件内容错误，上传失败');
        return;
      }

      const nameWithoutExtension = this.getUniqueName(file.name.replace(/\.[^/.]+$/, ''));
      this.saveToDatabase({ dataType: 'upload', dataName: nameWithoutExtension, dataSet: fileData });
    } catch (error) {
      Toast.warning('文件内容错误，上传失败');
    }
  }

  getUniqueName = (name) => {
    if (!name) {
      name = '未命名文件';
    }
    const fileList = toJS(dataSetStore.getDatasetList());
    const existingFile = fileList.find(item => item.dataName === name);
    if (existingFile) {
      const maxSuffix = Math.max(
        0,
        ...fileList
          .filter(f => f.dataName.startsWith(`${name}_`))
          .map(f => parseInt(f.dataName.split('_')[1]))
      );

      const newFileName = `${name}_${maxSuffix + 1}`;
      return newFileName;
    }
    return name;
  }

  refreshSelectionHeight = (currentHeight) => {
    const { getListHeight } = this.props;
    const len = dataSetStore.dataSetList.length;
    const listHeight = 45 + 40 * len;
    if (!currentHeight) {
      getListHeight(len);
      return;
    }
    if (listHeight !== parseInt(currentHeight, 10)) {
      getListHeight(len);
    }
  }

  deleteDatesetBefore = (dataName, dataId) => {
    this.setState({
      deleteName: dataName,
      deleteId: dataId,
      showDeleteConfirm: true
    });
  }

  deleteDatesetCancel = () => {
    this.setState({
      showDeleteConfirm: false
    });
  }

  deleteDatesetOk = () => {
    const { deleteId } = this.state;
    this.deleteDateset(deleteId);
    this.setState({
      showDeleteConfirm: false
    });
  }

  deleteDateset = (dataId) => {
    const oldList = toJS(dataSetStore.getDatasetDropdown());
    dataSetStore.deleteDatasetList(dataId);
    this.refreshSelectionHeight();

    // 更新下拉情况
    updateDataSetDropdown(oldList);
  }

  truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return `${str.substring(0, maxLength - 3)}...`;
    }
    return str;
  }

  render() {
    const { deleteName, showDeleteConfirm } = this.state;
    const fileList = toJS(dataSetStore.dataSetList) || [];
    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-placeholder`} onClick={this.handleClick}>
          上传本地数据文件
          <span className={`${prefixCls}-placeholder-icon`} />
          <input
            type="file"
            ref={this.chooseFile}
            style={{ display: 'none' }}
            accept=".csv"
            onChange={(e) => {
              this.handleFilePick(e.target.files);
              e.target.value = '';
            }}
          />
        </div>
        <div className={`${prefixCls}-list`}>
          {fileList.map((item, index) => (
            <div className={`${prefixCls}-excel-item`} key={item.dataId}>
              <p className={`${prefixCls}-excel-item-title`}>{`${item.dataName}.csv`}</p>
              <div className={`${prefixCls}-excel-item-ctrls`}>
                <div className={`${prefixCls}-excel-item-ctrls-btn del`} onClick={() => this.deleteDatesetBefore(item.dataName, item.dataId)}>
                  <i className="vhblocklyicon vhblocklyicon-delete" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Dialog
          visible={showDeleteConfirm}
          handleCancel={this.deleteDatesetCancel}
          handleOk={this.deleteDatesetOk}
          handleClose={this.deleteDatesetCancel}
          title="删除数据"
        >
          <p>要删除“{this.truncateString(deleteName, 20)}”吗？</p>
          <p className={`${prefixCls}-tips`}>删除上传至虚拟仿真实验室的数据不会影响保存在本地的数据</p>
        </Dialog>
      </div>
    );
  }
}

export default UploadDataFiles;
