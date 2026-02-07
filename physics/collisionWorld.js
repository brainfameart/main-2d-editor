// physics/collisionWorld.js

export class CollisionWorld {
  static aabbOverlap(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  static raycast(origin, dir, maxDist, colliders) {
    let closest = null;
    let minDist = maxDist;

    for (const c of colliders) {
      const box = c.aabb;
      const hit = this._rayAABB(origin, dir, box);
      if (hit && hit.distance < minDist) {
        minDist = hit.distance;
        closest = hit;
      }
    }

    return closest;
  }

  static _rayAABB(origin, dir, box) {
    const t1 = (box.x - origin.x) / dir.x;
    const t2 = (box.x + box.w - origin.x) / dir.x;
    const t3 = (box.y - origin.y) / dir.y;
    const t4 = (box.y + box.h - origin.y) / dir.y;

    const tmin = Math.max(
      Math.min(t1, t2),
      Math.min(t3, t4)
    );
    const tmax = Math.min(
      Math.max(t1, t2),
      Math.max(t3, t4)
    );

    if (tmax < 0 || tmin > tmax) return null;

    return {
      distance: tmin,
      point: {
        x: origin.x + dir.x * tmin,
        y: origin.y + dir.y * tmin
      }
    };
  }
}
