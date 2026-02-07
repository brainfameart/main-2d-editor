// ecs/query.js

export class Query {
  constructor(registry, componentTypes) {
    this.registry = registry;
    this.componentTypes = componentTypes;
    this.cache = [];
    this.dirty = true;
  }

  markDirty() {
    this.dirty = true;
  }

  evaluate() {
    if (!this.dirty) return this.cache;

    this.cache = this.registry.getEntitiesWith(
      ...this.componentTypes
    );

    this.dirty = false;
    return this.cache;
  }

  forEach(callback) {
    const entities = this.evaluate();
    for (const entity of entities) {
      callback(entity);
    }
  }
}

