// runtime/scene.js

import { Registry } from "../ecs/registry.js";

export class Scene {
  constructor(name = "Scene") {
    this.name = name;

    this.engine = null;
    this.registry = new Registry();

    this.entities = new Set();
    this.systems = [];

    this.started = false;
  }

  onEnter() {
    this.started = true;
    for (const system of this.systems) {
      if (system.onSceneEnter) system.onSceneEnter(this);
    }
  }

  onExit() {
    for (const system of this.systems) {
      if (system.onSceneExit) system.onSceneExit(this);
    }
    this.started = false;
  }

  addEntity(entity) {
    entity.scene = this;
    this.entities.add(entity);
    this.registry.addEntity(entity);

    for (const component of entity.components.values()) {
      this.registry.addComponent(entity, component);
    }

    return entity;
  }

  removeEntity(entity) {
    this.entities.delete(entity);
    this.registry.removeEntity(entity);
    entity.scene = null;
  }

  addSystem(system) {
    system.world = this;
    this.systems.push(system);
    this.systems.sort((a, b) => a.priority - b.priority);
  }

  fixedUpdate(dt) {
    for (const system of this.systems) {
      if (system.fixedUpdate) {
        system.fixedUpdate(dt);
      }
    }
  }

  update(dt) {
    for (const system of this.systems) {
      if (system.update) {
        system.update(dt);
      }
    }
  }

  render(dt) {
    for (const system of this.systems) {
      if (system.render) {
        system.render(dt);
      }
    }
  }
}

