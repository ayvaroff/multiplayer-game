import * as ECS from "ecs";

interface PlayerControllerParams {
  maxHealth: number;
  maxShields: number;
  maxSpeed: number;
  accelerationSpeed: number;
  rotationSpeed: number;
  breakFriction: number;
}

export class PlayerController extends ECS.Component {
  constructor(
    public speed: number,
    public health: number,
    public shields: number,
    public params: PlayerControllerParams,
  ) {
    super();
  }
}
