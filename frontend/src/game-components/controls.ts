import * as ECS from "ecs";

// simply empty controller to use inputs controller system
export class PlayerControls extends ECS.Component {}

// simply empty controller to control by mouse
export class MouseRotationControls extends ECS.Component {}

interface PlayerControlsParams {
  maxHealth: number;
  maxShields: number;
  maxSpeed: number;
  accelerationSpeed: number;
  rotationSpeed: number;
  breakFriction: number;
}
export class KeyboardMovementControls extends ECS.Component {
  constructor(
    public speed: number,
    public health: number,
    public shields: number,
    public params: PlayerControlsParams,
  ) {
    super();
  }
}
