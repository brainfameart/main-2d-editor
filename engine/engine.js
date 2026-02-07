// engine/engine.js

export class Engine {
  constructor() {
    this.runtime = null;
    this.world = null;

    this.systems = [];
    this.services = new Map();

    this.isRunning = false;
  }

  registerService(name, service) {
    if (this.services.has(name)) {
      throw new Error(`Service already registered: ${name}`);
    }
    this.services.set(name, service);
  }

  getService(name) {
    return this.services.get(name);
  }

  registerSystem(system) {
    this.systems.push(system);
    system.engine = this;
  }

  initialize() {
    for (const system of this.systems) {
      if (system.initialize) {
        system.initialize();
      }
    }
  }

  start() {
    if (!this.runtime) {
      throw new Error("Runtime not attached to engine");
    }
    this.isRunning = true;
    this.runtime.start();
  }

  stop() {
    this.isRunning = false;
    if (this.runtime) {
      this.runtime.stop();
    }
  }
}

