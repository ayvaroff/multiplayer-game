package finalmp.models.events.decoder

import finalmp.models.events.decoder.Utils.getValue
import finalmp.models.events.GameEvent
import io.circe.{Decoder, HCursor}

object PlayerUpdateDec {
  implicit val decodePlayerUpdate: Decoder[GameEvent.PlayerUpdate] = new Decoder[GameEvent.PlayerUpdate] {
    override def apply(c: HCursor): Decoder.Result[GameEvent.PlayerUpdate] = for {
      playerId <- getValue[String](c, "data.playerId")
    } yield GameEvent.PlayerUpdate(playerId)
  }
}
