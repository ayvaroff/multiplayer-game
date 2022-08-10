package finalmp.models.game

import io.circe.generic.auto._
import cats.data.NonEmptyList

final case class WorldEntityId(value: String) extends AnyVal
final case class WorldEntityType(value: String) extends AnyVal

final case class WorldEntity(
  id: WorldEntityId,
  `type`: WorldEntityType,
  health: Int,
  position: Position,
  collider: NonEmptyList[Point],
)
