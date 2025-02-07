
import { EDITOR_CALL } from '../../constant/index';
import EventUtil from '../../../utils/EventUtil';

const AudioEngine = require('../scratch_audio');

class SimScratchRunTime {
  constructor() {
    this.audioEngine = new AudioEngine();
    this.actor = null;
    this.tempo = 60;

    EventUtil.on(EDITOR_CALL.PLAY, () => {
      this.tempo = 60;
    });
  }

  setEditingTarget(actor) {
    this.actor = actor;
  }

  getEditingTarget() {
    return this.actor;
  }

  getTargetForStage() {
    return { tempo: this.tempo };
  }

  setStageTempo(tempo) {
    this.tempo = tempo;
  }

  getStageTempo() {
    return this.tempo;
  }

  changeStageTempo(value) {
    this.tempo += value;
  }
}

const SimScratchRunTimeInstance = new SimScratchRunTime();
export default SimScratchRunTimeInstance;
