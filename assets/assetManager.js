// assets/assetManager.js

export class AssetManager {
  constructor() {
    this.images = new Map();
    this.audio = new Map();
    this.data = new Map();

    this.loadingCount = 0;
  }

  isLoading() {
    return this.loadingCount > 0;
  }

  loadImage(name, src) {
    if (this.images.has(name)) {
      return Promise.resolve(this.images.get(name));
    }

    this.loadingCount++;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.images.set(name, img);
        this.loadingCount--;
        resolve(img);
      };
      img.onerror = (e) => {
        this.loadingCount--;
        reject(e);
      };
      img.src = src;
    });
  }

  getImage(name) {
    return this.images.get(name);
  }

  unloadImage(name) {
    this.images.delete(name);
  }

  clear() {
    this.images.clear();
    this.audio.clear();
    this.data.clear();
  }
}

