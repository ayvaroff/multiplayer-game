export abstract class Component {}

type ComponentClass<T extends Component> = new (...args: any[]) => T;

export class Entity {
  public id: string;
  private components = new Map<Function, Component>();

  constructor() {
    // TODO: swap to uuid ?
    this.id = (+new Date()).toString(16) + ((Math.random() * 100000000) | 0).toString(16);
  }

  public addComponent(component: Component): void {
    this.components.set(component.constructor, component);
  }

  public getComponent<T extends Component>(componentClass: ComponentClass<T>): T {
    return this.components.get(componentClass) as T;
  }

  public removeComponent(componentClass: Function): void {
    this.components.delete(componentClass);
  }

  public hasComponent(componentClass: Function): boolean {
    return this.components.has(componentClass);
  }

  public hasAllComponents(componentClasses: Set<Function>): boolean {
    for (const component of componentClasses) {
      if (!this.components.has(component)) {
        return false;
      }
    }
    return true;
  }
}
