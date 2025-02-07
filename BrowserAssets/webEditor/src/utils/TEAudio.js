import { PitchShifter } from 'soundtouchjs';
import AudioUtils from '@tencent/ec-audio-utils';
import MathUtil from './MathUtil';

const FullProgress = 99.99;

class TEAudio {
  constructor() {
    this._isPlaying = false;
    this._audioUrl = null;
    this._loading = false;
    this._shifter = null;
    this._audioId = -1; // 音频Id
    this._volume = 1;

    this._fadeInDuration = 0;
    this._fadeOutDuration = 0;
    this._playPitchSemitones = null;
    this._panValue = null;
    this._playRate = null;

    this._audioData = null;
  }

  get isPlaying() {
    return this._isPlaying;
  }

  // 播放
  play(url, loop = false, endCallback) {
    if (this._loading) {
      return;
    }
    if (this._isPlaying) {
      this.stop(true);
    }
    this._audioUrl = url;
    this._loading = true;
    this._isPlaying = true;

    this._audioId = AudioUtils.preload(url, (audioData) => {
      if (this._audioUrl !== url || !this._isPlaying) return;
      this._audioData = audioData;
      this._loading = false;
      const { audioId, source, gainNode } = audioData;
      const { buffer } = source;
      const audioCtx = AudioUtils.audioContext;
      let realDuration = buffer.duration;
      const filterNodes = [];
      if (this._isUseShifter()) {
        const { sampleRate, duration } = buffer;
        const fillCut = 2;
        const minLen = 1;
        const fillDuration = duration < minLen ? minLen + fillCut - duration : fillCut;
        const fillLen = Math.floor(sampleRate * fillDuration);

        const { numberOfChannels } = buffer;
        const totalLen = buffer.getChannelData(0).length + fillLen;
        const newAudioBuffer = audioCtx.createBuffer(
          numberOfChannels,
          totalLen,
          sampleRate
        );
        for (let i = 0; i < numberOfChannels; i++) {
          const newSamples = new Float32Array(totalLen);
          newSamples.set(buffer.getChannelData(i), 0);
          newAudioBuffer.getChannelData(i).set(newSamples);
        }
        realDuration = newAudioBuffer.duration;

        this._shifter = new PitchShifter(audioCtx, newAudioBuffer, 16384);
        this._shifter.on('play', (detail) => {
          if (this._shifter && detail.percentagePlayed >= FullProgress) {
            this._shifter.percentagePlayed = 0;
            if (!loop) {
              this._shifter.disconnect();
              endCallback && endCallback('end');
              this._isPlaying = false;
            }
          }
        });
        filterNodes.push(this._shifter.node);
      }

      if (audioCtx.createStereoPanner) {
        this._stereoPanner = AudioUtils.createStereoPanner();
        filterNodes.push(this._stereoPanner);
      }
      AudioUtils.setFilters(audioId, filterNodes);

      this._updateVolume();
      this._updateStereoPan();
      this._updatePlayRate();
      this._updatePlayPitchSemitones();

      const playRate = this._playRate || 1;
      realDuration /= playRate;
      audioData.duration = realDuration;

      // 淡入1, 设置无声
      if (this._fadeInDuration) {
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        // console.log('sound fade in', this._fadeInDuration, audioCtx.currentTime, this._audioId);
        gainNode.gain.linearRampToValueAtTime(
          this._volume,
          audioCtx.currentTime + this._fadeInDuration + 0.1
        );
      }
      AudioUtils.playByAudioId(audioId, loop, {
        onProgress: (progress) => {
          if (!loop && progress >= FullProgress && !this._shifter) {
            endCallback && endCallback('end');
            this._isPlaying = false;
          }
        },
        onStop: () => {
          endCallback && endCallback('stop');
        }
      });

      // 淡出
      if (this._fadeOutDuration) {
        const fadeoutStartTime = (duration / playRate - this._fadeOutDuration) * 1000;
        this._fadeOutTimeout = setTimeout(() => {
          this._startFadeOut();
        }, Math.floor(fadeoutStartTime));
      }
    });

    // console.log('playSound0', this._audioId);
  }

