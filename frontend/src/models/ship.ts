import { ServerPlayerInfo } from "config";

import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { AssetManager } from "game-core";

import type { PlayerTypeDescription } from "./player-types/types";

export const createShipEntity = (serverPlayerInfo: ServerPlayerInfo, playerData: PlayerTypeDescription): ECS.Entity => {
  const shipEntity = new ECS.Entity();

  shipEntity.addComponent(
    new GameComponents.Position(
      serverPlayerInfo.position.x,
      serverPlayerInfo.position.y,
      serverPlayerInfo.position.rotation,
    ),
  );
  shipEntity.addComponent(new GameComponents.ServerSyncInfo(serverPlayerInfo.id));
  shipEntity.addComponent(new GameComponents.Collider(playerData.collider));
  shipEntity.addComponent(
    new GameComponents.Sprite(
      AssetManager.instance.getAsset(playerData.assetId).asset,
      playerData.size.dx,
      playerData.size.dy,
      playerData.size.width,
      playerData.size.height,
    ),
  );
  shipEntity.addComponent(
    new GameComponents.PlayerData(
      serverPlayerInfo.id,
      serverPlayerInfo.name,
      serverPlayerInfo.playerTypeId,
      serverPlayerInfo.health,
      playerData.properties.maxHealth,
      serverPlayerInfo.shields,
      playerData.properties.maxShields,
      0,
      playerData.properties.maxSpeed,
      playerData.properties.accelerationSpeed,
      playerData.properties.rotationSpeed,
      playerData.properties.breakFriction,
    ),
  );

  return shipEntity;
};

export const createShipWeaponsEntities = (
  serverPlayerInfo: ServerPlayerInfo,
  playerData: PlayerTypeDescription,
  parentEntityId: string,
): ECS.Entity[] => {
  const weaponEntities: ECS.Entity[] = [];

  for (const serverWeaponData of Object.values(serverPlayerInfo.weapons)) {
    const weaponEntity = new ECS.Entity();

    // should always be here if configs are correct
    // no need to check for "undefined"
    const weaponData = playerData.properties.weapons[serverWeaponData.name];

    weaponEntity.addComponent(
      new GameComponents.Position(
        serverWeaponData.position.x,
        serverWeaponData.position.y,
        serverWeaponData.position.rotation,
      ),
    );
    weaponEntity.addComponent(new GameComponents.ServerSyncInfo(serverWeaponData.id));
    weaponEntity.addComponent(
      new GameComponents.Sprite(
        AssetManager.instance.getAsset(weaponData.assetId).asset,
        weaponData.size.dx,
        weaponData.size.dy,
        weaponData.size.width,
        weaponData.size.height,
      ),
    );
    weaponEntity.addComponent(
      new GameComponents.ParentController(parentEntityId, {
        x: weaponData.offset.x,
        y: weaponData.offset.y,
      }),
    );
    weaponEntity.addComponent(new GameComponents.Render(weaponData.bbox));

    weaponEntities.push(weaponEntity);
  }

  return weaponEntities;
};
