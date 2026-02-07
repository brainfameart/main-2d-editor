// components/sprite.js

import { Component } from "../ecs/component.js";

export class Sprite extends Component {
  constructor(image = null) {
    super();

    this.image = image;

    this.width = 0;
    this.height = 0;

    this.originX = 0.5;
    this.originY = 0.5;

    this.visible = true;
    this.flipX = false;
    this.flipY = false;

    this.layer = "default";
    this.opacity = 1;

    this.tint = null; // future WebGL hook
  }

  setImage(image) {
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw(ctx, camera) {
    if (!this.image || !this.visible) return;

    const transform = this.entity.getComponent(
      this.entity.scene.engine.Transform
    );

    const pos = camera.worldToScreen(
      transform.getWorldPosition().x,
      transform.getWorldPosition().y
    );

    ctx.save();
    ctx.globalAlpha = this.opacity;

    ctx.translate(pos.x, pos.y);
    ctx.rotate(transform.rotation);
    ctx.scale(
      this.flipX ? -transform.scaleX : transform.scaleX,
      this.flipY ? -transform.scaleY : transform.scaleY
    );

    ctx.drawImage(
      this.image,
      -this.width * this.originX,
      -this.height * this.originY
    );

    ctx.restore();
  }
}

