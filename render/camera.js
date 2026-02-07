// render/camera.js

export class Camera {
  constructor(width = 1280, height = 720) {
    this.x = 0;
    this.y = 0;

    this.width = width;
    this.height = height;

    this.zoom = 1;
    this.rotation = 0;

    this.shakeIntensity = 0;
    this.shakeTime = 0;
  }

  worldToScreen(x, y) {
    return {
      x: (x - this.x) * this.zoom + this.width / 2,
      y: (y - this.y) * this.zoom + this.height / 2
    };
  }

  screenToWorld(x, y) {
    return {
      x: (x - this.width / 2) / this.zoom + this.x,
      y: (y - this.height / 2) / this.zoom + this.y
    };
  }

  update(dt) {
    if (this.shakeTime > 0) {
      this.shakeTime -= dt;
      this.x += (Math.random() - 0.5) * this.shakeIntensity;
      this.y += (Math.random() - 0.5) * this.shakeIntensity;
    }
  }

  shake(intensity = 5, duration = 0.3) {
    this.shakeIntensity = intensity;
    this.shakeTime = duration;
  }
}

