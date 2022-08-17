package finalmp.models.events

import finalmp.models.game._

sealed trait GameEvent

object GameEvent {
  case class PlayerConnect(player: Player) extends GameEvent

  case class PlayerDisconnect(id: PlayerId) extends GameEvent

  case class PlayerUpdate(playerUpdate: PlayerUpdateInfo) extends GameEvent
}

case class PlayerUpdateInfo(
  id: PlayerId,
  position: Position,
  weapons: Map[PlayerWeaponId, PlayerWeapon],
)
