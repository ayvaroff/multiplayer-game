import { config } from "config";
import type { ClientMessages, ServerMessages } from "messages";

type ServerMessageListener = (data: ServerMessages["data"]) => void;

export class WebSocketManger {
  public static instance = new WebSocketManger();

  private websocket: WebSocket | undefined;
  private listeners: Record<ServerMessages["type"], ServerMessageListener[]> = {
    "player.connected": [],
    "player.disconnected": [],
    "world.update": [],
  };

  public init(_gameId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // TODO: should be
      // config.wsServerHost + `${config.websocketPath}/${gameId}`
      this.websocket = new WebSocket(config.wsServerHost + config.websocketPath);

      this.websocket.onerror = () => {
        reject("Server connection could not be established");
      };

      this.websocket.onopen = () => {
        resolve();
      };

      this.websocket.onmessage = this.processWSMessage;
    });
  }

  public getWS(): WebSocket {
    if (!this.websocket) {
      throw new Error("WebSocket was not initialized or initialized with error");
    }
    return this.websocket;
  }

  public send(message: ClientMessages): void {
    if (!this.websocket) {
      throw new Error("Cannot send. WebSocket was not initialized or initialized with error.");
    }
    this.websocket.send(JSON.stringify(message));
  }

  public subscribe(message: ServerMessages["type"], listener: ServerMessageListener): void {
    this.listeners[message].push(listener);
  }

  // should be arrow function to work with WebSocketManger context
  private processWSMessage = (message: MessageEvent) => {
    const parsedWSMessage = JSON.parse(message.data) as ServerMessages;

    switch (parsedWSMessage.type) {
      case "player.connected":
      case "player.disconnected":
      case "world.update":
        this.listeners[parsedWSMessage.type].forEach(listener => listener(parsedWSMessage.data));
        break;
    }
  };
}
