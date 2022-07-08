package finalmp.http.routes

import cats.effect._
import cats.syntax.all._
import org.http4s._
import org.http4s.dsl.Http4sDsl

class PlayerRoutes[F[_]: Sync] extends Http4sDsl[F] {
  def routes: HttpRoutes[F] = HttpRoutes.of[F] {
    case GET -> Root / "hello" / name =>
      Ok(s"Hello, $name!")

    case req @ POST -> Root / "hello" =>
      Ok(req.as[String].map(name => s"Hello again, $name!"))
  }
}
