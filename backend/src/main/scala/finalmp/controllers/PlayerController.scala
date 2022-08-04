package finalmp.controllers

import finalmp.models._
import java.util.UUID

final case class PlayerController() {
  val players = List[Player]()

  def addPlayer(): Player = {
    val newPlayer = Player(
      PlayerId(UUID.randomUUID().toString),
      PlayerName("Player_" + (players.length + 1).toString),
      PlayerPosition(0, 0, 0)
    )
  
    players.concat(List(newPlayer))

    newPlayer
  }
}
