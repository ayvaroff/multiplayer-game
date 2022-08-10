import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { CanvasManger, MathUtils } from "game-core";

enum KeyCodes {
  KeyW = "W",
  KeyA = "A",
  KeyS = "S",
  KeyD = "D",
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
      this.mousePosition.x = mouseEvent.clientX;
      this.mousePosition.y = mouseEvent.clientY;
    });

    // init keydown listeners for whole document
    document.addEventListener("keydown", keyDownEvent => {
      this.registerKey(keyDownEvent.key.toUpperCase());
    });
    document.addEventListener("keyup", keyUpEvent => {
      this.registerKey(keyUpEvent.key.toUpperCase(), false);
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
      this.processEntityMovement(entity);
    }
  }

  private registerKey(key: string, keydown = true) {
    switch (key) {
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

  private processEntityMovement(entity: ECS.Entity) {
    const playerController = entity.getComponent(GameComponents.PlayerController);

    // TODO: change to rotation speed
    // rotate left
    if (this.moveTo.left) {
      entity.getComponent(GameComponents.Position).rotation -= 1 * playerController.params.rotationSpeed;
    }

    // TODO: change to rotation speed
    // rotate right
    if (this.moveTo.right) {
      entity.getComponent(GameComponents.Position).rotation += 1 * playerController.params.rotationSpeed;
    }

    // increase speed
    if (this.moveTo.forward) {
      entity.getComponent(GameComponents.PlayerController).speed += playerController.params.accelerationSpeed;
      if (playerController.speed > playerController.params.maxSpeed) {
        entity.getComponent(GameComponents.PlayerController).speed = playerController.params.maxSpeed;
      }
    }

    // decrease speed
    entity.getComponent(GameComponents.PlayerController).speed -= this.moveTo.backwards
      ? playerController.params.breakFriction
      : 0.05;

    if (playerController.speed < 0) {
      entity.getComponent(GameComponents.PlayerController).speed = 0;
    }

    // update entity object coordinates
    entity.getComponent(GameComponents.Position).x +=
      playerController.speed * MathUtils.sinDegree(entity.getComponent(GameComponents.Position).rotation);
    entity.getComponent(GameComponents.Position).y -=
      playerController.speed * MathUtils.cosDegree(entity.getComponent(GameComponents.Position).rotation);
  }
}