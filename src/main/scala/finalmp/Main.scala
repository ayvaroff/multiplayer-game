package finalmp

import cats.effect.{ExitCode, IO, IOApp}
import finalmp.http.HttpServer
import finalmp.controllers.PlayerController

object Main extends IOApp {
  def run(args: List[String]): IO[ExitCode] = {
    val playerController = new PlayerController()
    val httpServer = new HttpServer[IO](playerController)

    httpServer.start().as(ExitCode.Success)
  }
}
