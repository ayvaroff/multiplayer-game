import { PlayerType } from "config";

export class Menu {
  public show(container: HTMLElement, onSelect: (selectedType: PlayerType) => void): void {
    this.createSelectorPopup(container, onSelect);
  }

  private createSelectorPopup(container: HTMLElement, onSelect: (selectedType: PlayerType) => void): void {
    const selectorPopup = document.createElement("div");
    selectorPopup.className = "selectorPopup";

    // add CSS styles
    const popupStyles = document.createElement("style");
    popupStyles.appendChild(document.createTextNode(css));
    selectorPopup.appendChild(popupStyles);

    // create selector handler
    const handleSelect = (selectedType: PlayerType) => {
      onSelect(selectedType);

      // close popup
      selectorPopup.remove();
    };

    // add selector buttons
    this.createSelectorPopupButton(selectorPopup, PlayerType.TypeOne, handleSelect);
    this.createSelectorPopupButton(selectorPopup, PlayerType.TypeTwo, handleSelect);
    this.createSelectorPopupButton(selectorPopup, PlayerType.TypeThree, handleSelect);

    container.appendChild(selectorPopup);
  }

  private createSelectorPopupButton(
    popupContainer: HTMLDivElement,
    playerType: PlayerType,
    onClick: (selectedType: PlayerType) => void,
  ): void {
    const selectorButton = document.createElement("div");
    selectorButton.className = "selectorButton " + playerType;

    selectorButton.addEventListener("click", () => {
      onClick(playerType);
    });

    popupContainer.append(selectorButton);
  }
}

const css = `
  .selectorPopup {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F2F5FF;
    border-radius: 4px;
    padding: 16px;
    box-shadow: 0px 34px 102px -22px rgba(97,97,97,0.61);
    -webkit-box-shadow: 0px 34px 102px -22px rgba(97,97,97,0.61);
    -moz-box-shadow: 0px 34px 102px -22px rgba(97,97,97,0.61);

    position: absolute;
    width: 500px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .selectorButton {
    background-color: #ECECEC;
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
    margin: 0 16px;
    width: 100%;
    height: 100%;
  }

  .selectorButton:hover {
    background-color: #CCCCCC;
  }

  .selectorButton.TypeOne { background-image: url(/ships/ship_small.png); }
  .selectorButton.TypeTwo { background-image: url(/ships/ship_medium.png); }
  .selectorButton.TypeThree { background-image: url(/ships/ship_big.png); }
`;
