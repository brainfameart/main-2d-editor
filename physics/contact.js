// physics/contact.js

export class Contact {
  constructor(a, b, normal, depth) {
    this.a = a;
    this.b = b;
    this.normal = normal;
    this.depth = depth;
  }
}
