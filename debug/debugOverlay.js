// debug/debugOverlay.js

export class DebugOverlay {
  constructor(engine) {
    this.engine = engine;

    this.element = document.createElement("div");
    this.element.id = "debug-overlay";

    this.fps = 0;
    this.lastTime = performance.now();
    this.frames = 0;

    document.body.appendChild(this.element);
  }

  update() {
    this.frames++;
    const now = performance.now();

    if (now - this.lastTime >= 1000) {
      this.fps = this.frames;
      this.frames = 0;
      this.lastTime = now;
    }

    this.element.innerHTML = `
      FPS: ${this.fps}<br/>
      Entities: ${this.engine.world?.activeScene?.entities.size || 0}<br/>
      Systems: ${this.engine.systems.length}
    `;
  }
}
