import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { CanvasManger, MathUtils } from "game-core";

enum KeyCodes {
  KeyW = "KeyW",
  KeyA = "KeyA",
  KeyS = "KeyS",
  KeyD = "KeyD",
}

export class InputsController extends ECS.System {
  public requiredComponents: Set<Function> = new Set([GameComponents.PlayerController]);

  private lastTick = 0;
  private mousePosition = { x: 0, y: 0 };
  private moveTo = {
    left: false,
    right: false,
    forward: false,
    backwards: false,
  };

  constructor() {
    super();

    // init mouse listener only for canvas
    CanvasManger.instance.getCanvas().addEventListener("mousemove", mouseEvent => {
      // we need coordinates relative to canvas
      this.mousePosition.x = mouseEvent.offsetX;
      this.mousePosition.y = mouseEvent.offsetY;
    });

    // init keydown listeners for whole document
    document.addEventListener("keydown", keyDownEvent => {
      this.registerKey(keyDownEvent.code);
    });
    document.addEventListener("keyup", keyUpEvent => {
      this.registerKey(keyUpEvent.code, false);
    });
  }

  public update(entities: Set<ECS.Entity>, tick: number): void {
    // Frame independent movement
    // in order to make movement speed constant in every device
    // and avoid locking to FPS which may vary
    if (tick - this.lastTick < 30) {
      return;
    }

    this.lastTick = tick;

    for (const entity of entities) {
      if (entity.hasComponent(GameComponents.KeyboardMovementController)) {
        this.processMovement(entity);
      }
      if (entity.hasComponent(GameComponents.MouseRotationController)) {
        this.processRotation(entity);
      }
    }
  }

  private registerKey(keyCode: string, keydown = true) {
    switch (keyCode) {
      case KeyCodes.KeyA:
        this.moveTo.left = keydown;
        break;
      case KeyCodes.KeyD:
        this.moveTo.right = keydown;
        break;
      case KeyCodes.KeyW:
        this.moveTo.forward = keydown;
        break;
      case KeyCodes.KeyS:
        this.moveTo.backwards = keydown;
        break;
    }
  }

  private processMovement(entity: ECS.Entity) {
    const movementController = entity.getComponent(GameComponents.KeyboardMovementController);

    // TODO: change to rotation speed
    // rotate left
    if (this.moveTo.left) {
      entity.getComponent(GameComponents.Position).rotation -= 1 * movementController.params.rotationSpeed;
    }

    // TODO: change to rotation speed
    // rotate right
    if (this.moveTo.right) {
      entity.getComponent(GameComponents.Position).rotation += 1 * movementController.params.rotationSpeed;
    }

    // increase speed
    if (this.moveTo.forward) {
      entity.getComponent(GameComponents.KeyboardMovementController).speed +=
        movementController.params.accelerationSpeed;
      if (movementController.speed > movementController.params.maxSpeed) {
        entity.getComponent(GameComponents.KeyboardMovementController).speed = movementController.params.maxSpeed;
      }
    }

    // decrease speed
    entity.getComponent(GameComponents.KeyboardMovementController).speed -= this.moveTo.backwards
      ? movementController.params.breakFriction
      : 0.05;

    if (movementController.speed < 0) {
      entity.getComponent(GameComponents.KeyboardMovementController).speed = 0;
    }

    // update entity object coordinates
    entity.getComponent(GameComponents.Position).x +=
      movementController.speed * MathUtils.sinDegree(entity.getComponent(GameComponents.Position).rotation);
    entity.getComponent(GameComponents.Position).y -=
      movementController.speed * MathUtils.cosDegree(entity.getComponent(GameComponents.Position).rotation);
  }

  private processRotation(entity: ECS.Entity) {
    entity.getComponent(GameComponents.Position).rotation =
      MathUtils.toDegree(
        Math.atan2(
          // since rendering is happening relative to viewport
          // we need to calculate rotation from "GameComponents.Render"
          this.mousePosition.y - entity.getComponent(GameComponents.Render).viewportPositionY,
          this.mousePosition.x - entity.getComponent(GameComponents.Render).viewportPositionX,
        ),
      ) + 90; // a necessary 90' correction 🤷🏽‍♂️
  }
}
