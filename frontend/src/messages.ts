import { ServerPlayerInfo } from "config";

interface CommonMessage<T extends string, P> {
  type: T;
  data: P;
}

export type ServerMessages =
  | CommonMessage<"world.update", {}>
  | CommonMessage<"player.connected", ServerPlayerInfo>
  | CommonMessage<"player.disconnected", { id: string /* player id */ }>;

// ---------------------

interface PlayerUpdatePayload {
  // player id
  id: string;
  position: {
    x: number;
    y: number;
    rotation: number;
  };
  weapons: Record<
    // weapon id
    string,
    {
      // weapon id
      id: string;
      name: string;
      position: {
        x: number;
        y: number;
        rotation: number;
      };
    }
  >;
}

export type ClientMessages =
  | CommonMessage<"player.update", PlayerUpdatePayload>
  | CommonMessage<"player.connect", ServerPlayerInfo>
  | CommonMessage<"player.disconnect", { id: string /* player id */ }>;
