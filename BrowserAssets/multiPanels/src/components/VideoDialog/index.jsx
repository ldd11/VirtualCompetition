import React, { Component } from 'react';
import { Player } from 'video-react';
// import './index.less';

const prefixCls = 'videodialog';

class VideoDialog extends Component {
  constructor() {
    super();

    this.state = {
      videoSrc: '',
      isPlaying: false,
      isFullscreen: false,
      currentTime: 0,
      duration: 0,
    };

    this.progressDivRef = React.createRef();
  }
  

  componentDidMount() {
    const {
      src,
      fullScreen,
      play
    } = this.props;

    this.setState({
      videoSrc: src,
      isFullscreen: fullScreen,
      isPlaying: play
    }, () => {
      if (this.state.isPlaying) {
        this.player.play();
      }
      else {
        this.player.pause();
      }
    });
  }

  playToggle = () => {
    const { isPlaying } = this.state;
    this.setState({
      isPlaying: !isPlaying
    }, () => {
      if (this.state.isPlaying) {
        this.player.play();
      }
      else {
        this.player.pause();
      }
    });
  };

  fullscreenToggle = () => {
    const { isFullscreen } = this.state;
    this.setState({
      isFullscreen: !isFullscreen
    });
  };

  onClose = () => {
    this.setState({
      isFullscreen: false
    });
  };

  handlePlay = () => {
    this.setState({
      isPlaying: true
    });
  };

  handlePause = () => {
    this.setState({
      isPlaying: false
    });
  };

  handleEnded = () => {
    this.setState({
      isPlaying: false
    });
  };

  handleTimeUpdate = (event) => {
    this.setState({
      currentTime: event.target.currentTime,
      duration: event.target.duration
    });
  };

  getFormatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  getRatio = () => {
    const {
      currentTime,
      duration
    } = this.state;
    if (duration <= 0) {
      return 0;
    }
    return currentTime / duration * 100;
  };

  clickProgress = (event) => {
    const {
      duration
    } = this.state;
    const rect = this.progressDivRef.current.getBoundingClientRect();
    const seekTime = duration * (event.clientX - rect.left) / (rect.right - rect.left);
    this.player.seek(seekTime);
  };

  render() {
    const { videoSrc, isPlaying, isFullscreen, currentTime, duration } = this.state;
    return (
      <div className={`${prefixCls} ${isFullscreen ? 'fullscreen' : ''}`}>
        <div className={`${prefixCls}-inner`}>
          <div className={`${prefixCls}-close`} />
          <div className={`${prefixCls}-hd`}>
            <p className={`${prefixCls}-hd-title`}>视频内容</p>
            <span className={`${prefixCls}-hd-info`}>VIDEO</span>
          </div>
          <div className={`${prefixCls}-bd`}>
            <div className={`${prefixCls}-player`}>
              <Player
                className={`${prefixCls}-player-video`}
                ref={(player) => { this.player = player; }}
                aspectRatio="auto"
                autoPlay={false}
                onPlay={this.handlePlay}
                onPause={this.handlePause}
                onEnded={this.handleEnded}
                onTimeUpdate={this.handleTimeUpdate}
              >
                <source src={videoSrc} />
              </Player>
              {/* 自定义组件 */}
              <div className={`${prefixCls}-player-playbtn ${isPlaying ? 'paused' : 'playing'}`} onClick={this.playToggle} style={{ display: `${isPlaying?'none':'flex'}` }} />
              <div className={`${prefixCls}-player-control`}>
                <div className={`${prefixCls}-player-time`}><span>{this.getFormatTime(Math.round(currentTime))}</span>/<span>{this.getFormatTime(Math.round(duration))}</span></div>
                <div ref={this.progressDivRef} className={`${prefixCls}-player-progress`} onClick={this.clickProgress}>
                  <div className={`${prefixCls}-player-slider`} style={{ width: `${this.getRatio()}%` }} />
                </div>
              </div>
              <div className={`${prefixCls}-player-ctrls`}>
                <div className={`${prefixCls}-player-ctrls-btn`} onClick={this.fullscreenToggle}>{isFullscreen ? (<i className="iconfont icon-zoomin" />) : (<i className="iconfont icon-zoomout" />)}</div>
                {
                  isFullscreen && (<div className={`${prefixCls}-player-ctrls-btn`} onClick={this.onClose}><i className="iconfont icon-close" /></div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoDialog;
