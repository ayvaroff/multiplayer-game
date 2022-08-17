import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { WebSocketManger } from "game-core";

export class ServerSync extends ECS.System {
  public requiredComponents: Set<Function> = new Set([GameComponents.Position, GameComponents.GameObject]);

  private lastTick = 0;
  private latestServerState: {} | null = null;

  constructor() {
    super();

    // TODO: handle with subscription patter
    WebSocketManger.instance.subscribe("world.update", data => {
      this.latestServerState = data as {};
    });
  }

  public update(entities: Set<ECS.Entity>, tick: number): void {
    // send each current state at least every 50ms
    // to reduce amount of processed WS message in BE and other clients
    // if (tick - this.lastTick < 50) {
    // test every 5 sec
    if (tick - this.lastTick < 1000) {
      return;
    }
    this.lastTick = tick;

    // TODO: send WS message about current local state
    // for (const entity of entities) {
    //   // send player position
    //   if (entity.hasComponent(GameComponents.PlayerControls)) {
    //     const playerPosition = entity.getComponent(GameComponents.Position);

    //     this.websocket.send(
    //       JSON.stringify({
    //         type: "player.connect",
    //         data: {
    //           playerId: entity.id,
    //           location: playerPosition,
    //         },
    //       } as GameMessage),
    //     );
    //   }
    // }

    // - state update
  }
}
