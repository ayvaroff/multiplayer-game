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

  menuInstance.open(appContainer, selectedType => {
    gameInstance
      .init({
        container: appContainer,
        playerType: selectedType,
        // fixed canvas dimensions
        renderWidth: 1280,
        renderHeight: 720,
      })
      .then(() => {
        menuInstance.close();
      })
      .catch(e => {
        menuInstance.showError(e);
      });
  });
}
