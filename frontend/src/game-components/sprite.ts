import * as ECS from "ecs";

export class Sprite extends ECS.Component {
  /**
   * @param asset - asset to draw
   * @param dx - asset offset on x-axis
   * @param dy  - asset offset on y-axis
   * @param width
   * @param height
   */
  constructor(
    public asset: HTMLImageElement,
    public dx: number,
    public dy: number,
    public width: number,
    public height: number,
  ) {
    super();
  }
}
