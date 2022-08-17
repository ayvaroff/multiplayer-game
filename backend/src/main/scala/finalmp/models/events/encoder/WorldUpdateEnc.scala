package finalmp.models.events.encoder

import finalmp.models.game.codecs.JsonCodecs.encoderWorld
import finalmp.models.events.ServerEvent
import io.circe.{Encoder, Json}
import io.circe.syntax._

object WorldUpdateEnc {
  implicit val worldUpdateEnc: Encoder[ServerEvent.WorldUpdate] = Encoder.instance { data =>
    Json.obj(
      "type" -> "world.update".asJson,
      "data" -> data.world.asJson,
    )
  }
}
