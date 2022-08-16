package finalmp.models.game

import cats.data.NonEmptyList

final case class PlayerId(value: String) extends AnyVal
final case class PlayerName(value: String) extends AnyVal
final case class PlayerTypeId(value: String) extends AnyVal

final case class Player(
  id: PlayerId,
  name: PlayerName,
  position: Position,
  health: Int,
  shields: Int,
  collider: NonEmptyList[Point],
  weapons: Map[PlayerWeaponId, PlayerWeapon],
)

// predefined weapon id based on PlayerId + player.type
final case class PlayerWeaponId(value: String) extends AnyVal

final case class PlayerWeapon(
  id: PlayerWeaponId,
  position: Position,
  health: Int, // probably won't be implemented in scope of this project
)
