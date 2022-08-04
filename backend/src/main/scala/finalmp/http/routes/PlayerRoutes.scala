package finalmp.http.routes

import cats.effect._
import cats.syntax.all._
import io.circe.syntax._
import org.http4s._
import org.http4s.dsl.Http4sDsl
import org.http4s.circe.CirceEntityCodec._
import finalmp.controllers.PlayerController

class PlayerRoutes[F[_]: Sync](
  controller: PlayerController
) extends Http4sDsl[F] {
  def routes: HttpRoutes[F] = HttpRoutes.of[F] {
    case GET -> Root / "hello" / name =>
      Ok(s"Hello, $name!")

    case req @ POST -> Root / "connect" => {
      Ok(controller.addPlayer().asJson.noSpaces)
    }
  }
}
