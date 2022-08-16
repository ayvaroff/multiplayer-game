import * as ECS from "ecs";

export class Position extends ECS.Component {
  /**
   * @param x - x coordinate
   * @param y - y coordinate
   * @param rotation - rotation value in radians
   */
  constructor(public x: number, public y: number, public rotation: number) {
    super();
  }
}
