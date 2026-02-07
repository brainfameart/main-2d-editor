// scripting/scriptSystem.js

import { System } from "../ecs/system.js";
import { ScriptComponent } from "./scriptComponent.js";

export class ScriptSystem extends System {
  constructor() {
    super(0); // middle of pipeline
  }

  fixedUpdate(dt) {
    const entities = this.world.registry.getEntitiesWith(ScriptComponent);

    for (const entity of entities) {
      const script = entity.getComponent(ScriptComponent);
      if (script && script.fixedUpdate) {
        script.fixedUpdate(dt);
      }
    }
  }

  update(dt) {
    const entities = this.world.registry.getEntitiesWith(ScriptComponent);

    for (const entity of entities) {
      const script = entity.getComponent(ScriptComponent);
      if (script && script.update) {
        script.update(dt);
      }
    }
  }
}

