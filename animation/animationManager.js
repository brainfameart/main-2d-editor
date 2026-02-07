// animation/animationManager.js

export class AnimationManager {
  constructor() {
    this.clips = new Map();
  }

  registerClip(clip) {
    if (this.clips.has(clip.name)) {
      throw new Error(`Animation already exists: ${clip.name}`);
    }
    this.clips.set(clip.name, clip);
  }

  getClip(name) {
    return this.clips.get(name);
  }

  createStateMachine() {
    return {
      current: null,
      time: 0,
      speed: 1,
      playing: false
    };
  }

  play(state, clipName) {
    const clip = this.getClip(clipName);
    if (!clip) throw new Error(`Animation not found: ${clipName}`);

    state.current = clip;
    state.time = 0;
    state.playing = true;
  }

  stop(state) {
    state.playing = false;
    state.time = 0;
  }

  update(state, dt) {
    if (!state.playing || !state.current) return;

    state.time += dt * state.speed;

    if (!state.current.loop && state.time >= state.current.duration) {
      state.playing = false;
    }
  }
}

