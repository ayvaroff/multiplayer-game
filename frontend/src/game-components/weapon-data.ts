import * as ECS from "ecs";

export class WeaponData extends ECS.Component {
  constructor(public id: string, public name: string, public health: number) {
    super();
  }
}
