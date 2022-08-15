import * as ECS from "ecs";

// simply empty controller to use inputs controller system
export class PlayerController extends ECS.Component {}

// simply empty controller to control by mouse
export class MouseRotationController extends ECS.Component {}

interface PlayerControllerParams {
  maxHealth: number;
  maxShields: number;
  maxSpeed: number;
  accelerationSpeed: number;
  rotationSpeed: number;
  breakFriction: number;
}
export class KeyboardMovementController extends ECS.Component {
  constructor(
    public speed: number,
    public health: number,
    public shields: number,
    public params: PlayerControllerParams,
  ) {
    super();
  }
}
