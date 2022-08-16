import { config, ServerPlayerInfo } from "config";
import { MPGame } from "game";
import { Menu } from "menu";

const appContainer = document.getElementById("app");

if (appContainer) {
  // apply styles to container
  appContainer.style.backgroundColor = "#1C1C1C";
  appContainer.style.display = "flex";
  appContainer.style.alignItems = "center";
  appContainer.style.justifyContent = "center";

  const gameInstance = new MPGame();
  const menuInstance = new Menu();

  const playerConnectURL = config.serverHost + config.gameConnectPath;

  menuInstance.open(appContainer, selectedType => {
    // ugly nested Promises
    fetch(playerConnectURL, {
      method: "POST",
      body: JSON.stringify({ player_type_id: selectedType }),
    })
      .then(res => {
        if (res.status === 200) {
          return res.json() as Promise<ServerPlayerInfo>;
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(serverPlayerInfo => {
        gameInstance
          .init({
            container: appContainer,
            serverPlayerInfo: serverPlayerInfo,
            // fixed canvas dimensions
            renderWidth: 1280,
            renderHeight: 720,
          })
          .then(() => {
            menuInstance.close();
          })
          .catch(e => {
            menuInstance.showError(e.message);
          });
      })
      .catch(e => {
        menuInstance.showError("Failed to connect. Reason: " + e.message);
      });
  });
}
