// ecs/entity.js

let ENTITY_ID = 0;

export class Entity {
  constructor(name = "Entity") {
    this.id = ++ENTITY_ID;
    this.name = name;

    this.components = new Map();
    this.active = true;
    this.scene = null;
  }

  addComponent(component) {
    const type = component.constructor;

    if (this.components.has(type)) {
      throw new Error(`Component already exists on entity: ${type.name}`);
    }

    component.entity = this;
    this.components.set(type, component);

    if (component.onAttach) component.onAttach();
    return component;
  }

  getComponent(type) {
    return this.components.get(type);
  }

  removeComponent(type) {
    const component = this.components.get(type);
    if (!component) return;

    if (component.onDetach) component.onDetach();
    component.entity = null;

    this.components.delete(type);
  }

  hasComponent(type) {
    return this.components.has(type);
  }

  destroy() {
    for (const component of this.components.values()) {
      if (component.onDetach) component.onDetach();
    }
    this.components.clear();
    this.active = false;

    if (this.scene) {
      this.scene.removeEntity(this);
    }
  }
}

