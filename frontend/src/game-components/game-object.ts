import * as ECS from "ecs";

type GameObjectType = "ship" | "weapon" | "projectile" | "asteroid";

export class GameObject extends ECS.Component {
  constructor(public gameObject: GameObjectType) {
    super();
  }
}
