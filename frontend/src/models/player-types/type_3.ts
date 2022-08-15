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
  bbox: {
    minX: -64,
    minY: -128,
    maxX: 64,
    maxY: 128,
  },
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
});
