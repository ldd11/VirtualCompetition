import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import UrlUtil from '@/utils/UrlUtil';
import './index.less';
import { PicViewer, RenderInTop, VideoViewer } from '@tencent/eui/';
import { jsCallNative, JS_UNITY_CMD } from '@/utils/NativeCall';
import EventUtil from '@/utils/EventUtil';
import { EventMsg } from '@/utils/EventMsg';

const pagePrefixCls = 'RichText';
const defaultCurTaskVideo = { name: '', url: '' };
const defaultCurTaskVideoString = JSON.stringify(defaultCurTaskVideo);
const triggerVideoPlay = 'triggerVideoPlay';
const triggerVideoFullScreen = 'triggerVideoFullScreen';

class RichText extends Component {
    static propTypes = {
      html: PropTypes.string,
    };

    constructor(props) {
      super(props);

      this.state = {
        html: '',
        showImage: '',
        showVideo: '',
        fullScreen: false,
        play: false,
      };
      this.imageClickDataList = [];

      this.videoIds = [];
      this.videoClickDataList = [];
      this.videoIdProgress = {};
    }

    componentDidMount() {
      EventUtil.on(EventMsg.UPDATE_VIDEO_PROGRESS, this.onUpdateVideoProgress);

      const { html } = this.props;
      this.initHtml(html);
      this.initEvent();
    }

    componentWillUnmount() {
      EventUtil.off(EventMsg.UPDATE_VIDEO_PROGRESS, this.onUpdateVideoProgress);
    }

    onUpdateVideoProgress = (data) => {
      if (!data) {
        return;
      }

      const {
        time,
        sTime,
        length,
        sLength,
        videoId
      } = data;

      const videoProgress = time / length;
      this.videoIdProgress[videoId] = videoProgress;

      const playerProgressInnerDiv = document.getElementById(`player-progress-inner-${videoId}`);
      if (playerProgressInnerDiv) {
        playerProgressInnerDiv.setAttribute('style', `width: ${videoProgress * 100}%;`);
      }

      const playerTimeDiv = document.getElementById(`player-time-${videoId}`);
      if (playerTimeDiv) {
        playerTimeDiv.innerText = `${sTime}/${sLength}`;
      }
    };

    initHtml = (html) => {
      let dom = new DOMParser().parseFromString(`<div id="ec_desc_richtext">${html}</div>`, 'text/html');
      if (this.isParseError(dom)) {
        dom = new DOMParser().parseFromString('<div id="ec_desc_richtext"></div>', 'text/html');
      }

      this.imageClickDataList = [];

      this.videoIds = [];
      this.videoClickDataList = [];
      this.videoIdProgress = {};

      this.initImages(dom);
      this.initVideos(dom);

      const container = dom.getElementById('ec_desc_richtext');
      this.setState({
        html: container.innerHTML
      }, this.addVideoImgLoadCallback);
    };

    addVideoImgLoadCallback = () => {
      for (let i = 0; i < this.videoIds.length; i++) {
        const videoId = this.videoIds[i];

        const videoSrcImgDiv = document.getElementById(`player-video-img-${videoId}`);
        videoSrcImgDiv.onload = function () {
          console.log('width: ', videoSrcImgDiv.naturalWidth, 'height: ', videoSrcImgDiv.naturalHeight);
          if (videoSrcImgDiv.naturalWidth < videoSrcImgDiv.naturalHeight) {
            videoSrcImgDiv.className = 'vertical';
          }
        };
      }
    };

