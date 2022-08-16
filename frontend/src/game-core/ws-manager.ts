import { config } from "config";
import type { ClientMessages } from "messages";

export class WebSocketManger {
  public static instance = new WebSocketManger();

  private websocket: WebSocket | undefined;

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
}
