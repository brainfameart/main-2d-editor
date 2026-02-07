// physics/rigidbody2d.js

import { Component } from "../ecs/component.js";

export class Rigidbody2D extends Component {
  constructor() {
    super();

    this.velocity = { x: 0, y: 0 };
    this.force = { x: 0, y: 0 };

    this.mass = 1;
    this.gravityScale = 1;

    this.drag = 0.98;
    this.useGravity = true;
    this.isKinematic = false;
  }

  applyForce(x, y) {
    this.force.x += x;
    this.force.y += y;
  }

  integrate(dt, gravity) {
    if (this.isKinematic) return;

    if (this.useGravity) {
      this.force.y += gravity.y * this.mass * this.gravityScale;
    }

    this.velocity.x += (this.force.x / this.mass) * dt;
    this.velocity.y += (this.force.y / this.mass) * dt;

    this.velocity.x *= this.drag;
    this.velocity.y *= this.drag;

    this.force.x = 0;
    this.force.y = 0;
  }
}

