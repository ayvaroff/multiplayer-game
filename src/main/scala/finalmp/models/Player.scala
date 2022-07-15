package finalmp.models

import io.circe._
import io.circe.generic.semiauto._
import io.circe.generic.JsonCodec

final case class PlayerId(value: String) extends AnyVal
object PlayerId {
  implicit val playerIdEncoder: Encoder[PlayerId] = deriveEncoder
  implicit val playerIdDecoder: Decoder[PlayerId] = deriveDecoder
}

final case class PlayerName(value: String) extends AnyVal
object PlayerName {
  implicit val playerNameEncoder: Encoder[PlayerName] = deriveEncoder
  implicit val playerNamerDecoder: Decoder[PlayerName] = deriveDecoder
}

final case class PlayerPosition(x: Double, y: Double, rotation: Double)
object PlayerPosition {
  implicit val playerPositionEncoder: Encoder[PlayerPosition] = deriveEncoder
  implicit val playerPositionDecoder: Decoder[PlayerPosition] = deriveDecoder
}

final case class Player(id: PlayerId, name: PlayerName, position: PlayerPosition)
object Player {
  implicit val playerEncoder: Encoder[Player] = deriveEncoder[Player]
  implicit val playerDecoder: Decoder[Player] = deriveDecoder[Player]
}
