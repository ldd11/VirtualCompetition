import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Iframe from 'react-iframe';
import EventUtil from '@/utils/EventUtil';
import { EventMsg } from '@/utils/EventMsg';
import { IFrameMessenger } from '@/utils/IFrameMessenger';
import { JS_UNITY_CMD, jsCallNative } from '@/utils/NativeCall';
import { PicViewer, RenderInTop } from '@tencent/eui/';

const EXAM_PANEL_IFRAME_ID = 'exam_panel_iframe_id';

const EXAM_PANEL_IFRAME_PROTOCOL_CMD = {
  CLIENT_IMPORT_TASK: 'client_import_task', // 导入作业内容（传入数据：作业内容，回传数据：0或1<0为成功，1为失败>）
  CLIENT_GET_USER_ANSWER: 'client_get_user_answer', // 导出用户答案（传入数据：空，回传数据：用户答案内容）
  CLIENT_SHOW_DIALOG: 'client_show_dialog', // 显示 dialog（传入数据：{key: 'matchDialog', title: '标题', content: '内容', confirmText: '确认文本', cancelText: '取消文本', canClose: false}，回传数据0或1<1为确认，0为取消>）
  CLIENT_HIDE_DIALOG: 'client_hide_dialog', // 关闭 dialog（传入数据：{key:'matchDialog', ret: 0<1为确认，0为取消>}，无需回传数据）
  CLIENT_SHOW_TOAST: 'client_show_toast', // 显示 toast（传入数据：{type: 'success', content: '内容', duration: 2000}， 其中type可以为success、warning、error、loading）
  CLIENT_SHOW_LOADING: 'client_show_loading', // 显示loading（传入数据：{key:'paperSubmiting', title:'', content: ''}）
  CLIENT_HIDE_LOADING: 'client_hide_loading', // 隐藏loading（传入数据：{key:'paperSubmiting'}）
  CLIENT_CONTENT_CHANGED: 'client_content_changed', // 客户端内容改变
  CLIENT_GO_HOME: 'client_go_home', // 客户端返回首页
  CLIENT_OPEN_LINK: 'client_open_link', // 客户端打开链接（传入数据：{type:'browser', link:'https://coding.qq.com'}<type可以为browser：浏览器打开，client：客户端内打开>，无需回传数据）
  CLIENT_DOWNLOAD_MATCH_ANSWER_RECORD: 'client_download_match_answer_record', // 客户端下载赛事答题记录（传入数据：{recordFileName:'答题记录勿修改_小扣叮_123456789', recordDataName: 'matchRecord', recordData: '透传内容'}，无需回传数据）
  CLIENT_INITIATIVE_NOTIFY_SAVE: 'client_initiative_save', // 客户端主动通知保存（回传数据0或1<0为成功，1为失败>）
  CLIENT_REQUIRE_SUBMIT_ONLINE_ANSWER_PAPER: 'client_require_submit_online_answer_paper', // 请求客户端交卷（传入数据：{type:''}，回传数据0或1<0为成功，1为失败>）
  CLIENT_SHOW_IMAGE: 'client_show_image', // 客户端显示图片
  CLIENT_CHECK_IMPORT: 'client_check_import', // 检查客户端是否可导入（回传数据0或1<0为可导入，1为不可导入>）
  CLIENT_CONTENT_CHANGE_RESET: 'client_content_change_reset', // 重置客户端内容变化状态
};

// 考试面板
@inject('tabStore')
@observer
class ExamPanel extends Component {
  constructor() {
    super();

    this.state = {
      iframeUrl: '',
      showImage: '',
    };

    this.IFrameMessenger = new IFrameMessenger('client', 'easy_code');

    this.waitNocLoadTimeout = null;
    this.nocLoad = false;

    this.nocUrl = '';
  }

