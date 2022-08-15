import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { MathUtils } from "game-core";

export class ParentSync extends ECS.System {
  public requiredComponents: Set<Function> = new Set([GameComponents.ParentController]);

  constructor() {
    super();
  }

  public update(entities: Set<ECS.Entity>): void {
    for (const entity of entities) {
      const parentController = entity.getComponent(GameComponents.ParentController);

      const parentEntity = this.world.getEntityById(parentController.parentEntityId);

      // update position relative to parent entity
      if (parentEntity) {
        const parentPositionComponent = parentEntity.getComponent(GameComponents.Position);

        const entityOffsetCoordinate: [number, number] = [parentController.offset.x, parentController.offset.y];

        const [relativeX, relativeY] = MathUtils.rotateRelativePoint(
          entityOffsetCoordinate,
          parentPositionComponent.rotation,
        );

        entity.getComponent(GameComponents.Position).x = relativeX + parentPositionComponent.x;
        entity.getComponent(GameComponents.Position).y = relativeY + parentPositionComponent.y;
      }
    }
  }
}
