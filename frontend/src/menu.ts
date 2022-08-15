import { PlayerType } from "config";

export class Menu {
  private selectorPopup: HTMLDivElement | undefined;

  public open(container: HTMLElement, onSelect: (selectedType: PlayerType) => void): void {
    this.createSelectorPopup(container, onSelect);

    // append to container -> open
    if (this.selectorPopup) {
      container.appendChild(this.selectorPopup);
    }
  }

  public close(): void {
    this.selectorPopup?.remove();
  }

  private createSelectorPopup(container: HTMLElement, onSelect: (selectedType: PlayerType) => void): void {
    this.selectorPopup = document.createElement("div");
    this.selectorPopup.className = "selectorPopup";

    // add CSS styles
    const popupStyles = document.createElement("style");
    popupStyles.appendChild(document.createTextNode(css));
    this.selectorPopup.appendChild(popupStyles);

    // create selector handler
    const handleSelect = (selectedType: PlayerType) => {
      onSelect(selectedType);
    };

    // add selector buttons
    this.createSelectorPopupButton(PlayerType.TypeOne, handleSelect);
    this.createSelectorPopupButton(PlayerType.TypeTwo, handleSelect);
    this.createSelectorPopupButton(PlayerType.TypeThree, handleSelect);
  }

  private createSelectorPopupButton(playerType: PlayerType, onClick: (selectedType: PlayerType) => void): void {
    const selectorButton = document.createElement("div");
    selectorButton.className = "selectorButton " + playerType;

    selectorButton.addEventListener("click", () => {
      onClick(playerType);
    });

    this.selectorPopup?.append(selectorButton);
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