  componentDidMount() {
    EventUtil.on(EventMsg.NOTIFY_PROJECT_CHANGED, this.onNotifyProjectChanged);
    EventUtil.on(EventMsg.NOTIFY_NOC_SAVE_PROJECT, this.onNotifyNocSaveProject);
    EventUtil.on(EventMsg.SET_NOC_URL, this.onSetNocUrl);

    EventUtil.on(EventMsg.IMPORT_PROJECT_RESULT, this.onImportProjectResult);
    EventUtil.on(EventMsg.GET_USER_ANSWER_RESULT, this.onGetUserAnswerResult);
    EventUtil.on(EventMsg.SHOW_DIALOG_RESULT, this.onShowDialogResult);
    EventUtil.on(EventMsg.WAIT_NOC_LOAD_SHOW_DIALOG_RESULT, this.onWaitNocLoadShowDialogResult);
    EventUtil.on(EventMsg.REQUIRE_SUBMIT_ONLINE_ANSWER_PAPER_RESULT, this.onRequireSubmitOnlineAnswerPaperResult);
    EventUtil.on(EventMsg.CHECK_IMPORT_RESULT, this.onCheckImportResult);

    this.initIframeMessenger();
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.NOTIFY_PROJECT_CHANGED, this.onNotifyProjectChanged);
    EventUtil.off(EventMsg.NOTIFY_NOC_SAVE_PROJECT, this.onNotifyNocSaveProject);
    EventUtil.off(EventMsg.SET_NOC_URL, this.onSetNocUrl);

    EventUtil.off(EventMsg.IMPORT_PROJECT_RESULT, this.onImportProjectResult);
    EventUtil.off(EventMsg.GET_USER_ANSWER_RESULT, this.onGetUserAnswerResult);
    EventUtil.off(EventMsg.SHOW_DIALOG_RESULT, this.onShowDialogResult);
    EventUtil.off(EventMsg.WAIT_NOC_LOAD_SHOW_DIALOG_RESULT, this.onWaitNocLoadShowDialogResult);
    EventUtil.off(EventMsg.REQUIRE_SUBMIT_ONLINE_ANSWER_PAPER_RESULT, this.onRequireSubmitOnlineAnswerPaperResult);
    EventUtil.off(EventMsg.CHECK_IMPORT_RESULT, this.onCheckImportResult);

