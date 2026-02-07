// components/animator.js

import { Component } from "../ecs/component.js";
import { Sprite } from "./sprite.js";

export class Animator extends Component {
  constructor(animationManager) {
    super();

    this.manager = animationManager;
    this.state = this.manager.createStateMachine();
  }

  play(name) {
    this.manager.play(this.state, name);
  }

  stop() {
    this.manager.stop(this.state);
  }

  update(dt) {
    this.manager.update(this.state, dt);

    if (!this.state.current) return;

    const sprite = this.entity.getComponent(Sprite);
    if (!sprite) return;

    const frame = this.state.current.getFrame(this.state.time);
    if (frame) {
      sprite.setImage(frame);
    }
  }
}

