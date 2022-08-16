package finalmp.models.game.configs

import finalmp.models.game.Point

object PlayerTypesConfig {
  final case class PlayerType(
    name: String,
    collider: List[Point],
    maxHealth: Int,
    maxShield: Int,
    weapons: Map[String, PlayerTypeWeapon],
  )

  final case class PlayerTypeWeapon(
    name: String,
    health: Int,
    // relative position to the ship
    offset: PlayerTypeWeaponOffset,
  )

  final case class PlayerTypeWeaponOffset(
    x: Int,
    y: Int,
  )
}
