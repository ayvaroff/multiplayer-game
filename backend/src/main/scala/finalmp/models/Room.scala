package finalmp.models

import cats.data.NonEmptyMap

final case class Room(id: String, players: NonEmptyMap[PlayerId, Player])
