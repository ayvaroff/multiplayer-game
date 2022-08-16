package finalmp.models.game.configs

import finalmp.models.game.configs.GameConfig.WorldSize

final case class GameConfig(
  worldSize: WorldSize,
  safeAreaMargin: Int,
)

object GameConfig {
  final case class WorldSize(
    min: Int,
    max: Int,
  )
}
