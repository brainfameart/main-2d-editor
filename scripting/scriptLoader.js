// scripting/scriptLoader.js

export class ScriptLoader {
  constructor() {
    this.cache = new Map();
  }

  async loadScript(path) {
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }

    const module = await import(path);
    if (!module.default) {
      throw new Error(`Script must export default class: ${path}`);
    }

    this.cache.set(path, module.default);
    return module.default;
  }

  async createInstance(path) {
    const ScriptClass = await this.loadScript(path);
    return new ScriptClass();
  }
}

