// animation/animationClip.js

export class AnimationClip {
  constructor({
    name,
    frames = [],
    fps = 12,
    loop = true,
    events = {}
  }) {
    this.name = name;
    this.frames = frames;
    this.fps = fps;
    this.loop = loop;
    this.events = events;

    this.duration = frames.length / fps;
  }

  getFrame(time) {
    if (this.frames.length === 0) return null;

    let frameIndex = Math.floor(time * this.fps);

    if (this.loop) {
      frameIndex = frameIndex % this.frames.length;
    } else {
      frameIndex = Math.min(frameIndex, this.frames.length - 1);
    }

    return this.frames[frameIndex];
  }

  hasEvent(frameIndex) {
    return this.events[frameIndex] !== undefined;
  }

  getEvent(frameIndex) {
    return this.events[frameIndex];
  }
}

