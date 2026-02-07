// editor/panelManager.js

export class Panel {
  constructor(id, title) {
    this.id = id;
    this.title = title;

    this.element = document.createElement("div");
    this.element.className = "panel";

    this.header = document.createElement("div");
    this.header.className = "panel-header";
    this.header.innerText = title;

    this.body = document.createElement("div");
    this.body.className = "panel-body";

    this.element.appendChild(this.header);
    this.element.appendChild(this.body);

    this.collapsed = false;
    this._bind();
  }

  _bind() {
    this.header.onclick = () => {
      this.collapsed = !this.collapsed;
      this.body.style.display = this.collapsed ? "none" : "block";
    };
  }

  setContent(html) {
    this.body.innerHTML = html;
  }
}
