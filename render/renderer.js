// render/renderer.js

export class Renderer {
  constructor(options = {}) {
    this.canvas = options.canvas || document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d", { alpha: false });

    this.width = options.width || 1280;
    this.height = options.height || 720;

    this.clearColor = options.clearColor || "#111111";
    this.pixelRatio = window.devicePixelRatio || 1;

    this.layers = new Map();
    this.sortDirty = true;

    this.resize(this.width, this.height);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    this.canvas.width = width * this.pixelRatio;
    this.canvas.height = height * this.pixelRatio;

    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";

    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
  }

  registerLayer(name, zIndex = 0) {
    if (this.layers.has(name)) return;

    this.layers.set(name, {
      name,
      zIndex,
      drawables: []
    });

    this.sortDirty = true;
  }

  addDrawable(layerName, drawable) {
    const layer = this.layers.get(layerName);
    if (!layer) {
      throw new Error(`Render layer not found: ${layerName}`);
    }
    layer.drawables.push(drawable);
  }

  removeDrawable(layerName, drawable) {
    const layer = this.layers.get(layerName);
    if (!layer) return;

    const i = layer.drawables.indexOf(drawable);
    if (i !== -1) layer.drawables.splice(i, 1);
  }

  clear() {
    this.ctx.fillStyle = this.clearColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  sortLayers() {
    if (!this.sortDirty) return;
    this.sortedLayers = [...this.layers.values()]
      .sort((a, b) => a.zIndex - b.zIndex);
    this.sortDirty = false;
  }

  render(camera) {
    this.clear();
    this.sortLayers();

    for (const layer of this.sortedLayers) {
      for (const drawable of layer.drawables) {
        if (!drawable.visible) continue;
        drawable.draw(this.ctx, camera);
      }
    }
  }
}

