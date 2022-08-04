import { Entity } from "./entity";
import { System } from "./system";

export class World {
  private entities = new Map<string, Entity>();
  private systems = new Map<System, Set<Entity>>();

  // contains entities ids
  private entitiesToRemove: Entity[] = [];

  public addEntity(entity: Entity): void {
    this.entities.set(entity.id, entity);
    this.setEntityToSystems(entity);
  }

  /**
   * Marks entity for removal.
   */
  public removeEntity(entity: Entity): void {
    this.entitiesToRemove.push(entity);
  }

  public registerSystem(system: System): void {
    if (!system.requiredComponents.size) {
      // eslint-disable-next-line no-console
      console.warn("Cannot register system without required components:", system);
      return;
    }

    // Give system a reference to the World
    system.world = this;

    this.systems.set(system, new Set());
  }

  /**
   * Run ECS
   * @param tick - is parameter from "requestAnimationFrame" callback
   */
  public update(tick: number): void {
    for (const [system, entities] of this.systems.entries()) {
      system.update(entities, tick);
    }

    // destroy entities after all updates
    while (this.entitiesToRemove.length > 0) {
      this.destroyEntity(this.entitiesToRemove.pop());
    }
  }

  private destroyEntity(entity: Entity | undefined) {
    if (entity) {
      this.entities.delete(entity.id);

      for (const entities of this.systems.values()) {
        entities.delete(entity);
      }
    }
  }

  private setEntityToSystems(entity: Entity) {
    for (const system of this.systems.keys()) {
      this.setEntityToTheSystem(entity, system);
    }
  }

  private setEntityToTheSystem(entity: Entity, system: System) {
    if (entity.hasAllComponents(system.requiredComponents)) {
      this.systems.get(system)?.add(entity);
    } else {
      this.systems.get(system)?.delete(entity);
    }
  }
}
