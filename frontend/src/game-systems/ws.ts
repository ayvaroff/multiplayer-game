import { config } from "config";

import * as ECS from "ecs";
import * as GameComponents from "game-components";

export class WSConnection extends ECS.System {
  public requiredComponents: Set<Function> = new Set([GameComponents.Position, GameComponents.GameObject]);

  private websocket: WebSocket;
  private lastTick = 0;

  constructor() {
    super();

    this.websocket = new WebSocket(config.wsServerHost);

    // close WS connection on refresh/close window
    window.addEventListener("beforeunload", () => {
      this.websocket.close();
    });
  }

  public update(_entities: Set<ECS.Entity>, tick: number): void {
    // send each current state at least every 100ms
    // to reduce amount of processed WS message in BE and other clients
    if (tick - this.lastTick < 100) {
      return;
    }
    this.lastTick = tick;
    // TODO: send WS message about current local state

    // TODO: process received WS messages and update positions
    // - state update
    // - new player popup -> create new entity
    // - player left -> destroy entity
  }
}
