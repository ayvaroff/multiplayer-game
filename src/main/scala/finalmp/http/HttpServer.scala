package finalmp.http

import finalmp.http.routes.PlayerRoutes

import cats.effect._
import cats.data.Kleisli
import cats.syntax.all._
import org.http4s._
import org.http4s.server.Router
import org.http4s.server.blaze.BlazeServerBuilder
import scala.concurrent.ExecutionContext

class HttpServer[F[_]: ConcurrentEffect: Timer] {
  private val httpApp: HttpApp[F] = Router("/api" -> new PlayerRoutes().routes).orNotFound

  def start(): F[Unit] =
    BlazeServerBuilder[F](ExecutionContext.global)
      .bindHttp(9002, "localhost")
      .withHttpApp(httpApp)
      .serve
      .compile
      .drain
}