export type { ServerPlayerInfo } from "config";

import { ServerPlayerInfo } from "config";

import * as ECS from "ecs";
import * as Core from "game-core";
import * as GameSystem from "game-systems";
import { createBackground, createOtherPlayer, createPlayer } from "models";

interface InitOptions {
  container: HTMLElement;
  renderWidth: number;
  renderHeight: number;
  serverPlayerInfo: ServerPlayerInfo;
}

export class MPGame {
  private world: ECS.World;

  constructor() {
    // create world
    this.world = new ECS.World();
  }

  public async init(options: InitOptions): Promise<void> {
    const { container, renderWidth, renderHeight, serverPlayerInfo } = options;

    // TODO: pass game id
    await Core.WebSocketManger.instance.init("");

    // init core WS handler
    this.initWSHandler(serverPlayerInfo);

    // init canvas
    Core.CanvasManger.instance.init(container, renderWidth, renderHeight);

    // load game assets
    await Core.AssetManager.instance.init();

    // then init game systems
    this.initGameSystems(options);

    // then init world
    this.initBackground();

    // then init player
    this.initPlayer(serverPlayerInfo);

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

  private initPlayer(serverPlayerInfo: ServerPlayerInfo) {
    const playerEntities = createPlayer(serverPlayerInfo);

    for (const entity of playerEntities) {
      this.world.addEntity(entity);
    }

    Core.WebSocketManger.instance.send({
      type: "player.connect",
      data: serverPlayerInfo,
    });
  }

  private initBackground() {
    const backgroundEntity = createBackground();
    this.world.addEntity(backgroundEntity);
  }

  private getCameraInitPosition({ renderWidth, renderHeight, serverPlayerInfo }: InitOptions) {
    return [
      serverPlayerInfo.position.x - renderWidth / 2, // center of viewport
      serverPlayerInfo.position.y - renderHeight / 2,
    ];
  }

  private initWSHandler(serverPlayerInfo: ServerPlayerInfo) {
    // close WS connection on refresh/close window
    window.addEventListener("beforeunload", () => {
      Core.WebSocketManger.instance.send({
        type: "player.disconnect",
        data: {
          id: serverPlayerInfo.id,
        },
      });
    });

    /**
     * ----------- subscribe to server messages -----------
     */
    Core.WebSocketManger.instance.subscribe("player.connected", data => {
      // TODO: fix it and use mapped types
      const newPlayerData = data as ServerPlayerInfo;
      // filter out current player id because this message is broadcasted to every player
      // if not current player => another player => add to the world
      if (newPlayerData.id !== serverPlayerInfo.id) {
        const otherPlayerEntities = createOtherPlayer(newPlayerData);
        for (const entity of otherPlayerEntities) {
          this.world.addEntity(entity);
        }
      }
    });

    Core.WebSocketManger.instance.subscribe("player.disconnected", _data => {
      // TODO: remove player from the world state
      // this.world.removeEntity()
    });
  }
}
