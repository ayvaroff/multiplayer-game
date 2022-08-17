package finalmp

import finalmp.AppConfig
import finalmp.http.HttpServer
import finalmp.controllers.{PlayerController, WorldController}
import cats.effect.{ExitCode, IO, IOApp}

object Main extends IOApp {
  def run(args: List[String]): IO[ExitCode] =
    for {
      _ <- IO(println("Starting server..."))
      config <- AppConfig.load[IO]
      playerController = new PlayerController(config.playerTypes, config.game)
      worldController = new WorldController()
      httpServer = new HttpServer[IO](config.http.server, playerController, worldController)
      _ <- httpServer.start()
    } yield ExitCode.Success
}
