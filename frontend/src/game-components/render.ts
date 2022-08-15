import * as ECS from "ecs";

export class Render extends ECS.Component {
  constructor(
    public viewportPositionX: number = 0,
    public viewportPositionY: number = 0,
    public shouldRender: boolean = true,
  ) {
    super();
  }
}