    isParseError = (parsedDocument) => {
      const parser = new DOMParser();
      const errorneousParse = parser.parseFromString('<', 'text/xml');
      const parsererrorNS = errorneousParse.getElementsByTagName('parsererror')[0].namespaceURI;
      if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
        return parsedDocument.getElementsByTagName('parsererror').length > 0;
      }
      return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
    };

    initImages = (srcDom) => {
      const images = srcDom.getElementsByTagName('img');
      for (let i = images.length - 1; i >= 0; i--) {
        let imageSrc = images[i].getAttribute('src');
        if (!UrlUtil.checkURL(imageSrc)) {
          imageSrc = '';
        }
        const imageDiv = document.createElement('div');
        imageDiv.setAttribute('class', `${pagePrefixCls}-imgwrap`);
        imageDiv.onclick = this.handleClick;
        const imageId = `ec_desc_image_${i}`;
        images[i].setAttribute('id', imageId);
        images[i].setAttribute('src', imageSrc);
        images[i].setAttribute('class', `${pagePrefixCls}-img`);
        images[i].setAttribute('style', '-webkit-user-drag: none');
        imageDiv.appendChild(images[i].cloneNode(true));
        images[i].parentElement.replaceChild(imageDiv, images[i]);

        this.imageClickDataList.push({
          id: imageId,
          src: imageSrc
        });

        const imageZoomId = `ec_desc_image_zoom_${i}`;
        const iDiv = document.createElement('i');
        iDiv.setAttribute('class', 'icon icon-fangda');
        const spanDiv = document.createElement('span');
        spanDiv.setAttribute('class', `${pagePrefixCls}-imgwrap-zoomin`);
        spanDiv.setAttribute('href', 'javascript:;');
        spanDiv.setAttribute('id', imageZoomId);
        spanDiv.appendChild(iDiv);
        imageDiv.appendChild(spanDiv);
        this.imageClickDataList.push({
          id: imageZoomId,
          src: imageSrc
        });
      }
    };

    initVideos = (srcDom) => {
      const videos = srcDom.getElementsByClassName('video');
      for (let i = videos.length - 1; i >= 0; i--) {
        const videoId = videos[i].getAttribute('id');
        this.videoIds.push(videoId);

        const videoImgSrc = videos[i].getAttribute('videoimg');

        let videoSrc = videos[i].getAttribute('src');
        if (!UrlUtil.checkURL(videoSrc)) {
          videoSrc = '';
        }
        videoSrc = this.getRealVideoUrl(videoSrc);
        const urlParam = qs.parse(videoSrc);
        const curTaskVideo = JSON.parse(decodeURIComponent(urlParam.curTaskVideo || '') || defaultCurTaskVideoString);

        const playerDiv = document.createElement('div');
        playerDiv.setAttribute('class', 'player');

        const playerMainDiv = document.createElement('div');
        playerMainDiv.setAttribute('id', `player-main-${videoId}`);
        playerMainDiv.setAttribute('class', 'player-main');

        const playerPosterVideoImg = document.createElement('img');
        playerPosterVideoImg.setAttribute('id', `player-video-img-${videoId}`);
        playerPosterVideoImg.setAttribute('src', videoImgSrc);
        playerPosterVideoImg.setAttribute('width', '100%');
        playerPosterVideoImg.setAttribute('height', '100%');
        playerPosterVideoImg.setAttribute('style', '-webkit-user-drag: none');
        playerMainDiv.appendChild(playerPosterVideoImg);
        playerDiv.appendChild(playerMainDiv);

        const playerProgressDiv = document.createElement('div');
        playerProgressDiv.setAttribute('class', 'player-progress');
        const playerProgressInnerDiv = document.createElement('div');
        playerProgressInnerDiv.setAttribute('id', `player-progress-inner-${videoId}`);
        playerProgressInnerDiv.setAttribute('class', 'player-progress-inner');
        playerProgressInnerDiv.setAttribute('style', 'width: 0%;');
        playerProgressDiv.appendChild(playerProgressInnerDiv);
        playerDiv.appendChild(playerProgressDiv);

        const playerTimeDiv = document.createElement('div');
        playerTimeDiv.id = `player-time-${videoId}`;
        playerTimeDiv.className = 'player-time';
        playerTimeDiv.innerText = '';
        playerDiv.appendChild(playerTimeDiv);

        const playerStatusDiv = document.createElement('div');
        playerStatusDiv.id = `player-status-${videoId}`;
        playerStatusDiv.className = 'player-status';
        const playerStatusIcon = document.createElement('i');
        playerStatusIcon.className = 'iconfont icon-arrow';
        playerStatusDiv.appendChild(playerStatusIcon);
        playerDiv.appendChild(playerStatusDiv);

        const playerCtrlsDiv = document.createElement('div');
        playerCtrlsDiv.id = `player-ctrls-${videoId}`;
        playerCtrlsDiv.className = 'player-ctrls';
        const playerCtrlsIcon = document.createElement('i');
        playerCtrlsIcon.className = 'iconfont icon-zoomout';
        playerCtrlsDiv.appendChild(playerCtrlsIcon);
        playerDiv.appendChild(playerCtrlsDiv);

        videos[i].parentElement.replaceChild(playerDiv, videos[i]);

        this.videoClickDataList.push({
          id: `player-main-${videoId}`,
          videoId,
          url: curTaskVideo.url,
          type: triggerVideoPlay
        });
        this.videoClickDataList.push({
          id: `player-status-${videoId}`,
          videoId,
          url: curTaskVideo.url,
          type: triggerVideoPlay
        });
        this.videoClickDataList.push({
          id: `player-ctrls-${videoId}`,
          videoId,
          url: curTaskVideo.url,
          type: triggerVideoFullScreen
        });
      }
    };

    getRealVideoUrl = (srcUrl) => {
      console.log('[RichText][getRealVideoUrl] srcUrl:', srcUrl);
      if (!srcUrl) {
        return srcUrl;
      }

      const uri = new URL(srcUrl);
      uri.searchParams.delete('id');
      uri.searchParams.delete('defaultWidth');
      uri.searchParams.delete('minWidth');
      const retUrl = uri.toString();
      console.log('[RichText][getRealVideoUrl] retUrl:', retUrl);
      return retUrl;
    }

    initEvent = () => {
      if (!this.checkAllElementReady()) {
        setTimeout(this.initEvent, 100);
        return;
      }
      this.initImageClickEvent();
      this.initVideoClickEvent();
    }

    checkAllElementReady = () => {
      for (let i = 0; i < this.imageClickDataList.length; i++) {
        const imageClickData = this.imageClickDataList[i];
        const imageElement = document.getElementById(imageClickData.id);
        if (!imageElement) {
          return false;
        }
      }

      for (let j = 0; j < this.videoClickDataList.length; j++) {
        const videoClickData = this.videoClickDataList[j];
        const videoElement = document.getElementById(videoClickData.id);
        if (!videoElement) {
          return false;
        }
      }

      return true;
    };

    initImageClickEvent = () => {
      for (let i = 0; i < this.imageClickDataList.length; i++) {
        const imageClickData = this.imageClickDataList[i];
        const imageElement = document.getElementById(imageClickData.id);
        imageElement.addEventListener('click', () => { this.handleImageClick(imageClickData.src); });
      }
    }

    initVideoClickEvent = () => {
      for (let i = 0; i < this.videoClickDataList.length; i++) {
        const videoClickData = this.videoClickDataList[i];
        const videoElement = document.getElementById(videoClickData.id);
        videoElement.addEventListener('click', () => { this.handleVideoClick(videoClickData); });
      }
    };

    handleImageClick = (imageSrc) => {
     //  console.log('[RichText][handleImageClick] imageSrc:', imageSrc);

      this.setState({
        showImage: imageSrc
      });
      document.getElementsByClassName('panels')[0].style.opacity = 0;
      jsCallNative(JS_UNITY_CMD.SwitchLargeMultiPanelsWindow);
      EventUtil.emit(EventMsg.HIDE_PAGE);
      jsCallNative(JS_UNITY_CMD.HideVideo);
    }

    handleVideoClick = (videoClickData) => {
     //  console.log('[RichText][handleVideoClick] videoClickData:', videoClickData);

      const videoProgress = this.videoIdProgress[videoClickData.videoId] ? this.videoIdProgress[videoClickData.videoId] : 0;

      switch (videoClickData.type) {
        case triggerVideoPlay:
          {
            jsCallNative(JS_UNITY_CMD.ShowVideo, {
              videoSrc: videoClickData.url, videoId: videoClickData.videoId, fullScreen: false, play: true, progress: videoProgress
            });
          }
          break;
        case triggerVideoFullScreen:
          {
            jsCallNative(JS_UNITY_CMD.ShowVideo, {
              videoSrc: videoClickData.url, videoId: videoClickData.videoId, fullScreen: true, play: false, progress: videoProgress
            });
          }
          break;
        default:
          break;
      }
    }

    closePicViewer = () => {
      console.log('[RichText][closePicViewer]');
      this.setState({
        showImage: ''
      });
      document.getElementsByClassName('panels')[0].style.opacity = 1;
      jsCallNative(JS_UNITY_CMD.SwitchSmallMultiPanelsWindow);
      EventUtil.emit(EventMsg.SHOW_PAGE);
    }

    render() {
      const {
        html, showImage
      } = this.state;
      return (
        <div className="lesson-task-component ql-snow">
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: html }} />
          <RenderInTop type="RichText_PicViewer">
            <PicViewer image={showImage} closeCallback={this.closePicViewer} />
          </RenderInTop>
        </div>
      );
    }
}

export default RichText;
