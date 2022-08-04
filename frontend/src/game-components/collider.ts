import * as ECS from "ecs";

export type Coordinate = [number, number];

export class Collider extends ECS.Component {
  constructor(public collider: Coordinate[]) {
    super();
  }
}
