package finalmp.http.services

import finalmp.controllers.{PlayerController}
import finalmp.models.game.PlayerId
import finalmp.models.game.codecs.JsonCodecs._
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
      Ok(controller.createPlayer().asJson)
    }

    case req @ POST -> Root / "hello" =>
      // payload looks like a plain string "test_id"
      // TODO: fix it to
      // {
      // 	"id": "test_id"
      // }
      req.as[PlayerId].flatMap { playerId =>
        Ok(s"Hello, ${playerId.value}!")
      }
  }
}
