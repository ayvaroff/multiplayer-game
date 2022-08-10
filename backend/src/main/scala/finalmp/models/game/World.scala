package finalmp.models.game

import java.time.Instant
import io.circe.generic.auto._

final case class WorldId(value: String) extends AnyVal

final case class World(
  id: WorldId,
  createdAt: Instant,
  players: Map[PlayerId, Player],
  projectiles: List[Projectile],
  entities: List[WorldEntity],
)
