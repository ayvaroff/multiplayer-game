package finalmp.http

import finalmp.http.routes.PlayerRoutes
import cats.effect._
import org.http4s._
import org.http4s.implicits.http4sKleisliResponseSyntaxOptionT
import org.http4s.server.Router
import org.http4s.server.blaze.BlazeServerBuilder

import scala.concurrent.ExecutionContext
import finalmp.controllers.PlayerController

class HttpServer[F[_]: ConcurrentEffect: Timer](
  playerController: PlayerController
) {
  private val httpApp: HttpRoutes[F] = Router("/api" -> new PlayerRoutes(playerController).routes)

  def start(): F[Unit] =
    BlazeServerBuilder[F](ExecutionContext.global)
      .bindHttp(9002, "localhost")
      .withHttpApp(httpApp.orNotFound)
      .serve
      .compile
      .drain
}
