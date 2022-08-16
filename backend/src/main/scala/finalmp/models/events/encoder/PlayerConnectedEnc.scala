package finalmp.models.events.encoder

import finalmp.models.game.codecs.JsonCodecs.encoderPlayer
import finalmp.models.events.ServerEvent
import io.circe.{Encoder, Json}
import io.circe.syntax._

object PlayerConnectedEnc {
  implicit val playerConnectedEnc: Encoder[ServerEvent.PlayerConnected] = Encoder.instance { data =>
    Json.obj(
      "type" -> "player.connected".asJson,
      "data" -> data.player.asJson,
    )
  }
}
