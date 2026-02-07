// runtime/world.js

export class World {
  constructor() {
    this.activeScene = null;
  }

  setScene(scene) {
    if (this.activeScene && this.activeScene.onExit) {
      this.activeScene.onExit();
    }

    this.activeScene = scene;

    if (this.activeScene.onEnter) {
      this.activeScene.onEnter();
    }
  }

  fixedUpdate(dt) {
    if (!this.activeScene) return;
    this.activeScene.fixedUpdate(dt);
  }

  update(dt) {
    if (!this.activeScene) return;
    this.activeScene.update(dt);
  }

  render(dt) {
    if (!this.activeScene) return;
    this.activeScene.render(dt);
  }
}

