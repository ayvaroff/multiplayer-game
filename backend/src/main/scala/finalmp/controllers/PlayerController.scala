package finalmp.controllers

import finalmp.models.game._
import scala.util.Random
import cats.data.NonEmptyList

final case class PlayerController() {
  // it is not required to store player data in the controller in scope of this project
  var players = Map[PlayerId, Player]()

  def createPlayer(): Player = {
    val playerId = Utils.createRandomId()

    // TODO: make this initialization per player type
    // store player type information with https://github.com/pureconfig/pureconfig
    val playerWeapon = PlayerWeapon(
      id = PlayerWeaponId(s"${playerId}_weapon_1"),
      position = Position(5.0, 3, 60),
      health = 100,
    )

    val collider = List(
      Point((0.0, 0.0)),
      Point((10.0, 10.0)),
    )

    Player(
      id = PlayerId(playerId),
      name = PlayerName(s"Player_$playerId"),
      // randomize player position data
      // TODO: get values according to game world state
      position = Position(Random.between(10.0, 110.0), Random.between(0.0, 100.0), Random.nextInt(360)),
      health = 100,
      shields = 100,
      collider = NonEmptyList(collider.head, collider.tail),
      weapons = Map(
        playerWeapon.id -> playerWeapon
      )
    )
  }
}
