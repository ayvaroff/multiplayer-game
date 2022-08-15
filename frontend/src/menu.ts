import { PlayerType } from "config";

export class Menu {
  private selectorPopup: HTMLDivElement | undefined;
  private errorMessage: HTMLDivElement | undefined;

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

  public showError(message: string): void {
    // remove first if exist
    this.errorMessage?.remove();

    // then create
    this.errorMessage = document.createElement("div");

    this.errorMessage.className = "errorMessage";
    this.errorMessage.innerHTML = message;

    this.selectorPopup?.appendChild(this.errorMessage);
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
    const selectorButtonsContainer = document.createElement("div");
    selectorButtonsContainer.className = "selectorPopupContainer";
    this.createSelectorPopupButton(selectorButtonsContainer, PlayerType.TypeOne, handleSelect);
    this.createSelectorPopupButton(selectorButtonsContainer, PlayerType.TypeTwo, handleSelect);
    this.createSelectorPopupButton(selectorButtonsContainer, PlayerType.TypeThree, handleSelect);
    this.selectorPopup.appendChild(selectorButtonsContainer);
  }

  private createSelectorPopupButton(
    container: HTMLDivElement,
    playerType: PlayerType,
    onClick: (selectedType: PlayerType) => void,
  ): void {
    const selectorButton = document.createElement("div");
    selectorButton.className = "selectorButton " + playerType;

    selectorButton.addEventListener("click", () => {
      onClick(playerType);
    });

    container.append(selectorButton);
  }
}

const css = `
  .selectorPopup {
    background-color: #F2F5FF;
    border-radius: 4px;
    padding: 16px;
    position: absolute;
    box-shadow: 0px 34px 102px -22px rgba(97,97,97,0.61);
    -webkit-box-shadow: 0px 34px 102px -22px rgba(97,97,97,0.61);
    -moz-box-shadow: 0px 34px 102px -22px rgba(97,97,97,0.61);
  }

  .selectorPopupContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 500px;
    height: 300px;
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

  .errorMessage {
    color: red;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    padding-top: 16px;
  }
`;
