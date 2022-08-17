import { PlayerWeaponInfo } from "config";
import { WorldMessageData } from "messages";

import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { WebSocketManger } from "game-core";

// when message is received it is flattened for easier processing
type ServerState = WorldMessageData & {
  weapons: Record<string, PlayerWeaponInfo>;
};

export class ServerSync extends ECS.System {
  public requiredComponents: Set<Function> = new Set([GameComponents.Position, GameComponents.GameObject]);

  private latestServerState: ServerState | null = null;

  constructor() {
    super();

    WebSocketManger.instance.subscribe("world.update", data => {
      this.latestServerState = this.processWorldUpdateData(data as WorldMessageData);
    });
  }

  public update(entities: Set<ECS.Entity>, _tick: number): void {
    if (this.latestServerState) {
      for (const entity of entities) {
        // do not process player controlled entities
        if (entity.hasComponent(GameComponents.PlayerControls)) {
          continue;
        }

        // process ship
        if (entity.hasComponent(GameComponents.PlayerData)) {
          const serverPositionInfo =
            this.latestServerState.players[entity.getComponent(GameComponents.ServerSyncInfo).objectId]?.position;
          if (serverPositionInfo) {
            entity.getComponent(GameComponents.Position).x = serverPositionInfo.x;
            entity.getComponent(GameComponents.Position).y = serverPositionInfo.y;
            entity.getComponent(GameComponents.Position).rotation = serverPositionInfo.rotation;
          }
        }
        // process weapon
        if (entity.hasComponent(GameComponents.WeaponData)) {
          const serverPositionInfo =
            this.latestServerState.weapons[entity.getComponent(GameComponents.ServerSyncInfo).objectId]?.position;

          if (serverPositionInfo) {
            entity.getComponent(GameComponents.Position).x = serverPositionInfo.x;
            entity.getComponent(GameComponents.Position).y = serverPositionInfo.y;
            entity.getComponent(GameComponents.Position).rotation = serverPositionInfo.rotation;
          }
        }
      }
    }
  }

  private processWorldUpdateData(data: WorldMessageData): ServerState {
    const weapons: Record<string, PlayerWeaponInfo> = {};

    for (const playerData of Object.values(data.players)) {
      // parse weapons data
      for (const playerWeaponData of Object.values(playerData.weapons)) {
        weapons[playerWeaponData.id] = playerWeaponData;
      }
    }

    return {
      id: data.id,
      createdAt: data.createdAt,
      entities: data.entities,
      projectiles: data.projectiles,
      players: data.players,
      weapons: weapons,
    };
  }
}
