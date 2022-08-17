package finalmp.models.events.encoder

import finalmp.models.game.codecs.JsonCodecs.encoderPlayerId
import finalmp.models.events.ServerEvent
import io.circe.{Encoder, Json}
import io.circe.syntax._

object PlayerDisconnectedEnc {
  implicit val playerDisconnectedEnc: Encoder[ServerEvent.PlayerDisconnected] = Encoder.instance { data =>
    Json.obj(
      "type" -> "player.disconnected".asJson,
      "data" -> Json.obj(
        "id" -> data.id.asJson
      ),
    )
  }
}
