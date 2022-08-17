package finalmp.models.events

import finalmp.models.game.{Player, PlayerId, World}

sealed trait ServerEvent

object ServerEvent {
  case class PlayerConnected(player: Player) extends ServerEvent

  case class PlayerDisconnected(id: PlayerId) extends ServerEvent

  case class WorldUpdate(world: World) extends ServerEvent
}
