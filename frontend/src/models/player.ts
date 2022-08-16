import { ServerPlayerInfo } from "config";

import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { CanvasManger } from "game-core";

import { createPlayerTypeData } from "./player-types/creator";
import { createShipEntity, createShipWeaponsEntities } from "./ship";

export const createPlayer = (serverPlayerInfo: ServerPlayerInfo): ECS.Entity[] => {
  const playerData = createPlayerTypeData(serverPlayerInfo.playerTypeId);

  const playerShipEntity = createShipEntity(serverPlayerInfo, playerData);
  // player specific components
  playerShipEntity.addComponent(new GameComponents.GameObject("player"));
  playerShipEntity.addComponent(new GameComponents.PlayerControls());
  playerShipEntity.addComponent(new GameComponents.KeyboardMovementControls());
  // init camera where player should be in the center of the viewport
  playerShipEntity.addComponent(
    new GameComponents.Render(
      playerData.bbox,
      CanvasManger.instance.getCanvasSize().width / 2,
      CanvasManger.instance.getCanvasSize().height / 2,
      true,
    ),
  );

  const weaponEntities = createShipWeaponsEntities(serverPlayerInfo, playerData, playerShipEntity.id);

  for (const entity of weaponEntities) {
    entity.addComponent(new GameComponents.MouseRotationControls());
    entity.addComponent(new GameComponents.PlayerControls());
  }

  return [playerShipEntity, ...weaponEntities];
};
