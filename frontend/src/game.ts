import { PlayerType } from "config";

import * as ECS from "ecs";
import * as Core from "game-core";
import * as GameSystem from "game-systems";
import { createBackground, createPlayer } from "models";

interface InitOptions {
  container: HTMLElement;
  renderWidth: number;
  renderHeight: number;
  playerType: PlayerType;
}

export class MPGame {
  private world: ECS.World;

  constructor() {
    // create world
    this.world = new ECS.World();
  }

  public async init(options: InitOptions): Promise<void> {
    const { container, renderWidth, renderHeight, playerType } = options;

    // TODO: pass game id
    await Core.WebSocketManger.instance.init("");

    // init canvas
    Core.CanvasManger.instance.init(container, renderWidth, renderHeight);

    // load game assets
    await Core.AssetManager.instance.init();

    // then init game systems
    this.initGameSystems(options);

    // then init world
    this.initBackground();

    // then init player
    this.initPlayer(playerType);

    // finally start game when everything is ready
    this.play(0);
  }

  private play(tick: number) {
    this.world.update(tick);

    requestAnimationFrame(timestamp => {
      this.play(timestamp);
    });
  }

  private initGameSystems(options: InitOptions) {
    // WS message handler
    this.world.registerSystem(new GameSystem.ServerSync());
    // key + mouse inputs
    this.world.registerSystem(new GameSystem.PlayerController());
    // relative entities position calculation
    this.world.registerSystem(new GameSystem.ParentSync());
    // viewport relative position calculation
    const [cameraInitX, cameraInitY] = this.getCameraInitPosition(options);
    this.world.registerSystem(new GameSystem.Camera(cameraInitX, cameraInitY));
    // canvas render
    this.world.registerSystem(new GameSystem.Render());
  }

  private initPlayer(playerType: PlayerType) {
    const playerEntities = createPlayer(playerType, 300, 300, 0);

    for (const entity of playerEntities) {
      this.world.addEntity(entity);
    }
  }

  private initBackground() {
    const backgroundEntity = createBackground();
    this.world.addEntity(backgroundEntity);
  }

  private getCameraInitPosition({ renderWidth, renderHeight }: InitOptions) {
    // TODO: get this data from backend
    const playerInitPosX = 300;
    const playerInitPosY = 300;

    const centerWidth = renderWidth / 2;
    const centerHeight = renderHeight / 2;

    return [playerInitPosX - centerWidth, playerInitPosY - centerHeight];
  }
}
