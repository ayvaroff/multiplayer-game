package finalmp.models.events.encoder

import finalmp.models.events.ServerEvent
import finalmp.models.events.ServerEvent.{PlayerConnected, PlayerDisconnected, WorldUpdate}
import io.circe.{Encoder, Json}
import io.circe.syntax._

object ServerEventEnc {
  import finalmp.models.events.encoder.PlayerConnectedEnc._
  import finalmp.models.events.encoder.PlayerDisconnectedEnc._
  import finalmp.models.events.encoder.WorldUpdateEnc._

  implicit val encoderForServerEvent: Encoder[ServerEvent] = Encoder.instance {
    case event @ ServerEvent.PlayerConnected(_) => event.asJson
    case event @ ServerEvent.PlayerDisconnected(_) => event.asJson
    case event @ ServerEvent.WorldUpdate(_) => event.asJson
  }
}
