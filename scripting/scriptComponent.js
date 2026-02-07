// scripting/scriptComponent.js

import { Component } from "../ecs/component.js";

export class ScriptComponent extends Component {
  constructor(scriptInstance) {
    super();

    this.script = scriptInstance;
    this.enabled = true;

    // Inject engine context
    this.script.entity = null;
    this.script.transform = null;
    this.script.engine = null;
    this.script.scene = null;
  }

  onAttach() {
    this.script.entity = this.entity;
    this.script.transform = this.entity.getComponent(
      this.entity.scene.engine.Transform
    );
    this.script.engine = this.entity.scene.engine;
    this.script.scene = this.entity.scene;

    if (this.script.start) {
      this.script.start();
    }
  }

  onDetach() {
    if (this.script.onDestroy) {
      this.script.onDestroy();
    }
  }

  update(dt) {
    if (!this.enabled) return;
    if (this.script.update) {
      this.script.update(dt);
    }
  }

  fixedUpdate(dt) {
    if (!this.enabled) return;
    if (this.script.fixedUpdate) {
      this.script.fixedUpdate(dt);
    }
  }
}

