import type { PlayerTypeDescription } from "./types";

export const createPlayerTypeOneDescription = (): PlayerTypeDescription => ({
  assetId: "small-ship",
  size: {
    width: 32,
    height: 64,
    dx: -16,
    dy: -32,
  },
  collider: [
    [6, -33],
    [15, -17],
    [15, 20],
    [5, 29],
    [-5, 29],
    [-15, 20],
    [-15, -17],
    [-6, -33],
  ],
  bbox: {
    minX: -16,
    minY: -32,
    maxX: 16,
    maxY: 32,
  },
  maxHealth: 100,
  maxShields: 100,
  maxSpeed: 20,
  accelerationSpeed: 0.7,
  rotationSpeed: 5,
  breakFriction: 0.5,
});
