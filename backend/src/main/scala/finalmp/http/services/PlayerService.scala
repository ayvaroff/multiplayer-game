package finalmp.http.services

import finalmp.controllers.PlayerController
import finalmp.models.game.PlayerTypeId
import finalmp.models.game.codecs.JsonCodecs.encoderPlayer
import finalmp.http.decoders.PlayerServiceDecoder._
import cats.effect._
import cats.syntax.all._
import io.circe.syntax._
import org.http4s._
import org.http4s.dsl.Http4sDsl
import org.http4s.circe.CirceEntityCodec._

class PlayerService[F[_]: Sync](
  controller: PlayerController,
) extends Http4sDsl[F] {

  def routes: HttpRoutes[F] = HttpRoutes.of[F] {
    case req @ POST -> Root / "connect" => {
      req.as[PlayerTypeIdRequest].flatMap { playerTypeId =>
        controller.createPlayer(PlayerTypeId(playerTypeId.value)) match {
          case Some(player) => Ok(player.asJson)
          case None => BadRequest()
        }
      }
    }

    case req @ POST -> Root / "hello" =>
      req.as[PlayerIdRequest].flatMap { playerId =>
        Ok(s"Hello, ${playerId.value}!")
      }
  }
}
