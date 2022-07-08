package finalmp.http.routes

import cats.effect._
import cats.syntax.all._
import org.http4s._
import org.http4s.dsl.io._
import org.http4s.headers._
import org.http4s.implicits._

class PlayerRoutes[F[_]: ConcurrentEffect] {
  def routes: HttpRoutes[F] = HttpRoutes.of[F] {
    case GET -> Root / "hello" / name =>
      Ok(s"Hello, $name!")

    case req @ POST -> Root / "hello" =>
      Ok(req.as[String].map(name => s"Hello again, $name!"))
  }
}
