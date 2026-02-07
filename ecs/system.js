// ecs/system.js

export class System {
  constructor(priority = 0) {
    this.priority = priority;
    this.engine = null;
    this.world = null;
  }

  attach(engine) {
    this.engine = engine;
    this.world = engine.world;
    if (this.onAttach) this.onAttach();
  }

  detach() {
    if (this.onDetach) this.onDetach();
    this.engine = null;
    this.world = null;
  }

  onAttach() {}
  onDetach() {}

  fixedUpdate(dt) {}
  update(dt) {}
}

