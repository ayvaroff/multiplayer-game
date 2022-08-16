import { PlayerType } from "config";

import { createBigShip1Description } from "./big-ship-1";
import { createMediumShip1Description } from "./medium-ship-1";
import { createSmallShip1Description } from "./small-ship-1";
import type { PlayerTypeDescription } from "./types";

export const createPlayerTypeData = (playerType: PlayerType): PlayerTypeDescription => {
  switch (playerType) {
    case PlayerType.SmallShip1:
      return createSmallShip1Description();
    case PlayerType.MediumShip1:
      return createMediumShip1Description();
    case PlayerType.BigShip1:
      return createBigShip1Description();
  }
};