  _startFadeOut() {
    if (this._fadeOutDuration && this._audioData) {
      const audioData = this._audioData;
      const audioCtx = AudioUtils.audioContext;
      const { gainNode } = audioData;
      gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0,
        audioCtx.currentTime + this._fadeOutDuration
      );
      // console.log('sound fade out', this._fadeOutDuration, audioCtx.currentTime, this._audioId);
    }
  }

  // 音量大小
  _updateVolume(volume) {
    if (volume !== undefined) {
      this._volume = Math.max(0, Math.min(1, volume));
    }
    if (this._volume !== undefined) {
      AudioUtils.setVolume(this._audioId, this._volume);
      // console.log('playSound1', this._audioId, this._volume);
    }
  }

  // 倍速播放
  _updatePlayRate(rate) {
    if (rate !== undefined) {
      this._playRate = rate < 0 ? 1 : rate;
    }
    if (this._shifter && this._playRate !== null) {
      this._shifter.tempo = this._playRate;
    }
  }

  // 音调高低
  _updatePlayPitchSemitones(pitchSemitones) {
    if (pitchSemitones !== undefined) {
      this._playPitchSemitones = pitchSemitones;
    }
    if (this._shifter && this._playPitchSemitones !== null) {
      this._shifter.pitchSemitones = this._playPitchSemitones;
    }
  }

  //
  _isUseShifter() {
    return this._isShifterChange;
  }

  // 左右平衡
  _updateStereoPan(panValue) {
    if (panValue === 0 && this._panValue === null) {
      return;
    }
    if (panValue !== undefined) {
      this._panValue = MathUtil.clamp(panValue, -1, 1);
    }
    if (this._stereoPanner && this._panValue !== null) {
      const audioCtx = AudioUtils.audioContext;
      this._stereoPanner.pan.setValueAtTime(
        this._panValue,
        audioCtx.currentTime
      );
    }
  }

  // 设置音效
  setSoundEffect(effect, value, isAdditional = false) {
    if (effect === 'detune') {
      this._isShifterChange = true;
      let pitchSemitones = value / 100;
      if (isAdditional) {
        const ori = this._playPitchSemitones ? this._playPitchSemitones : 0;
        pitchSemitones += ori;
      }
      this._updatePlayPitchSemitones(pitchSemitones);
    } else if (effect === 'pan') {
      let panValue = value / 100;
      if (isAdditional) {
        panValue += this._panValue ? this._panValue : 0;
      }
      this._updateStereoPan(panValue);
    } else if (effect === 'speed') {
      this._isShifterChange = true;
      this._updatePlayRate(value);
    } else if (effect === 'fadeIn') {
      this._fadeInDuration = Math.max(0, value);
    } else if (effect === 'fadeOut') {
      this._fadeOutDuration = Math.max(0, value);
    } else if (effect === 'volume') {
      let volume = value / 100;
      if (isAdditional) {
        volume += this._volume;
      }
      this._updateVolume(volume);
    }
  }

  resetEffects() {
    this._updatePlayPitchSemitones(0);
    this._updateStereoPan(0);
    this._updatePlayRate(1);
    this._fadeInDuration = 0;
    this._fadeOutDuration = 0;
    this._isShifterChange = false;
  }

  _doStop() {
    // console.log('sound do stop', this._audioId);
    if (this._shifter) {
      // console.log('sound do stop  this._shifter.disconnect');
      this._shifter.disconnect();
      this._shifter = null;
    }
    if (this._isPlaying) {
      AudioUtils.stop(this._audioId);
    }

    if (this._audioData) {
      const audioData = this._audioData;
      const audioCtx = AudioUtils.audioContext;
      const { gainNode } = audioData;
      gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
      gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    }

    this.resetEffects();

    this._isPlaying = false;
    this._audioData = null;
    this._isStopping = false;
    this._loading = false;
  }

  stop(immediately) {
    if (this._isStopping) {
      return;
    }
    this._isStopping = true;
    if (this._fadeOutTimeout) {
      clearTimeout(this._fadeOutTimeout);
    }
    if (immediately) {
      this._doStop();
      return;
    }

    if (this._fadeOutDuration) {
      this._startFadeOut();
    }
    setTimeout(
      () => {
        this._doStop();
      },
      this._fadeOutDuration ? Math.floor(this._fadeOutDuration * 1000) : 0
    );
  }
}

export default TEAudio;
