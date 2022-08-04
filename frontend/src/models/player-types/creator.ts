import { PlayerType } from "config";

import { createPlayerTypeOneDescription } from "./type_1";
import { createPlayerTypeTwoDescription } from "./type_2";
import { createPlayerTypeThreeDescription } from "./type_3";
import type { PlayerTypeDescription } from "./types";

export const createPlayerTypeData = (playerType: PlayerType): PlayerTypeDescription => {
  switch (playerType) {
    case PlayerType.TypeOne:
      return createPlayerTypeOneDescription();
    case PlayerType.TypeTwo:
      return createPlayerTypeTwoDescription();
    case PlayerType.TypeThree:
      return createPlayerTypeThreeDescription();
  }
};
