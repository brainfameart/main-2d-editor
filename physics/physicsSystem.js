// physics/physicsSystem.js

import { System } from "../ecs/system.js";
import { Rigidbody2D } from "./rigidbody2d.js";
import { Transform } from "../components/transform.js";

export class PhysicsSystem extends System {
  constructor() {
    super(-10); // run early
    this.gravity = { x: 0, y: 980 };
  }

  fixedUpdate(dt) {
    const entities = this.world.registry.getEntitiesWith(
      Rigidbody2D,
      Transform
    );

    for (const entity of entities) {
      const rb = entity.getComponent(Rigidbody2D);
      const transform = entity.getComponent(Transform);

      rb.integrate(dt, this.gravity);

      transform.x += rb.velocity.x * dt;
      transform.y += rb.velocity.y * dt;
    }
  }
}

