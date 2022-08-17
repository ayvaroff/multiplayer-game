import { PlayerUpdatePayload } from "messages";

import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { WebSocketManger } from "game-core";

export class PlayerSync extends ECS.System {
  public requiredComponents: Set<Function> = new Set([GameComponents.PlayerControls]);

  private playerUpdatePayload: PlayerUpdatePayload = {
    id: "",
    position: {
      x: 0,
      y: 0,
      rotation: 0,
    },
    weapons: {},
  };

  constructor() {
    super();
  }

  public update(entities: Set<ECS.Entity>, _tick: number): void {
    // create updated payload data
    for (const entity of entities) {
      if (entity.hasComponent(GameComponents.PlayerData)) {
        // update ship data
        this.playerUpdatePayload.id = entity.getComponent(GameComponents.PlayerData).id;
        this.playerUpdatePayload.position = entity.getComponent(GameComponents.Position);
      } else if (entity.hasComponent(GameComponents.WeaponData)) {
        const weaponData = entity.getComponent(GameComponents.WeaponData);
        // update weapon data
        this.playerUpdatePayload.weapons[weaponData.id] = {
          ...weaponData,
          position: entity.getComponent(GameComponents.Position),
        };
      }
    }

    // send it if successfully updated
    if (this.playerUpdatePayload.id) {
      WebSocketManger.instance.send({
        type: "player.update",
        data: this.playerUpdatePayload,
      });
    }
  }
}
