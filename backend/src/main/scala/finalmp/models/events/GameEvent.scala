package finalmp.models.events

sealed trait GameEvent

object GameEvent {
  case class PlayerConnect(playerId: String) extends GameEvent

  case class PlayerDisconnect(playerId: String) extends GameEvent

  case class PlayerUpdate(playerId: String) extends GameEvent
}
