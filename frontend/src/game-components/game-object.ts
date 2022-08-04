import * as ECS from "ecs";

type GameObjectType = "player" | "enemy" | "projectile" | "asteroid";

export class GameObject extends ECS.Component {
  constructor(public gameObject: GameObjectType) {
    super();
  }
}
