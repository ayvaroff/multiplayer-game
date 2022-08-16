package finalmp.models.events.decoder

import finalmp.models.events.decoder.Utils.getValue
import finalmp.models.events.GameEvent
import finalmp.models.game.Player
import finalmp.models.game.codecs.JsonCodecs.decoderPlayer
import io.circe.{Decoder, HCursor}

object PlayerConnectDec {
  implicit val decodePlayerConnect: Decoder[GameEvent.PlayerConnect] = new Decoder[GameEvent.PlayerConnect] {
    override def apply(c: HCursor): Decoder.Result[GameEvent.PlayerConnect] = for {
      player <- getValue[Player](c, "data")
    } yield GameEvent.PlayerConnect(player)
  }
}
