class TimeUtil {
  constructor() {
    this._frameRate = 60;
    this._isRunning = false;
    this._waitQueue = [];
    this.reset();
  }

  reset = () => {
    this._waitQueue = [];
    this._frameTime = 1000 / this._frameRate;
  };

  start = () => {
    this._isRunning = true;
    this.reset();
  };

  stop = () => {
    this._isRunning = false;
    this.reset();
  };

  isRunning = () => this._isRunning;

  setFrameRate = (rate) => {
    this._frameRate = rate || 60;
    this._frameTime = 1000 / this._frameTime;
  };

  getFrameRate = () => this._frameRate;

  set framerate(v) {
    this._frameRate = v;
  }

  get framerate() {
    return this._frameRate;
  }

  getFrameTime = () => this._frameTime;

  update = (currTime) => {
    this.triggerCallback(currTime);
  };

  triggerCallback = (currTime) => {
    const { length } = this._waitQueue;
    if (length === 0) return;

    let index = 0;
    for (; index < length; ++index) {
      const { time, callback, resolve } = this._waitQueue[index];
      if (time > currTime) break;
      callback && callback();
      resolve && resolve();
    }

    this._waitQueue.splice(0, index);
  };

  wait = async (delayTime, callback) => new Promise((resolve, reject) => {
    const triggerTime = new Date().getTime() + delayTime * 1000;
    let index = this._waitQueue.length - 1;
    for (; index >= 0; --index) {
      const { time } = this._waitQueue[index];
      if (time < triggerTime) {
        break;
      }
    }
    this._waitQueue.splice(index + 1, 0, {
      time: triggerTime,
      callback,
      resolve,
      reject
    });
  });
}

export default new TimeUtil();
