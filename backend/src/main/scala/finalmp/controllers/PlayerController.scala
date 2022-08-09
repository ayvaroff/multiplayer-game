package finalmp.controllers

import java.util.UUID
import scala.util.Random
import finalmp.models._

final case class PlayerController() {
  var players = Map[PlayerId, Player]()

  def addPlayer(): Player = {
    val newPlayer = Player(
      PlayerId(UUID.randomUUID().toString),
      PlayerName("Player_" + (players.size + 1).toString),
      // randomize player position data
      PlayerPosition(Random.between(10.0, 110.0), Random.between(0.0, 100.0), Random.nextInt(360))
    )
  
    players += (newPlayer.id -> newPlayer)

    printf(players.map(pair => pair._1+"="+pair._2).mkString("?","&",""))

    newPlayer
  }

  def removePlayer(playerId: PlayerId) = {
    players -= playerId
  }
}
