// ecs/component.js

export class Component {
  constructor() {
    this.entity = null;
  }

  get scene() {
    return this.entity?.scene || null;
  }

  get engine() {
    return this.scene?.engine || null;
  }

  onAttach() {}
  onDetach() {}
}

