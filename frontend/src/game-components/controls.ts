import * as ECS from "ecs";

// simply empty controller to use inputs controller system
export class PlayerControls extends ECS.Component {}

// simply empty controller to control by mouse
export class MouseRotationControls extends ECS.Component {}

// simply empty controller to control by key inputs
export class KeyboardMovementControls extends ECS.Component {}
