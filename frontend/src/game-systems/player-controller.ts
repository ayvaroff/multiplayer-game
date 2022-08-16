import * as ECS from "ecs";
import * as GameComponents from "game-components";
import { CanvasManger, MathUtils } from "game-core";

enum KeyCodes {
  KeyW = "KeyW",
  KeyA = "KeyA",
  KeyS = "KeyS",
  KeyD = "KeyD",
}

export class PlayerController extends ECS.System {
  public requiredComponents: Set<Function> = new Set([GameComponents.PlayerControls]);

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
      if (entity.hasComponent(GameComponents.KeyboardMovementControls)) {
        this.processMovement(entity);
      }
      if (entity.hasComponent(GameComponents.MouseRotationControls)) {
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
    const playerData = entity.getComponent(GameComponents.PlayerData);

    // TODO: change to rotation speed
    // rotate left
    if (this.moveTo.left) {
      entity.getComponent(GameComponents.Position).rotation -= 0.03 * playerData.rotationSpeed;
    }

    // TODO: change to rotation speed
    // rotate right
    if (this.moveTo.right) {
      entity.getComponent(GameComponents.Position).rotation += 0.03 * playerData.rotationSpeed;
    }

    // increase speed
    if (this.moveTo.forward) {
      entity.getComponent(GameComponents.PlayerData).speed += playerData.accelerationSpeed;
      if (playerData.speed > playerData.maxSpeed) {
        entity.getComponent(GameComponents.PlayerData).speed = playerData.maxSpeed;
      }
    }

    // decrease speed
    entity.getComponent(GameComponents.PlayerData).speed -= this.moveTo.backwards ? playerData.breakFriction : 0.05;

    if (playerData.speed < 0) {
      entity.getComponent(GameComponents.PlayerData).speed = 0;
    }

    // update entity object coordinates
    entity.getComponent(GameComponents.Position).x +=
      playerData.speed * MathUtils.sinRad(entity.getComponent(GameComponents.Position).rotation);
    entity.getComponent(GameComponents.Position).y -=
      playerData.speed * MathUtils.cosRad(entity.getComponent(GameComponents.Position).rotation);
  }

  private processRotation(entity: ECS.Entity) {
    entity.getComponent(GameComponents.Position).rotation =
      Math.atan2(
        // since rendering is happening relative to viewport
        // we need to calculate rotation from "GameComponents.Render"
        this.mousePosition.y - entity.getComponent(GameComponents.Render).viewportPosY,
        this.mousePosition.x - entity.getComponent(GameComponents.Render).viewportPosX,
      ) +
      Math.PI / 2; // a necessary 90' correction 🤷🏽‍♂️
  }
}
