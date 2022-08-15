import type { PlayerTypeDescription } from "./types";

export const createPlayerTypeOneDescription = (): PlayerTypeDescription => ({
  assetId: "ship-small",
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
  weapons: [
    {
      assetId: "cannon-small",
      size: {
        width: 32,
        height: 32,
        dx: -16,
        dy: -16,
      },
      bbox: {
        minX: -16,
        minY: -16,
        maxX: 16,
        maxY: 16,
      },
      offset: {
        x: 0,
        y: 0,
      },
    },
  ],
});
