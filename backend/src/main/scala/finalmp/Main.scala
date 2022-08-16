package finalmp

import finalmp.AppConfig
import finalmp.http.HttpServer
import finalmp.controllers.PlayerController
import cats.effect.{ExitCode, IO, IOApp}

object Main extends IOApp {
  def run(args: List[String]): IO[ExitCode] =
    for {
      _ <- IO(println("Starting server..."))
      config <- AppConfig.load[IO]
      playerController = new PlayerController()
      httpServer = new HttpServer[IO](config.http.server, playerController)
      _ <- httpServer.start()
    } yield ExitCode.Success
}
