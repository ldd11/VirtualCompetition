import EventUtil from '@/utils/EventUtil';
import '../utils/MusicUtil';
import TimeUtil from '../utils/TimeUtil';
import { EDITOR_CALL } from './constant/index';
import InputUtil from './InputUtil';

class MainLoop {
    constructor() {
        this._rAFId = null;
        this._startTimeStamp = new Date().getTime();
        this._lastTimeStamp = this._startTimeStamp;
        this._paused = false;  //暂停
    }

    init = () => {
        EventUtil.on(EDITOR_CALL.STOP, this._stop);
        EventUtil.on(EDITOR_CALL.PLAY, this._start);
        EventUtil.on(EDITOR_CALL.RESUME, this._resume);
        EventUtil.on(EDITOR_CALL.SUSPEND, this._suspend);
        this._mainLoop();
    }

    unInit = () => {
        EventUtil.off(EDITOR_CALL.STOP, this._stop);
        EventUtil.off(EDITOR_CALL.PLAY, this._start);
        EventUtil.off(EDITOR_CALL.RESUME, this._resume);
        EventUtil.off(EDITOR_CALL.SUSPEND, this._suspend);
    }

    _start = () => {
        TimeUtil.start();
    }

    _stop = () => {
        TimeUtil.stop();
    }

    _suspend = () => {
        this._paused = true;
    }

    _resume = () => {
        this._paused = false;
    }

    _mainLoop = () => {
        if (!TimeUtil.isRunning() || this._paused) {
            this._rAFId = window.requestAnimationFrame(() => {
                this._mainLoop();
            });
            return;
        }

        const epsilon = 5;
        const nowTimeStamp = new Date().getTime();
        const timeSinceLastFrame = nowTimeStamp - this._lastTimeStamp;
        const frameIntervalTime = TimeUtil.getFrameTime();

        if (timeSinceLastFrame >= frameIntervalTime - epsilon) {
            TimeUtil.update(nowTimeStamp);
        }

        this._rAFId = window.requestAnimationFrame(() => {
            this._mainLoop();
        });
        
    }
}

export default MainLoop;