import React, { Component } from 'react';
// import './index.less';

const prefixCls = 'player';
class VideoPlayer extends Component {
  render() {
    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-main`}>
          <img className={`${prefixCls}-poster`} src="https://wuji-30130.sz.gfp.tencent-cloud.com/pics/20221207_50y9swhx219c1.png" alt="" />
          <div className={`${prefixCls}-progress`}>
            <div className={`${prefixCls}-progress-inner`} style={{ width: '60%' }} />
          </div>
          <div className={`${prefixCls}-time`}>01:54/03:28</div>
          <div className={`${prefixCls}-status`}><i className="iconfont icon-arrow" /></div>
          {/* 播放icon为arrow，暂停icon为pause */}
          <div className={`${prefixCls}-ctrls`}><i className="iconfont icon-zoomout" /></div>
        </div>
        <div className={`${prefixCls}-offline`} style={{ display: 'none' }}>视频无法显示，请检查网络连接</div>
      </div>
    );
  }
}

export default VideoPlayer;
