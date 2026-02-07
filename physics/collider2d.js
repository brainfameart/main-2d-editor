// physics/collider2d.js

import { Component } from "../ecs/component.js";

export class Collider2D extends Component {
  constructor() {
    super();
    this.isTrigger = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  getAABB(transform) {
    throw new Error("getAABB not implemented");
  }
}

export class BoxCollider2D extends Collider2D {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  getAABB(transform) {
    const pos = transform.getWorldPosition();
    return {
      x: pos.x + this.offsetX - this.width / 2,
      y: pos.y + this.offsetY - this.height / 2,
      w: this.width,
      h: this.height
    };
  }
}

export class CircleCollider2D extends Collider2D {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  getAABB(transform) {
    const pos = transform.getWorldPosition();
    return {
      x: pos.x - this.radius,
      y: pos.y - this.radius,
      w: this.radius * 2,
      h: this.radius * 2
    };
  }
}
