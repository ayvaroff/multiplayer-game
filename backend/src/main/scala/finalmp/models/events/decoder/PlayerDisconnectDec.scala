package finalmp.models.events.decoder

import finalmp.models.events.decoder.Utils.getValue
import finalmp.models.events.GameEvent
import io.circe.{Decoder, HCursor}

object PlayerConnectDec {
  implicit val decodePlayerConnect: Decoder[GameEvent.PlayerConnect] = new Decoder[GameEvent.PlayerConnect] {
    override def apply(c: HCursor): Decoder.Result[GameEvent.PlayerConnect] = for {
      playerId <- getValue[String](c, "data.playerId")
    } yield GameEvent.PlayerConnect(playerId)
  }
}
