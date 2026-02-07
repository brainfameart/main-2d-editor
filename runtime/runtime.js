// runtime/runtime.js

export class Runtime {
  constructor(world) {
    this.world = world;

    this.running = false;
    this.lastTime = 0;
    this.accumulator = 0;

    this.fixedDelta = 1 / 60;
    this.maxDelta = 0.25;
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    this.running = false;
  }

  loop(time) {
    if (!this.running) return;

    let delta = (time - this.lastTime) / 1000;
    this.lastTime = time;

    if (delta > this.maxDelta) delta = this.maxDelta;

    this.accumulator += delta;

    while (this.accumulator >= this.fixedDelta) {
      this.world.fixedUpdate(this.fixedDelta);
      this.accumulator -= this.fixedDelta;
    }

    this.world.update(delta);
    this.world.render(delta);

    requestAnimationFrame(this.loop.bind(this));
  }
}

