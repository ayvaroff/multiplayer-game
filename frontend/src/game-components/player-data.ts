import { PlayerType } from "config";

import * as ECS from "ecs";

export class PlayerData extends ECS.Component {
  constructor(
    public id: string,
    public name: string,
    public playerType: PlayerType,
    public health: string,
    public maxHealth: string,
    public shields: string,
    public maxShields: string,
    public speed: number,
    public maxSpeed: number,
    public accelerationSpeed: number,
    public rotationSpeed: number,
    public breakFriction: number,
  ) {
    super();
  }
}