    this.uninitIframeMessenger();
  }

  waitNocLoad = () => {
    this.handleShowLoading({
      key: 'waitNocLoad',
      title: '正在加载',
      content: '正在加载数据，请稍候'
    }, 1);

    this.waitNocLoadTimeout = setTimeout(() => {
      this.showRetryDialog();
    }, 15000);
  };

  showRetryDialog = () => {
    this.handleHideLoading({
      key: 'waitNocLoad'
    });
    jsCallNative(JS_UNITY_CMD.NocShowDialog, { title: '加载失败', content: '题目加载失败，请重试', confirmTxt: '重试', hideClose: true }, { backString: 'waitNocLoad', cbKey: 'jsCallUnityWaitNocLoadShowDialogResult' });

    window.jsCallUnityWaitNocLoadShowDialogResult = function(value) {
      if (!value) {
        return;
      }

      EventUtil.emit(EventMsg.WAIT_NOC_LOAD_SHOW_DIALOG_RESULT, value);
    };
  };

  onNotifyProjectChanged = () => {
    this.IFrameMessenger.sendMessage(EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_CONTENT_CHANGED, null);
  };

  onNotifyNocSaveProject = (data) => {
    if (!data) {
      return;
    }

    const {
      url,
      cbKey
    } = data;

    this.IFrameMessenger.sendMessage(EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_INITIATIVE_NOTIFY_SAVE, url, cbKey, (result) => {
      const { data } = result;
      const cbResult = { retCode: data };
      jsCallNative(cbKey, cbResult);
    });
  };

  onSetNocUrl = (data) => {
    if (!data) {
      return;
    }
    
    const { url } = data;
    if (url == this.nocUrl) {
      return;
    }

    this.nocUrl = url;
    this.setNocUrl(url);
  };

  setNocUrl = (url) => {
    this.nocLoad = false;
    this.waitNocLoad();

    this.setState({
      iframeUrl: url
    });
  };

  onImportProjectResult = (data) => {
    if (!data) {
      return;
    }

    const {
      retCode,
      backString
    } = data;
    console.log(`ImportTaskResult retCode: ${retCode}, backString: ${backString}`);
    this.IFrameMessenger.sendMessage(EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_IMPORT_TASK, retCode, backString);
  };

  onGetUserAnswerResult = (data) => {
    if (!data) {
      return;
    }

    const {
      url,
      backString
    } = data;
    console.log(`GetUserAnswerResult url: ${url}, backString: ${backString}`);
    this.IFrameMessenger.sendMessage(EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_GET_USER_ANSWER, url, backString);
  };

  onShowDialogResult = (data) => {
    if (!data) {
      return;
    }

    const {
      confirm,
      backString
    } = data;
    console.log(`ShowDialogResult confirm: ${confirm}, backString: ${backString}`);
    this.IFrameMessenger.sendMessage(EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_SHOW_DIALOG, confirm, backString);
  };

  onWaitNocLoadShowDialogResult = (data) => {
    if (!data) {
      return;
    }

    const {
      confirm
    } = data;
    console.log(`aitImportTaskShowDialogResult confirm: ${confirm}`);

    if (this.nocLoad) {
      return;
    }

    this.setNocUrl(`${this.nocUrl}?reload=${new Date().valueOf()}/`);
  };

  onRequireSubmitOnlineAnswerPaperResult = (data) => {
    if (!data) {
      return;
    }

    const {
      retCode,
      backString
    } = data;
    console.log(`RequireSubmitOnlineAnswerPaperResult retCode: ${retCode}, backString: ${backString}`);
    this.IFrameMessenger.sendMessage(EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_REQUIRE_SUBMIT_ONLINE_ANSWER_PAPER, retCode, backString);
  };

  onCheckImportResult = (data) => {
    if (!data) {
      return;
    }

    const {
      retCode,
      backString
    } = data;
    console.log(`CheckImportResult retCode: ${retCode}, backString: ${backString}`);
    this.IFrameMessenger.sendMessage(EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_CHECK_IMPORT, retCode, backString);
  };

  initIframeMessenger = () => {
    this.IFrameMessenger.listen(this.handleReceiveMsgFromIFrame);

    this.examPanelIframe = document.getElementById(EXAM_PANEL_IFRAME_ID);
    this.IFrameMessenger.addTarget(this.examPanelIframe.contentWindow, 'onlineAnswer');
  };

  uninitIframeMessenger = () => {
    this.IFrameMessenger.clear();
    this.examPanelIframe = null;
  };

  handleReceiveMsgFromIFrame = async (receiveData) => {
    console.log('handleReceiveMsgFromIFrame receiveData: ', receiveData);

    this.nocLoad = true;

    if (this.waitNocLoadTimeout != null) {
      this.handleHideLoading({
        key: 'waitNocLoad'
      });
      clearTimeout(this.waitNocLoadTimeout);
      this.waitNocLoadTimeout = null;
    }

    const {
      cmd,
      data,
      backString
    } = receiveData;

    switch (cmd) {
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_IMPORT_TASK:
        this.handleImportTask(data, backString);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_GET_USER_ANSWER:
        this.handleGetUserAnswer(backString);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_SHOW_DIALOG:
        this.handleShowDialog(data, backString);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_HIDE_DIALOG:
        this.handleHideDialog(data);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_SHOW_TOAST:
        this.handleShowToast(data);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_SHOW_LOADING:
        this.handleShowLoading(data, 0);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_HIDE_LOADING:
        this.handleHideLoading(data);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_GO_HOME:
        this.handleGoHome();
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_OPEN_LINK:
        this.handleOpenLink(data);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_DOWNLOAD_MATCH_ANSWER_RECORD:
        this.handleDownloadMatchAnswerRecord(data);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_REQUIRE_SUBMIT_ONLINE_ANSWER_PAPER:
        this.handleRequireSubmitOnlineAnswerPaper(data, backString);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_SHOW_IMAGE:
        this.handleShowImage(data);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_CHECK_IMPORT:
        this.handleCheckImport(backString);
        break;
      case EXAM_PANEL_IFRAME_PROTOCOL_CMD.CLIENT_CONTENT_CHANGE_RESET:
        this.handleResetContentChange();
        break;
      default:
        break;
    }
  };

  handleImportTask = (data, backString) => {
    jsCallNative(JS_UNITY_CMD.NocImportProject, { data }, { backString, cbKey: 'jsCallUnityImportTaskResult' });

    window.jsCallUnityImportTaskResult = function (value) {
      if (!value) {
        return;
      }

      EventUtil.emit(EventMsg.IMPORT_PROJECT_RESULT, value);
    };
  };

  handleGetUserAnswer = (backString) => {
    jsCallNative(JS_UNITY_CMD.NocGetUserAnswer, {}, { backString, cbKey: 'jsCallUnityGetUserAnswerResult' });

    window.jsCallUnityGetUserAnswerResult = function (value) {
      if (!value) {
        return;
      }

      EventUtil.emit(EventMsg.GET_USER_ANSWER_RESULT, value);
    };
  };

  handleShowDialog = (data, backString) => {
    const {
      title,
      content,
      confirmText,
      cancelText,
      canClose
    } = data;

    jsCallNative(JS_UNITY_CMD.NocShowDialog, { title, content, confirmTxt: confirmText, cancelTxt: cancelText, hideClose: !canClose }, { backString, cbKey: 'jsCallUnityShowDialogResult' });

    window.jsCallUnityShowDialogResult = function(value) {
      if (!value) {
        return;
      }

      EventUtil.emit(EventMsg.SHOW_DIALOG_RESULT, value);
    };
  };

  handleHideDialog = (data) => {
    const {
      ret
    } = data;

    jsCallNative(JS_UNITY_CMD.NocHideDialog, { ret });
  };

  handleShowToast = (data) => {
    const {
      content,
      duration
    } = data;

    jsCallNative(JS_UNITY_CMD.NocShowToast, { content, time: duration / 1000 });
  };

  handleShowLoading = (data, type) => {
    const {
      key,
      title,
      content
    } = data;

    jsCallNative(JS_UNITY_CMD.NocShowLoading, { key, title, content, type });
  };

  handleHideLoading = (data) => {
    const {
      key
    } = data;

    jsCallNative(JS_UNITY_CMD.NocHideLoading, { key });
  };

  handleGoHome = () => {
    jsCallNative(JS_UNITY_CMD.NocGoHome);
  };

  handleOpenLink = (data) => {
    const {
      type,
      link
    } = data;

    jsCallNative(JS_UNITY_CMD.NocOpenLink, { type, link });
  };

  handleDownloadMatchAnswerRecord = (data) => {
    const {
      recordFileName,
      recordDataName,
      recordData,
    } = data;

    jsCallNative(JS_UNITY_CMD.NocDownloadMatchAnswerRecord, { recordFileName, recordDataName, recordData });
  };

  handleRequireSubmitOnlineAnswerPaper = (data, backString) => {
    const {
      type
    } = data;

    jsCallNative(JS_UNITY_CMD.NocRequireSubmitOnlineAnswerPaper, { type }, { backString, cbKey: 'jsCallUnityRequireSubmitOnlineAnswerPaperResult' });

    window.jsCallUnityRequireSubmitOnlineAnswerPaperResult = function(value) {
      if (!value) {
        return;
      }

      EventUtil.emit(EventMsg.REQUIRE_SUBMIT_ONLINE_ANSWER_PAPER_RESULT, value);
    };
  };

  handleShowImage = (data) => {
    this.setState({
      showImage: data
    });
    jsCallNative(JS_UNITY_CMD.SwitchLargeMultiPanelsWindow);
    EventUtil.emit(EventMsg.HIDE_PAGE);
  };

  handleCheckImport = (backString) => {
    jsCallNative(JS_UNITY_CMD.NocCheckImport, {}, { backString, cbKey: 'jsCallUnityCheckImportResult' });

    window.jsCallUnityCheckImportResult = function(value) {
      if (!value) {
        return;
      }

      EventUtil.emit(EventMsg.CHECK_IMPORT_RESULT, value);
    };
  };

  handleResetContentChange = () => {
    jsCallNative(JS_UNITY_CMD.NocResetContentChange);
  };

  closePicViewer = () => {
    this.setState({
      showImage: ''
    });

    jsCallNative(JS_UNITY_CMD.SwitchSmallMultiPanelsWindow);
    EventUtil.emit(EventMsg.SHOW_PAGE);
  };

  test = () => {
    console.log("TEST");

    this.handleShowImage('https://edu-30130.sz.gfp.tencent-cloud.com/admin/3eef72d958cf617e67da4eadee4335fc.jpeg');
  };

  render() {
    const {
      show,
      tabStore
    } = this.props;

    const {
      iframeUrl,
      showImage
    } = this.state;

    console.log(`iframeUrl: ${iframeUrl}`);

    return (
      <div className="panels-content" style={{ display: show ? 'block' : 'none' }}>
        {/* <button onClick={this.test}>test</button> */}
        <Iframe className="panels-content-iframe" url={iframeUrl} id={EXAM_PANEL_IFRAME_ID} height="100%" width="100%" />
        <RenderInTop type="RichText_PicViewer">
            <PicViewer image={showImage} closeCallback={this.closePicViewer} />
        </RenderInTop>
      </div>
    );
  }
}

export default ExamPanel;
