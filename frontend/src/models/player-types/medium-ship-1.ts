import type { PlayerTypeDescription } from "./types";

export const createMediumShip1Description = (): PlayerTypeDescription => ({
  assetId: "ship-medium",
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
  // for simplicity assume that bounding box is a square
  // that fits entity with any rotation
  bbox: {
    minX: -67,
    minY: -67,
    maxX: 67,
    maxY: 67,
  },
  properties: {
    maxHealth: 150,
    maxShields: 150,
    maxSpeed: 15,
    accelerationSpeed: 0.2,
    rotationSpeed: 1.5,
    breakFriction: 0.3,
    weapons: {
      weapon_1: {
        assetId: "cannon-medium",
        name: "weapon_1",
        size: {
          width: 64,
          height: 64,
          dx: -32,
          dy: -32,
        },
        bbox: {
          minX: -32,
          minY: -32,
          maxX: 32,
          maxY: 32,
        },
        offset: {
          x: 0,
          y: 0,
        },
      },
    },
  },
});
