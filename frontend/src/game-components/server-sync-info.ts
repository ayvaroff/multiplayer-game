import * as ECS from "ecs";

export class ServerSyncInfo extends ECS.Component {
  constructor(public objectId: string) {
    super();
  }
}
