package finalmp

import cats.effect.{ExitCode, IO, IOApp}
import finalmp.http.HttpServer
import finalmp.controllers.PlayerController

object Main extends IOApp {
  def run(args: List[String]): IO[ExitCode] =
    for {
      _ <- IO(println("Starting server..."))
      playerController = new PlayerController()
      httpServer = new HttpServer[IO](playerController)
      _ <- httpServer.start()
    } yield ExitCode.Success
}
