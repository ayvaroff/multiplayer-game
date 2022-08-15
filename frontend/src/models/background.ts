import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { AssetManager } from "game-core";

const WORLD_SIZE = 6000; // px

export const createBackground = (): ECS.Entity => {
  const backgroundEntity = new ECS.Entity();

  backgroundEntity.addComponent(new GameComponents.Position(0, 0, 0));
  // TODO: should render with sx, sy, sw, sh params
  // no need to render whole image
  backgroundEntity.addComponent(
    new GameComponents.Sprite(
      AssetManager.instance.getAsset("stars-bg").asset,
      -3000, // WORLD_SIZE / 2
      -3000,
      WORLD_SIZE,
      WORLD_SIZE,
    ),
  );
  // bbox is the same as viewport size
  backgroundEntity.addComponent(
    new GameComponents.BoundingBox(
      -3000, // WORLD_SIZE / 2
      -3000,
      3000, // WORLD_SIZE / 2
      3000,
    ),
  );
  backgroundEntity.addComponent(new GameComponents.Render());

  return backgroundEntity;
};
