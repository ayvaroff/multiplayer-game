export const config = {
  serverHost: "http://localhost:9002",
  wsServerHost: "ws://localhost:9002",
  gameConnectPath: "/player/connect",
  websocketPath: "/game/run",
};

// TODO: better naming
export enum PlayerType {
  TypeOne = "TypeOne",
  TypeTwo = "TypeTwo",
  TypeThree = "TypeThree",
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
  playerType: PlayerType;
  // per player type information
  health: string;
  maxHealth: string;
  shields: string;
  maxShields: string;
  speed: number;
  maxSpeed: number;
  accelerationSpeed: number;
  rotationSpeed: number;
  breakFriction: number;
}

export interface ServerPlayerInfo extends PlayerInfo {
  weapons: PlayerInfoWeapon[];
  position: {
    x: number;
    y: number;
    rotation: number;
  };
}

interface PlayerInfoWeapon {
  id: string;
}
