package finalmp.models

import cats.data.NonEmptyList

final case class Room(id: String, players: NonEmptyList[Player])