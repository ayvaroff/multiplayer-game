import { ServerPlayerInfo } from "config";

import * as ECS from "ecs";
import * as GameComponents from "game-components";

import { createPlayerTypeData } from "./player-types/creator";
import { createShipEntity, createShipWeaponsEntities } from "./ship";

export const createOtherPlayer = (serverPlayerInfo: ServerPlayerInfo): ECS.Entity[] => {
  const playerData = createPlayerTypeData(serverPlayerInfo.playerType);

  const playerShipEntity = createShipEntity(serverPlayerInfo, playerData);
  // player specific components
  playerShipEntity.addComponent(new GameComponents.GameObject("enemy"));
  playerShipEntity.addComponent(new GameComponents.Render(playerData.bbox, 0, 0, false));

  const weaponEntities = createShipWeaponsEntities(serverPlayerInfo, playerData, playerShipEntity.id);

  return [playerShipEntity, ...weaponEntities];
};
