// physics/collisionSystem.js

import { System } from "../ecs/system.js";
import { Transform } from "../components/transform.js";
import { Rigidbody2D } from "./rigidbody2d.js";
import { Collider2D } from "./collider2d.js";
import { Contact } from "./contact.js";
import { CollisionWorld } from "./collisionWorld.js";

export class CollisionSystem extends System {
  constructor() {
    super(-5);
  }

  fixedUpdate(dt) {
    const entities = this.world.registry.getEntitiesWith(
      Transform,
      Collider2D
    );

    const colliders = entities.map(e => ({
      entity: e,
      transform: e.getComponent(Transform),
      collider: e.getComponent(Collider2D),
      rigidbody: e.getComponent(Rigidbody2D),
      aabb: e.getComponent(Collider2D)
        .getAABB(e.getComponent(Transform))
    }));

    for (let i = 0; i < colliders.length; i++) {
      for (let j = i + 1; j < colliders.length; j++) {
        const a = colliders[i];
        const b = colliders[j];

        if (!CollisionWorld.aabbOverlap(a.aabb, b.aabb)) continue;

        const contact = new Contact(
          a.entity,
          b.entity,
          { x: 0, y: -1 },
          1
        );

        // Trigger logic
        if (a.collider.isTrigger || b.collider.isTrigger) {
          this._trigger(a, b, contact);
          continue;
        }

        // Resolution
        this._resolve(a, b, contact);
      }
    }
  }

  _resolve(a, b, contact) {
    if (!a.rigidbody || !b.rigidbody) return;

    a.transform.y -= contact.depth / 2;
    b.transform.y += contact.depth / 2;

    a.rigidbody.velocity.y = 0;
    b.rigidbody.velocity.y = 0;
  }

  _trigger(a, b, contact) {
    const sa = a.entity.getComponent("ScriptComponent");
    const sb = b.entity.getComponent("ScriptComponent");

    if (sa?.script?.onTriggerEnter) sa.script.onTriggerEnter(b.entity);
    if (sb?.script?.onTriggerEnter) sb.script.onTriggerEnter(a.entity);
  }
}
