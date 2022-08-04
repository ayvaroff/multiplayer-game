import { PlayerType } from "config";

import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { AssetManager } from "game-core";

import { createPlayerTypeData } from "./player-types/creator";

export const createPlayer = (playerType: PlayerType, x: number, y: number, deg: number): ECS.Entity => {
  const playerEntity = new ECS.Entity();

  const playerData = createPlayerTypeData(playerType);

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
    new GameComponents.PlayerController(0, playerData.maxHealth, playerData.maxShields, {
      maxHealth: playerData.maxHealth,
      maxShields: playerData.maxShields,
      maxSpeed: playerData.maxSpeed,
      accelerationSpeed: playerData.accelerationSpeed,
      rotationSpeed: playerData.rotationSpeed,
      breakFriction: playerData.breakFriction,
    }),
  );

  return playerEntity;
};
