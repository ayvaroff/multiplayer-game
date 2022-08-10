package finalmp.models.game

import io.circe.generic.auto._

final case class ProjectileId(value: String) extends AnyVal
final case class ProjectileType(value: String) extends AnyVal

final case class Projectile(
  id: ProjectileId,
  `type`: ProjectileType,
  position: Position,
  speed: Double,
  parentPlayerId: PlayerId,
  radius: Int, // not sure this is required
)
