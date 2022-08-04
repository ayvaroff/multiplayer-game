import { MPGame } from "game";
import { Menu } from "menu";

const appContainer = document.getElementById("app");

if (appContainer) {
  appContainer.style.backgroundColor = "#1C1C1C";

  const gameInstance = new MPGame();
  const menuInstance = new Menu();

  menuInstance.show(appContainer, selectedType => {
    gameInstance
      .init({
        container: appContainer,
        renderWidth: window.innerWidth,
        renderHeight: window.innerHeight,
        playerType: selectedType,
      })
      .catch(e => {
        // TODO: handle showing error popup
        // eslint-disable-next-line no-console
        console.log("Main catch", e);
      });
  });
}
