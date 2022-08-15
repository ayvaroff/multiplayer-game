import * as ECS from "ecs";

interface Offset {
  x: number;
  y: number;
}

export class ParentController extends ECS.Component {
  constructor(public parentEntityId: string, public offset: Offset) {
    super();
  }
}
