import ScratchMusicInstance from '../module/musics/scratch3_music/index';
import SimScratchRunTimeInstance from '../module/musics/scratch3_music/runtime';
import TEAudio from './TEAudio';

// let ScratchMusicInstance = null;
// let loadCb = [];

// function loadScratchMusic() {
//   if (!ScratchMusicInstance) {
//     import(/* webpackChunkName: "scratch3_music", webpackPreload: true */ '../module/musics/scratch3_music/index').then((module) => {
//       ScratchMusicInstance = module.default;
//       if (loadCb.length > 0) {
//         loadCb.forEach((cb) => {
//           if (typeof cb === 'function') {
//             cb(ScratchMusicInstance);
//           }
//         });
//         loadCb = [];
//       }
//     });
//   }
// }

// loadScratchMusic();

const STATE_KEY = 'Scratch.music';

class MusicUtil {
  constructor() {
    // 音频
    this._name2Audio = {}; // 音频对象
    this._name2AudioSoundEffect = {}; // 音频音效

    this._customData = {};
    this._customData[STATE_KEY] = {};

    this._musicUtil = {};
    this._musicUtil.runtime = SimScratchRunTimeInstance;
    this._musicUtil.target = this;
    this._musicUtil.stackFrame = {};
  }

  // 播放音乐
  playSound = (name, endCallback) => {
    const audioData = AudioUtil.getSceneAudioData(name);
    if (!audioData) return false;

    let audio = null;
    if (!this._name2Audio[name]) {
      audio = new TEAudio();
      this._name2Audio[name] = audio;
    } else {
      audio = this._name2Audio[name];
    }

    if (!audio) return false;

    audio.play(audioData.url, false, endCallback);
    const effects = this._name2AudioSoundEffect[name];
    if (effects !== undefined) {
      effects.forEach((item) => {
        audio.setSoundEffect(item.effect, item.value, item.isAdditional);
      });
    }

    return true;
  }

  // 播放音乐直到结束
  playSoundUntilFinish = async (name) => {
    if (this.codeSuspend) {
      Promise.reject(0);
      return;
    }
    return new Promise((resolve, reject) => {
      const playStarted = this.playSound(name, () => {
        console.log('sound endCallback resolve');
        resolve();
      });

      if (!playStarted) {
        resolve();
      }
    });
  }

  getCustomState = key => this._customData[key]

  playNoteForBeats(note, beats) {
    const args = {
      NOTE: note,
      BEATS: beats
    };
    this._lastMusicNoteDuration = ScratchMusicInstance && ScratchMusicInstance.playNoteForBeats(
      args,
      this._musicUtil
    );
  }
}

window.musicUtil = new MusicUtil();