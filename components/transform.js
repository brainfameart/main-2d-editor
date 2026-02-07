// components/transform.js

import { Component } from "../ecs/component.js";

export class Transform extends Component {
  constructor() {
    super();

    this.x = 0;
    this.y = 0;

    this.rotation = 0;

    this.scaleX = 1;
    this.scaleY = 1;

    this.parent = null;
    this.children = [];
  }

  setParent(parent) {
    if (this.parent) {
      const i = this.parent.children.indexOf(this);
      if (i !== -1) this.parent.children.splice(i, 1);
    }

    this.parent = parent;

    if (parent) {
      parent.children.push(this);
    }
  }

  getWorldPosition() {
    if (!this.parent) {
      return { x: this.x, y: this.y };
    }

    const p = this.parent.getWorldPosition();
    return {
      x: p.x + this.x,
      y: p.y + this.y
    };
  }

  translate(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

