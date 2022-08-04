import type { PlayerTypeDescription } from "./types";

export const createPlayerTypeThreeDescription = (): PlayerTypeDescription => ({
  assetId: "big-ship",
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
});
