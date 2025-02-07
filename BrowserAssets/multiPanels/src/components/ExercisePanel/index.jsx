import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Pagination from '../Pagination/index';
import { Button } from '@tencent/eui/';
import './index.less';
import EventUtil from '@/utils/EventUtil';
import { EventMsg } from '@/utils/EventMsg';
import ImageDownloader from '@/utils/ImageDownloader';
import RichText from '../RichText/index';
import { JS_UNITY_CMD, jsCallNative } from '@/utils/NativeCall';

const SinglePageExerciseItemCount = 7;

// 习题面板
@inject('tabStore')
@observer
class ExercisePanel extends Component {
  constructor() {
    super();
    this.state = {
      exerciseItemComponentList: [],
      currentExerciseItemIndex: 0,
      currentPageIndex: 0,
    };
  }

  componentDidMount() {
    EventUtil.on(EventMsg.SET_EXERCISE_CONFIG, this.setExerciseConfig);

    // 单页测试数据
    //this.setExerciseConfig('{"type":"virtualCompetition","jobInfo":{"jobTask":"","robotInfo":{"robotPos":{"x":0,"y":0,"z":0},"robotAngle":0},"job_project":"","show_score":0,"show_task":0,"pythonBlocksID":"","sceneTabIndex":"","task_time":0},"configurationFileName":"","projectName":"","tgeDataNotPrepared":true,"blockType":"","user_block":"[]","toolbox":"","projectMode":"graphical","editPropertyValueMap":{"editor_mode":"code","code_language":"python"},"projectId":"","fullCanvas":false,"draft":{"type":"virtualCompetition","jobInfo":{"jobTask":"","robotInfo":{"robotPos":{"x":0,"y":0,"z":0},"robotAngle":0},"job_project":"","show_score":0,"show_task":0,"pythonBlocksID":"","sceneTabIndex":"","task_time":0},"configurationFileName":"","projectName":"","tgeDataNotPrepared":true,"blockType":"","user_block":"","toolbox":"","projectMode":"graphical","editPropertyValueMap":{"editor_mode":"code","code_language":"python"},"projectId":"","fullCanvas":false,"description":""},"description":"{\\"title\\":\\"lovn\\",\\"position\\":\\"left_two\\",\\"answerType\\":\\"code\\",\\"mainType\\":\\"document\\",\\"dataList\\":[{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>横版视频</p><iframe class=\\\\\\"video\\\\\\" allow=\\\\\\"fullscreen\\\\\\" src=\\\\\\"https://test.coding.qq.com/video/?type=task&amp;fullScreen=true&amp;download=false&amp;disablePictureInPicture=true&amp;defaultWidth=350&amp;minWidth=350&amp;curTaskVideo=%7B%22name%22%3A%2220220705_8t20qibo8ba%22%2C%22url%22%3A%22https%3A%2F%2Fmisc-1258344700.cos.ap-guangzhou.myqcloud.com%2Fcoding%2Ftask%2F21477064704%2F1689577791776-20220705_8t20qibo8ba.mp4%22%7D&amp;id=43682BCE-49AD-4B86-9CAC-7AB06D6C4050\\\\\\" width=\\\\\\"100%\\\\\\" height=\\\\\\"242.875\\\\\\" frameborder=\\\\\\"0\\\\\\" id=\\\\\\"43682BCE-49AD-4B86-9CAC-7AB06D6C4050\\\\\\" scrolling=\\\\\\"no\\\\\\" videoimg=\\\\\\"https://p.qpic.cn/qqgameedu/0/2211d86e00d68d2a1e6505f072786737/0\\\\\\"></iframe><p>竖版视频</p><iframe class=\\\\\\"video\\\\\\" allow=\\\\\\"fullscreen\\\\\\" src=\\\\\\"https://test.coding.qq.com/video/?type=task&amp;fullScreen=true&amp;download=false&amp;disablePictureInPicture=true&amp;defaultWidth=350&amp;minWidth=350&amp;curTaskVideo=%7B%22name%22%3A%22206_1688696563%22%2C%22url%22%3A%22https%3A%2F%2Fmisc-1258344700.cos.ap-guangzhou.myqcloud.com%2Fcoding%2Ftask%2F21477064704%2F1689577817831-206_1688696563.mp4%22%7D&amp;id=6BAD8165-F612-499F-A769-9AC0724BE179\\\\\\" width=\\\\\\"100%\\\\\\" height=\\\\\\"300px\\\\\\" frameborder=\\\\\\"0\\\\\\" id=\\\\\\"6BAD8165-F612-499F-A769-9AC0724BE179\\\\\\" scrolling=\\\\\\"no\\\\\\" videoimg=\\\\\\"https://p.qpic.cn/qqgameedu/0/2dcd3b72a8043df1d196ef653c0990ae/0\\\\\\"></iframe><p><br></p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"}],\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"}","knowledgeLabelList":[""],"answer":"{\\"answerAnalysis\\":\\"\\",\\"showAnswerAnalysis\\":false}","taskType":"document","isEditUserBlock":false,"isEditToolbox":false,"isEditCodeExport":true,"isEditKnowledgeLabel":false,"isEditElementsettings":false,"isEditPresetProject":false,"serverKernelType":"","isAutoScore":false}');
    // 多页测试数据
    // this.setExerciseConfig('{"type":"virtualHardware","projectName":"","projectUrl":"","blockType":"","user_block":"[]","toolbox":"","projectMode":"classic","editPropertyValueMap":{"editor_mode":"code","code_language":"python"},"projectId":"","fullCanvas":false,"draft":{"type":"virtualHardware","projectName":"","projectUrl":"","blockType":"","user_block":"","toolbox":"","projectMode":"classic","editPropertyValueMap":{"editor_mode":"code","code_language":"python"},"projectId":"","fullCanvas":false,"description":""},"description":"{\\"title\\":\\"test\\",\\"position\\":\\"left_two\\",\\"answerType\\":\\"code\\",\\"mainType\\":\\"document\\",\\"dataList\\":[{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p><span class=\\\\\\"ql-size-small\\\\\\">小字体</span></p><p>普通字体</p><p><span class=\\\\\\"ql-size-large\\\\\\">大字体</span></p><p><span class=\\\\\\"ql-size-huge\\\\\\">巨大字体</span></p><p><img src=\\\\\\"https://edu-30130.sz.gfp.tencent-cloud.com/admin/3eef72d958cf617e67da4eadee4335fc.jpeg\\\\\\"></p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"},{\\"type\\":\\"richTextEditor\\",\\"html\\":\\"<p>富文本编辑器</p>\\",\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"}],\\"answer_right\\":\\"\\",\\"answer_user\\":\\"\\"}","knowledgeLabelList":[""],"isEditUserBlock":false,"isEditToolbox":false,"isEditCodeExport":true,"isEditKnowledgeLabel":false,"isAutoScore":false,"serverKernelType":"","answer":"{\\"answerAnalysis\\":\\"\\",\\"showAnswerAnalysis\\":false}","taskType":"document"}');
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.SET_EXERCISE_CONFIG, this.setExerciseConfig);
  }

  setExerciseConfig = (data) => {
    if (!data) {
      return;
    }

    const jsonData = JSON.parse(data);
    if (!jsonData) {
      return;
    }

    if (Number.isInteger(jsonData.proxyPort) && jsonData.proxyPort !== -1) {
      ImageDownloader.proxyPort = jsonData.proxyPort;
    }
    else {
      ImageDownloader.proxyPort = -1;
    }

    const strDescData = jsonData.description;
    if (!strDescData) {
      return;
    }

    const jsonDescData = JSON.parse(strDescData);
    if (!jsonDescData) {
      return;
    }

    const {
      dataList
    } = jsonDescData;
    Promise.all(dataList.map((content) => {
      return ImageDownloader.loadImageFromRichText(content.html).then((result) => {
        content.html = result;
      });
    })).then(() => {
      console.log('final datalist', dataList);
      this.setState({
        exerciseItemComponentList: this.getExerciseItemComponentsFromDataList(dataList),
        currentExerciseItemIndex: 0,
        currentPageIndex: 0
      });
    })
  };

  getExerciseItemComponentsFromDataList = (dataList) => {
    const exerciseItemComponentList = [];

    dataList.forEach((data) => {
      const exerciseItemComponent = this.getExerciseItemComponent(data);
      if (exerciseItemComponent) {
        exerciseItemComponentList.push(exerciseItemComponent);
      }
    });

    return exerciseItemComponentList;
  };

  getExerciseItemComponent = (exerciseItemComponentData) => {
    let exerciseItemComponent = null;
    if (exerciseItemComponentData != null) {
      exerciseItemComponent = this.getRichTextEditorTaskData(exerciseItemComponentData);
    }
    return exerciseItemComponent;
  };

  getRichTextEditorTaskData = (data) => {
    let html = data.html;
    if (html.endsWith('<p><br></p>')) {
      const index = html.lastIndexOf('<p><br></p>');
      if (index >= 0) {
        html = html.slice(0, index);
        data.html = html;
      }
    }
    let taskData = null;
    if (html && html.length > 0) {
      taskData = {
        content: this.getRichTextEditorTaskComponent(data),
      };
    }
    return taskData;
  };

  getRichTextEditorTaskComponent = (data) => {
    const richTextEditorTaskComponent = () => (
      <div className="exercise">
        <RichText html={data.html} />
      </div>
    );
    return richTextEditorTaskComponent;
  };

  changeExerciseItemIndex = (exerciseItemIndex) => {
    jsCallNative(JS_UNITY_CMD.HideVideo);
    this.setState({
      currentExerciseItemIndex: exerciseItemIndex
    });
  };

  changePageIndex = (pageIndex) => {
    this.setState({
      currentPageIndex: pageIndex
    });
  };

  getExerciseItemContent = () => {
    const {
      exerciseItemComponentList,
      currentExerciseItemIndex,
    } = this.state;

    if (exerciseItemComponentList == null || exerciseItemComponentList.length <= 0) {
      return null;
    }

    if (!exerciseItemComponentList[currentExerciseItemIndex]) {
      return null;
    }

    return exerciseItemComponentList[currentExerciseItemIndex].content;
  }

  reloadDefaultJobProject= ()=>
  {
    jsCallNative(JS_UNITY_CMD.ReloadDefaultJobProject);
  };

  render() {
    const {
      show,
      tabStore
    } = this.props;
    const {
      exerciseItemComponentList,
      currentExerciseItemIndex,
      currentPageIndex
    } = this.state;
    const ExerciseItemContent = this.getExerciseItemContent();

    return (
      <div className="exercisepanel" style={{ display: show ? 'block' : 'none' }}>
        <Button className="reset-btn" size="small" type="default" onClick={this.reloadDefaultJobProject} text="重置本题" />
        <div className="panels-line" />
        {
          exerciseItemComponentList.length > 1 && (
            <Pagination totalExerciseItemCount={exerciseItemComponentList.length} currentExerciseItemIndex={currentExerciseItemIndex} currentPageIndex={currentPageIndex} singlePageExerciseItemCount={SinglePageExerciseItemCount} changeExerciseItemIndex={(exerciseItemIndex) => { this.changeExerciseItemIndex(exerciseItemIndex); }} changePageIndex={(pageIndex) => { this.changePageIndex(pageIndex); }} />
          )
        }
        {
          ExerciseItemContent && (
            <ExerciseItemContent />
          )
        }
      </div>
    );
  }
}

export default ExercisePanel;
