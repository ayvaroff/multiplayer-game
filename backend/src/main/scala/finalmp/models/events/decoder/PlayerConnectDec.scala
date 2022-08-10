package finalmp.models.events.decoder

import finalmp.models.events.decoder.Utils.getValue
import finalmp.models.events.GameEvent
import io.circe.{Decoder, HCursor}

object PlayerDisconnectDec {
  implicit val decodePlayerDisconnect: Decoder[GameEvent.PlayerDisconnect] = new Decoder[GameEvent.PlayerDisconnect] {
    override def apply(c: HCursor): Decoder.Result[GameEvent.PlayerDisconnect] = for {
      playerId <- getValue[String](c, "data.playerId")
    } yield GameEvent.PlayerDisconnect(playerId)
  }
}
