package finalmp.controllers

import finalmp.models.game._
import finalmp.models.game.configs.GameConfig
import java.util.UUID
import scala.util.Random

object Utils {
  def createRandomId(): String = UUID.randomUUID().toString

  def createRandomCoordinate(config: GameConfig): Double =
    Random.between(
      (config.worldSize.min + config.safeAreaMargin).toDouble,
      (config.worldSize.max - config.safeAreaMargin).toDouble,
    )

  def createRandomRotation(): Int = Random.nextInt(360)

  def createRandomPosition(config: GameConfig): Position =
    Position(createRandomCoordinate(config), createRandomCoordinate(config), createRandomRotation())
}
