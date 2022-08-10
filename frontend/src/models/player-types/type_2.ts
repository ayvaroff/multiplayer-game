import type { PlayerTypeDescription } from "./types";

export const createPlayerTypeTwoDescription = (): PlayerTypeDescription => ({
  assetId: "medium-ship",
  size: {
    width: 64,
    height: 128,
    dx: -32,
    dy: -64,
  },
  collider: [
    [7, -62],
    [30, -40],
    [30, 45],
    [10, 65],
    [-10, 65],
    [-30, 45],
    [-30, -40],
    [-7, -62],
  ],
  bbox: {
    minX: -32,
    minY: -64,
    maxX: 32,
    maxY: 64,
  },
  maxHealth: 150,
  maxShields: 150,
  maxSpeed: 15,
  accelerationSpeed: 0.2,
  rotationSpeed: 1.5,
  breakFriction: 0.3,
});