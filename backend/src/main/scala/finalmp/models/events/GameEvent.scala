package finalmp.models.events

import finalmp.models.game.{Player, PlayerId}

sealed trait GameEvent

object GameEvent {
  case class PlayerConnect(player: Player) extends GameEvent

  case class PlayerDisconnect(id: PlayerId) extends GameEvent

  case class PlayerUpdate(playerId: String) extends GameEvent
}
