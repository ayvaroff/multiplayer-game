import * as ECS from "ecs";

interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export class Render extends ECS.Component {
  /**
   * When default values are used it means that all calculations will happen inside Camera system
   */
  constructor(
    public bbox: BoundingBox,
    public viewportPosX: number = 0,
    public viewportPosY: number = 0,
    public isVisible: boolean = true,
  ) {
    super();
  }
}
