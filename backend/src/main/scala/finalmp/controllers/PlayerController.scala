package finalmp.controllers

import finalmp.models.game._
import finalmp.models.game.configs.{PlayerTypesConfig, GameConfig}
import scala.util.Random
import cats.data.NonEmptyList

final case class PlayerController(
  playerConfig: PlayerTypesConfig.Config,
  gameConfig: GameConfig,
) {
  // it is not required to store player data in the controller in scope of this project
  var players = Map[PlayerId, Player]()

  def createPlayer(playerTypeId: String): Option[Player] =
    for {
      playerTypeData <- playerConfig.get(playerTypeId)
      playerId = Utils.createRandomId()
      playerPosition = Utils.createRandomPosition(gameConfig)
      playerWeapon = PlayerWeapon(
        id = PlayerWeaponId(s"${playerId}_weapon_1"),
        position = Position(5.0, 3, 60),
        health = 100,
      )
      collider = List(
        Point((0.0, 0.0)),
        Point((10.0, 10.0)),
      )
    } yield new Player(
      id = PlayerId(playerId),
      name = PlayerName(s"Player_$playerId"),
      // randomize player position data
      // TODO: get values according to game world state
      position = playerPosition,
      health = 100,
      shields = 100,
      collider = NonEmptyList(collider.head, collider.tail),
      weapons = Map(
        playerWeapon.id -> playerWeapon
      )
    )
}
