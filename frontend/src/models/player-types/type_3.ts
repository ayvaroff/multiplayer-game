import type { PlayerTypeDescription } from "./types";

export const createPlayerTypeThreeDescription = (): PlayerTypeDescription => ({
  assetId: "ship-big",
  size: {
    width: 128,
    height: 256,
    dx: -64,
    dy: -128,
  },
  collider: [
    [17, -130],
    [50, -35],
    [50, 90],
    [17, 130],
    [-17, 130],
    [-50, 90],
    [-50, -35],
    [-17, -130],
  ],
  // for simplicity assume that bounding box is a square
  // that fits entity with any rotation
  bbox: {
    minX: -133,
    minY: -133,
    maxX: 133,
    maxY: 133,
  },
  properties: {
    maxHealth: 200,
    maxShields: 200,
    maxSpeed: 10,
    accelerationSpeed: 0.11,
    rotationSpeed: 1.2,
    breakFriction: 0.08,
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
          y: -70,
        },
      },
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
          y: -37,
        },
      },
      {
        assetId: "cannon-medium",
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
          y: 10,
        },
      },
    ],
  },
});
