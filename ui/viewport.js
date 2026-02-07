// ui/viewport.js

export class Viewport {
  constructor(renderer, camera) {
    this.renderer = renderer;
    this.camera = camera;

    this.element = document.createElement("div");
    this.element.className = "viewport";

    this.canvas = renderer.canvas;
    this.element.appendChild(this.canvas);

    this._bindResize();
  }

  _bindResize() {
    window.addEventListener("resize", () => {
      const rect = this.element.getBoundingClientRect();
      this.renderer.resize(rect.width, rect.height);
      this.camera.width = rect.width;
      this.camera.height = rect.height;
    });
  }

  render(scene) {
    if (!scene) return;
    this.renderer.render(this.camera);
  }
}
