// runtime/bootstrap.js

import { Engine } from "../engine/engine.js";
import { World } from "./world.js";
import { Runtime } from "./runtime.js";

import { Renderer } from "../render/renderer.js";
import { Camera } from "../render/camera.js";

import { InputManager } from "../input/inputManager.js";
import { AssetManager } from "../assets/assetManager.js";
import { SpriteImporter } from "../assets/spriteImporter.js";
import { AnimationManager } from "../animation/animationManager.js";

import { PhysicsSystem } from "../physics/physicsSystem.js";
import { ScriptSystem } from "../scripting/scriptSystem.js";

export function bootstrap(canvas) {
  const engine = new Engine();
  const world = new World();
  const runtime = new Runtime(world);

  engine.world = world;
  engine.runtime = runtime;

  // Core services
  const renderer = new Renderer({ canvas });
  const camera = new Camera(renderer.width, renderer.height);
  const input = new InputManager(canvas);
  const assets = new AssetManager();
  const spriteImporter = new SpriteImporter(assets);
  const animationManager = new AnimationManager();

  engine.registerService("renderer", renderer);
  engine.registerService("camera", camera);
  engine.registerService("input", input);
  engine.registerService("assets", assets);
  engine.registerService("spriteImporter", spriteImporter);
  engine.registerService("animationManager", animationManager);

  // Systems
  engine.registerSystem(new PhysicsSystem());
  engine.registerSystem(new ScriptSystem());

  engine.initialize();

  return engine;
}
