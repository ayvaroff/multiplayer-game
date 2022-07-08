package finalmp

import cats.effect.{ExitCode, IO, IOApp}
import finalmp.http.HttpServer

object Main extends IOApp {
  def run(args: List[String]): IO[ExitCode] = {
    val httpServer = new HttpServer[IO]()
    httpServer.start().as(ExitCode.Success)
  }
}
