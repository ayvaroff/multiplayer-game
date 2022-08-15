import { PlayerType } from "config";

import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { AssetManager, CanvasManger } from "game-core";

import { createPlayerTypeData } from "./player-types/creator";
import type { PlayerTypeDescription } from "./player-types/types";

export const createPlayer = (playerType: PlayerType, x: number, y: number, deg: number): ECS.Entity[] => {
  const playerData = createPlayerTypeData(playerType);

  const playerShipEntity = createShipEntity(playerData, x, y, deg);

  return [playerShipEntity, ...createShipWeaponsEntities(playerData, x, y, deg, playerShipEntity.id)];
};

const createShipEntity = (playerData: PlayerTypeDescription, x: number, y: number, deg: number): ECS.Entity => {
  const playerEntity = new ECS.Entity();

  playerEntity.addComponent(new GameComponents.Position(x, y, deg));
  playerEntity.addComponent(new GameComponents.Collider(playerData.collider));
  playerEntity.addComponent(new GameComponents.GameObject("player"));
  playerEntity.addComponent(
    new GameComponents.Sprite(
      AssetManager.instance.getAsset(playerData.assetId).asset,
      playerData.size.dx,
      playerData.size.dy,
      playerData.size.width,
      playerData.size.height,
    ),
  );
  playerEntity.addComponent(
    new GameComponents.BoundingBox(
      playerData.bbox.minX,
      playerData.bbox.minY,
      playerData.bbox.maxX,
      playerData.bbox.maxY,
    ),
  );
  playerEntity.addComponent(
    new GameComponents.KeyboardMovementControls(0, playerData.maxHealth, playerData.maxShields, {
      maxHealth: playerData.maxHealth,
      maxShields: playerData.maxShields,
      maxSpeed: playerData.maxSpeed,
      accelerationSpeed: playerData.accelerationSpeed,
      rotationSpeed: playerData.rotationSpeed,
      breakFriction: playerData.breakFriction,
    }),
  );
  playerEntity.addComponent(new GameComponents.PlayerControls());
  // init camera where player should be in the center of the viewport
  playerEntity.addComponent(
    new GameComponents.Render(
      CanvasManger.instance.getCanvasSize().width / 2,
      CanvasManger.instance.getCanvasSize().height / 2,
      true,
    ),
  );

  return playerEntity;
};

const createShipWeaponsEntities = (
  playerData: PlayerTypeDescription,
  x: number,
  y: number,
  deg: number,
  parentEntityId: string,
): ECS.Entity[] => {
  const weaponEntities: ECS.Entity[] = [];

  for (const weaponData of playerData.weapons) {
    const weaponEntity = new ECS.Entity();

    weaponEntity.addComponent(new GameComponents.Position(x + weaponData.offset.x, y + weaponData.offset.y, deg));
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
      new GameComponents.BoundingBox(
        weaponData.bbox.minX,
        weaponData.bbox.minY,
        weaponData.bbox.maxX,
        weaponData.bbox.maxY,
      ),
    );
    weaponEntity.addComponent(new GameComponents.MouseRotationControls());
    weaponEntity.addComponent(new GameComponents.PlayerControls());
    weaponEntity.addComponent(
      new GameComponents.ParentController(parentEntityId, {
        x: weaponData.offset.x,
        y: weaponData.offset.y,
      }),
    );
    weaponEntity.addComponent(new GameComponents.Render());

    weaponEntities.push(weaponEntity);
  }

  return weaponEntities;
};
