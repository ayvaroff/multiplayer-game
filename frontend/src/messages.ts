import { ServerPlayerInfo } from "config";

interface CommonMessage<T extends string, P> {
  type: T;
  data: P;
}

export interface WorldMessageData {
  id: string;
  createdAt: string; // ISO date
  players: Record<string, ServerPlayerInfo>;
  projectiles: Record<string, unknown>; // TODO: to be implemented
  entities: Record<string, unknown>; // TODO: to be implemented
}

export type ServerMessages =
  | CommonMessage<"world.update", WorldMessageData>
  | CommonMessage<"player.connected", ServerPlayerInfo>
  | CommonMessage<"player.disconnected", PlayerDisconnectPayload>;

// ---------------------

export interface PlayerUpdatePayload {
  // player id
  id: string;
  position: {
    x: number;
    y: number;
    rotation: number;
  };
  weapons: ServerPlayerInfo["weapons"];
}

export interface PlayerDisconnectPayload {
  id: string; // player id
}

export type ClientMessages =
  | CommonMessage<"player.update", PlayerUpdatePayload>
  | CommonMessage<"player.connect", ServerPlayerInfo>
  | CommonMessage<"player.disconnect", PlayerDisconnectPayload>;
