// assets/spriteImporter.js

export class SpriteImporter {
  constructor(assetManager) {
    this.assetManager = assetManager;
  }

  async importSprite(name, path, options = {}) {
    const image = await this.assetManager.loadImage(name, path);

    return {
      name,
      image,
      width: image.width,
      height: image.height,
      pivotX: options.pivotX ?? 0.5,
      pivotY: options.pivotY ?? 0.5,
      pixelsPerUnit: options.pixelsPerUnit ?? 100
    };
  }
}

