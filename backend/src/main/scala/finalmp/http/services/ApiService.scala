package finalmp.http.services

import finalmp.controllers.PlayerController
import cats.effect._
import org.http4s._
import org.http4s.dsl.Http4sDsl

class ApiService[F[_]: Sync](
  controller: PlayerController,
) extends Http4sDsl[F] {

  // this is just a show case of possible API service
  // not implemented in scope of this project
  def routes: HttpRoutes[F] = HttpRoutes.of[F] {
    case GET -> Root / "games" =>
      Ok("Get and display list of active games")

    case GET -> Root / "players" => {
      Ok("Get and display list of players")
    }
  }
}
