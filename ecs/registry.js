// ecs/registry.js

export class Registry {
  constructor() {
    this.entities = new Set();
    this.components = new Map(); // ComponentType -> Set<Entity>
  }

  addEntity(entity) {
    this.entities.add(entity);
  }

  removeEntity(entity) {
    this.entities.delete(entity);

    for (const set of this.components.values()) {
      set.delete(entity);
    }
  }

  registerComponent(componentType) {
    if (!this.components.has(componentType)) {
      this.components.set(componentType, new Set());
    }
  }

  addComponent(entity, component) {
    const type = component.constructor;

    if (!this.components.has(type)) {
      this.registerComponent(type);
    }

    this.components.get(type).add(entity);
  }

  removeComponent(entity, componentType) {
    const set = this.components.get(componentType);
    if (!set) return;
    set.delete(entity);
  }

  getEntitiesWith(...componentTypes) {
    if (componentTypes.length === 0) return [];

    const firstSet = this.components.get(componentTypes[0]);
    if (!firstSet) return [];

    const result = [];

    for (const entity of firstSet) {
      let valid = true;
      for (let i = 1; i < componentTypes.length; i++) {
        const set = this.components.get(componentTypes[i]);
        if (!set || !set.has(entity)) {
          valid = false;
          break;
        }
      }
      if (valid) result.push(entity);
    }

    return result;
  }

  clear() {
    this.entities.clear();
    this.components.clear();
  }
}

