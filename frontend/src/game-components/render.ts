import * as ECS from "ecs";

interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export class Render extends ECS.Component {
  constructor(
    public bbox: BoundingBox,
    public viewportPosX: number = 0,
    public viewportPosY: number = 0,
    public isVisible: boolean = true,
  ) {
    super();
  }
}
