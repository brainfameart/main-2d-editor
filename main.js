// main.js

import { bootstrap } from "./runtime/bootstrap.js";
import { Scene } from "./runtime/scene.js";

import { EditorUI } from "./editor/editorUI.js";
import { Panel } from "./editor/panelManager.js";
import { Viewport } from "./ui/viewport.js";
import { Inspector } from "./ui/inspector.js";
import { Hierarchy } from "./ui/hierarchy.js";

import { Entity } from "./ecs/entity.js";
import { Transform } from "./components/transform.js";
import { Sprite } from "./components/sprite.js";
import { ScriptComponent } from "./scripting/scriptComponent.js";

// Boot engine
const canvas = document.getElementById("game-canvas");
const engine = bootstrap(canvas);

// Scene
const scene = new Scene("Main Scene");
scene.engine = engine;
engine.world.setScene(scene);

// Editor
const editor = new EditorUI(engine);
const inspector = new Inspector();
const hierarchy = new Hierarchy(scene, inspector);

editor.addPanel(new Panel("Hierarchy", "Hierarchy"), "left");
editor.panels.get("Hierarchy").setContent("");
editor.addPanel(new Panel("Inspector", "Inspector"), "right");

editor.panels.get("Inspector").element.appendChild(inspector.element);
editor.panels.get("Hierarchy").element.appendChild(hierarchy.element);

// Viewport
const renderer = engine.getService("renderer");
const camera = engine.getService("camera");
const viewport = new Viewport(renderer, camera);

document.getElementById("center-view").appendChild(viewport.element);

// Example entity
const player = new Entity("Player");
player.addComponent(new Transform());
player.addComponent(new Sprite());

scene.addEntity(player);
hierarchy.refresh();

// Start engine
engine.start();
