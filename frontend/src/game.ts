import { PlayerType } from "config";

import * as ECS from "ecs";
import { AssetManager, CanvasManger } from "game-core";
import * as GameSystem from "game-systems";
import { createPlayer } from "models";

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

  public async init({ container, renderWidth, renderHeight, playerType }: InitOptions): Promise<void> {
    // init canvas
    CanvasManger.instance.init(container, renderWidth, renderHeight);

    // load game assets
    await AssetManager.instance.init();

    // then init game systems
    this.initGameSystems();

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

  private initGameSystems() {
    // WS message handler
    this.world.registerSystem(new GameSystem.WSConnection());
    // key + mouse inputs
    this.world.registerSystem(new GameSystem.InputsController());
    // relative entities position calculation
    this.world.registerSystem(new GameSystem.ParentSync());
    // canvas render
    this.world.registerSystem(new GameSystem.Render());
  }

  private initPlayer(playerType: PlayerType) {
    const playerEntities = createPlayer(playerType, 300, 300, 0);

    for (const entity of playerEntities) {
      this.world.addEntity(entity);
    }
  }
}
