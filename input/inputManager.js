// input/inputManager.js

export class InputManager {
  constructor(target = window) {
    this.target = target;

    this.keys = new Map();
    this.mouse = {
      x: 0,
      y: 0,
      buttons: new Map(),
      wheel: 0
    };

    this._bindEvents();
  }

  _bindEvents() {
    this.target.addEventListener("keydown", e => {
      this.keys.set(e.code, true);
    });

    this.target.addEventListener("keyup", e => {
      this.keys.set(e.code, false);
    });

    this.target.addEventListener("mousedown", e => {
      this.mouse.buttons.set(e.button, true);
    });

    this.target.addEventListener("mouseup", e => {
      this.mouse.buttons.set(e.button, false);
    });

    this.target.addEventListener("mousemove", e => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.target.addEventListener("wheel", e => {
      this.mouse.wheel = e.deltaY;
    });
  }

  isKeyDown(code) {
    return this.keys.get(code) === true;
  }

  isMouseDown(button = 0) {
    return this.mouse.buttons.get(button) === true;
  }

  resetFrame() {
    this.mouse.wheel = 0;
  }
}

