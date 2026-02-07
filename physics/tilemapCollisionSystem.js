// physics/tilemapCollisionSystem.js

import { System } from "../ecs/system.js";
import { Transform } from "../components/transform.js";
import { Rigidbody2D } from "./rigidbody2d.js";

export class TilemapCollisionSystem extends System {
  constructor(tilemap) {
    super(-6);
    this.tilemap = tilemap;
  }

  fixedUpdate(dt) {
    const entities = this.world.registry.getEntitiesWith(
      Transform,
      Rigidbody2D
    );

    for (const e of entities) {
      const t = e.getComponent(Transform);
      const rb = e.getComponent(Rigidbody2D);

      if (this.tilemap.isSolid(t.x, t.y)) {
        rb.velocity.y = 0;
        t.y = Math.floor(t.y / this.tilemap.tileSize) *
              this.tilemap.tileSize;
      }
    }
  }
}
