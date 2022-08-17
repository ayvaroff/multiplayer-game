import { ServerPlayerInfo } from "config";

interface CommonMessage<T extends string, P> {
  type: T;
  data: P;
}

export type ServerMessages =
  | CommonMessage<"world.update", {}>
  | CommonMessage<"player.connected", ServerPlayerInfo>
  | CommonMessage<"player.disconnected", PlayerDisconnectPayload>;

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

export interface PlayerDisconnectPayload {
  id: string; // player id
}

export type ClientMessages =
  | CommonMessage<"player.update", PlayerUpdatePayload>
  | CommonMessage<"player.connect", ServerPlayerInfo>
  | CommonMessage<"player.disconnect", PlayerDisconnectPayload>;
