import { Entity } from "./entity";
import { World } from "./world";

export abstract class System {
  public world!: World;

  public abstract requiredComponents: Set<Function>;

  public abstract update(entities: Set<Entity>, tick: number): void;
}
