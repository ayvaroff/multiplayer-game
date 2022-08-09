import { config } from "config";

import * as ECS from "ecs";
import * as GameComponents from "game-components";

// TODO: make following types more strict
interface ServerMessage {
  type: string;
  data: Record<string, unknown>;
}
interface GameMessage {
  type: "playerUpdate";
  data: Record<string, unknown>;
}

export class WSConnection extends ECS.System {
  public requiredComponents: Set<Function> = new Set([GameComponents.Position, GameComponents.GameObject]);

  private websocket: WebSocket;
  private lastTick = 0;
  private latestServerState: ServerMessage = { type: "", data: {} };

  constructor() {
    super();

    this.websocket = new WebSocket(config.wsServerHost + "/api/game");

    this.websocket.onerror = () => {
      // TODO: handle it properly
    };

    this.websocket.onmessage = message => {
      const parsedWSMessage = JSON.parse(message.data) as ServerMessage;
      this.latestServerState = parsedWSMessage;
    };

    // close WS connection on refresh/close window
    window.addEventListener("beforeunload", () => {
      // this.websocket.close();
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

    // don't do anything if WS is closed
    if (this.websocket.readyState === WebSocket.CLOSED) {
      return;
    }

    // TODO: send WS message about current local state
    for (const entity of entities) {
      // send player position
      if (entity.hasComponent(GameComponents.PlayerController)) {
        const playerPosition = entity.getComponent(GameComponents.Position);

        this.websocket.send(
          JSON.stringify({
            type: "playerUpdate",
            data: {
              playerId: entity.id,
              location: playerPosition,
            },
          } as GameMessage),
        );
      }
    }

    // TODO: process received WS messages and update positions
    // - state update
    // - new player popup -> create new entity
    // - player left -> destroy entity
  }
}
