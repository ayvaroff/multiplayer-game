import * as GameComponents from "game-components";

export interface PlayerTypeDescription {
  assetId: "small-ship" | "medium-ship" | "big-ship";
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
  maxHealth: number;
  maxShields: number;
  maxSpeed: number;
  accelerationSpeed: number;
  rotationSpeed: number;
  breakFriction: number;
}
