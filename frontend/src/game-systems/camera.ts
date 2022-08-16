import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { CanvasManger } from "game-core";

export class Camera extends ECS.System {
  public requiredComponents: Set<Function> = new Set([GameComponents.Render]);

  private cameraWidth = CanvasManger.instance.getCanvasSize().width;
  private cameraHeight = CanvasManger.instance.getCanvasSize().height;
  // the viewport is divided in to thirds and the center is dead zone
  private cameraDeadZoneMinX = Math.floor(this.cameraWidth / 3);
  private cameraDeadZoneMaxX = this.cameraWidth - this.cameraDeadZoneMinX;
  private cameraDeadZoneMinY = Math.floor(this.cameraHeight / 3);
  private cameraDeadZoneMaxY = this.cameraHeight - this.cameraDeadZoneMinY;

  constructor(private cameraXPosition: number, private cameraYPosition: number) {
    super();
  }

  public update(entities: Set<ECS.Entity>): void {
    this.updateCameraPosition(entities);

    // update all entities render params
    for (const entity of entities) {
      this.updateEntityRenderComponent(entity);
    }
  }

  private updateCameraPosition(entities: Set<ECS.Entity>): void {
    // TODO: make sure player component is the latest and reverse for loop

    // update camera according to player ship position
    for (const entity of entities) {
      // only ship is required since weapons position are relative to it
      if (entity.hasComponent(GameComponents.KeyboardMovementControls)) {
        const playerPosition = entity.getComponent(GameComponents.Position);

        // check X-axis
        if (playerPosition.x - this.cameraXPosition > this.cameraDeadZoneMaxX) {
          this.cameraXPosition = playerPosition.x - this.cameraDeadZoneMaxX;
        } else if (playerPosition.x - this.cameraXPosition < this.cameraDeadZoneMinX) {
          this.cameraXPosition = playerPosition.x - this.cameraDeadZoneMinX;
        }

        // check Y-axis
        if (playerPosition.y - this.cameraYPosition > this.cameraDeadZoneMaxY) {
          this.cameraYPosition = playerPosition.y - this.cameraDeadZoneMaxY;
        } else if (playerPosition.y - this.cameraYPosition < this.cameraDeadZoneMinY) {
          this.cameraYPosition = playerPosition.y - this.cameraDeadZoneMinY;
        }

        // no need to check entities further since only one movement player controller should exist
        break;
      }
    }
  }

  private updateEntityRenderComponent(entity: ECS.Entity) {
    // update viewport position
    entity.getComponent(GameComponents.Render).viewportPosX =
      entity.getComponent(GameComponents.Position).x - this.cameraXPosition;
    entity.getComponent(GameComponents.Render).viewportPosY =
      entity.getComponent(GameComponents.Position).y - this.cameraYPosition;

    // TODO: check if entity is visible in viewport
    // entity.getComponent(GameComponents.Render).isVisible = this.entityIsVisible(entity);
  }

  private entityIsVisible(entity: ECS.Entity) {
    const renderComponent = entity.getComponent(GameComponents.Render);

    if (
      // check X-axis
      (renderComponent.viewportPosX + renderComponent.bbox.maxX < 0 || // right
        renderComponent.viewportPosX - renderComponent.bbox.minX > this.cameraWidth) && // left
      // check Y-axis
      (renderComponent.viewportPosY + renderComponent.bbox.maxY < 0 || // top
        renderComponent.viewportPosY - renderComponent.bbox.minY > this.cameraHeight) // bottom
    ) {
      return false;
    }

    return true;
  }
}
