import * as GameComponents from "game-components";

export interface PlayerTypeDescription {
  assetId: "ship-small" | "ship-medium" | "ship-big";
  size: {
    width: number;
    height: number;
    dx: number; // x-offset from center of an image
    dy: number; // y-offset from center of an image
  };
  collider: GameComponents.Coordinate[];
  // bounding box is required for rendering optimization
  bbox: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
  properties: {
    maxHealth: number;
    maxShields: number;
    maxSpeed: number;
    accelerationSpeed: number;
    rotationSpeed: number;
    breakFriction: number;
    // weapon name -> weapon description
    weapons: Record<string, PlayerWeaponDescription>;
  };
}

export interface PlayerWeaponDescription {
  assetId: "cannon-small" | "cannon-medium";
  name: string;
  size: {
    width: number;
    height: number;
    dx: number; // x-offset from center of an image
    dy: number; // y-offset from center of an image
  };
  // bounding box is required for rendering optimization
  bbox: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
  // position relative to parent origin
  offset: {
    x: number;
    y: number;
  };
}
