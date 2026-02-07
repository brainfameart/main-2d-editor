// editor/editorUI.js

export class EditorUI {
  constructor(engine) {
    this.engine = engine;
    this.root = document.getElementById("editor-root");

    this.menus = new Map();
    this.panels = new Map();

    this._buildBaseLayout();
  }

  _buildBaseLayout() {
    this.root.innerHTML = `
      <div id="menu-bar"></div>
      <div id="editor-body">
        <div id="left-dock"></div>
        <div id="center-view"></div>
        <div id="right-dock"></div>
      </div>
      <div id="status-bar"></div>
    `;
  }

  registerMenu(name, actions) {
    this.menus.set(name, actions);
    this._renderMenus();
  }

  _renderMenus() {
    const bar = document.getElementById("menu-bar");
    bar.innerHTML = "";

    for (const [name, actions] of this.menus.entries()) {
      const menu = document.createElement("div");
      menu.className = "menu";

      menu.innerText = name;
      menu.onclick = () => {
        actions.forEach(a => a());
      };

      bar.appendChild(menu);
    }
  }

  addPanel(panel, dock = "left") {
    const container = document.getElementById(`${dock}-dock`);
    container.appendChild(panel.element);
    this.panels.set(panel.id, panel);
  }
}

