import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { CanvasManger, MathUtils } from "game-core";

export class Render extends ECS.System {
  public requiredComponents: Set<Function> = new Set([
    GameComponents.Sprite,
    GameComponents.Position,
    // GameComponents.Collider, // to be removed. Currently only for testing purposes.
  ]);

  // set private reference to ctx and canvas
  private ctx = CanvasManger.instance.getContext();
  private canvas = CanvasManger.instance.getCanvas();

  constructor() {
    super();
  }

  public update(entities: Set<ECS.Entity>, _tick: number): void {
    this.clearCanvas();

    for (const entity of entities) {
      // draw sprite
      this.renderSprite(entity);
      // draw collider f(or testing purposes only)
      // this.renderCollider(entity.getComponent(GameComponents.Collider), positionComponent);
    }
  }

  private clearCanvas() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  // Renderers ---------------------
  private renderSprite(entity: ECS.Entity) {
    const spriteComponent = entity.getComponent(GameComponents.Sprite);
    const renderComponent = entity.getComponent(GameComponents.Render);

    // save context because of rotation
    this.ctx.save();

    this.ctx.translate(renderComponent.viewportPositionX, renderComponent.viewportPositionY);
    this.ctx.rotate(MathUtils.toRad(entity.getComponent(GameComponents.Position).rotation));
    this.ctx.translate(-renderComponent.viewportPositionX, -renderComponent.viewportPositionY);

    this.ctx.drawImage(
      spriteComponent.asset,
      // why Math.floor() ?
      // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#avoid_floating-point_coordinates_and_use_integers_instead
      Math.floor(renderComponent.viewportPositionX + spriteComponent.dx),
      Math.floor(renderComponent.viewportPositionY + spriteComponent.dy),
      spriteComponent.width,
      spriteComponent.height,
    );

    this.ctx.restore();
  }

  private renderCollider({ collider }: GameComponents.Collider, positionComponent: GameComponents.Position) {
    if (collider.length) {
      // modify collide coordinates to render it with rotation
      const rotatedCollider = collider.map(coordinate =>
        MathUtils.rotateRelativePoint(coordinate, positionComponent.rotation),
      );

      this.ctx.strokeStyle = "#FF0000";
      this.ctx.beginPath();

      for (let i = 0; i < rotatedCollider.length; i++) {
        const [x, y] = rotatedCollider[i];
        this.ctx.lineTo(positionComponent.x + x, positionComponent.y + y);
      }
      // draw the first coordinate to close the path
      this.ctx.lineTo(positionComponent.x + rotatedCollider[0][0], positionComponent.y + rotatedCollider[0][1]);

      this.ctx.stroke();
    }
  }
}
