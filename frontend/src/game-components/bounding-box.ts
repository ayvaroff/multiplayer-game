import * as ECS from "ecs";

export class BoundingBox extends ECS.Component {
  constructor(public minX: number, public minY: number, public maxX: number, public maxY: number) {
    super();
  }
}
