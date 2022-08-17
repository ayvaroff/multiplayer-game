package finalmp.controllers

import finalmp.models.game._
import finalmp.models.game.configs.GameConfig
import java.util.UUID
import scala.util.Random
import scala.math.Pi

object Utils {
  def createRandomId(): String = UUID.randomUUID().toString

  def createRandomCoordinate(config: GameConfig): Double =
    Random.between(
      -100.0,
      100.0,
      // (config.worldSize.min + config.safeAreaMargin).toDouble,
      // (config.worldSize.max - config.safeAreaMargin).toDouble,
    )

  def createRandomRotation(): Double = Random.between(0.0, 2.0 * Pi) // random rotation value in radians

  def createRandomPosition(config: GameConfig): Position =
    Position(createRandomCoordinate(config), createRandomCoordinate(config), createRandomRotation())
}
