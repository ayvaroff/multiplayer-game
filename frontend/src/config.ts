export const config = {
  serverHost: "http://localhost:9002",
  wsServerHost: "ws://localhost:9002",
  gameConnectPath: "/api/connect",
  websocketPath: "/api/ws",
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
  { id: "small-ship", url: "/ships/ship_small.png" },
  { id: "medium-ship", url: "/ships/ship_medium.png" },
  { id: "big-ship", url: "/ships/ship_big.png" },
];
