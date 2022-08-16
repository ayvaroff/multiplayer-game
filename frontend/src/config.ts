export const config = {
  serverHost: "http://localhost:9002",
  wsServerHost: "ws://localhost:9002",
  gameConnectPath: "/player/connect",
  websocketPath: "/game/run",
};

// TODO: better naming
export enum PlayerType {
  SmallShip1 = "small-ship-1",
  MediumShip1 = "medium-ship-1",
  BigShip1 = "big-ship-1",
}

export interface Asset {
  id: string;
  url: string;
}
/**
 * Temporary assets (or permanent - who knows? 🙂) were taken from here
 * {@link https://zintoki.itch.io/space-breaker}
 */
export const assetsDescriptionList: Asset[] = [
  // ships
  { id: "ship-small", url: "/ships/ship_small.png" },
  { id: "ship-medium", url: "/ships/ship_medium.png" },
  { id: "ship-big", url: "/ships/ship_big.png" },
  // weapons
  { id: "cannon-small", url: "/weapons/cannon_small.png" },
  { id: "cannon-medium", url: "/weapons/cannon_medium.png" },
  // backgrounds
  { id: "stars-bg", url: "/backgrounds/stars_bg.png" },
];

export interface PlayerInfo {
  // general information
  id: string;
  name: string;
  playerTypeId: PlayerType;
  // per player type information
  health: number;
  maxHealth: number;
  shields: number;
  maxShields: number;
  speed: number;
  maxSpeed: number;
  accelerationSpeed: number;
  rotationSpeed: number;
  breakFriction: number;
}

export interface ServerPlayerInfo {
  id: string;
  name: string;
  playerTypeId: PlayerType;
  health: number;
  shields: number;
  weapons: Record<string, PlayerInfoWeapon>;
  position: {
    x: number;
    y: number;
    rotation: number;
  };
}

interface PlayerInfoWeapon {
  id: string;
  name: string;
  health: number;
  position: {
    x: number;
    y: number;
    rotation: number;
  };
}
