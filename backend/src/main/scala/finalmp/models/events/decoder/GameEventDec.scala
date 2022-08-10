package finalmp.models.events.decoder

import finalmp.models.events.GameEvent
import finalmp.models.events.GameEvent.{PlayerConnect, PlayerDisconnect, PlayerUpdate}
import io.circe.{Decoder, DecodingFailure, HCursor}
import io.circe.CursorOp

object GameEventDec {
  import finalmp.models.events.decoder.PlayerConnectDec._
  import finalmp.models.events.decoder.PlayerDisconnectDec._
  import finalmp.models.events.decoder.PlayerUpdateDec._

  implicit val decoderForGameEvent: Decoder[GameEvent] = new Decoder[GameEvent] {
    override def apply(c: HCursor): Decoder.Result[GameEvent] = {
      for {
        messageType <- c.downField("type").as[String]
        out <- messageType match {
          case "player.connect" => Decoder[PlayerConnect].apply(c)
          case "player.disconnect" => Decoder[PlayerDisconnect].apply(c)
          case "player.update" => Decoder[PlayerUpdate].apply(c)
          case _ => Left(DecodingFailure(s"Unknown game event message ${messageType}", CursorOp.DownField("type") :: Nil))
        }
      } yield out
    }
  }
}
