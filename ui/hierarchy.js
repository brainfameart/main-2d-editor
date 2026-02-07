// ui/hierarchy.js

export class Hierarchy {
  constructor(scene, inspector) {
    this.scene = scene;
    this.inspector = inspector;

    this.element = document.createElement("div");
    this.element.className = "hierarchy";

    this.refresh();
  }

  refresh() {
    this.element.innerHTML = "<h3>Scene</h3>";

    for (const entity of this.scene.entities) {
      const item = document.createElement("div");
      item.className = "hierarchy-item";
      item.innerText = entity.name;

      item.onclick = () => {
        this.inspector.inspect(entity);
      };

      this.element.appendChild(item);
    }
  }
}
