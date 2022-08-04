import * as ECS from "ecs";

export class Position extends ECS.Component {
  constructor(public x: number, public y: number, public rotation: number) {
    super();
  }
}
