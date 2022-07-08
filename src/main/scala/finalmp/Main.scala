package finalmp

import cats.effect.{ExitCode, IO, IOApp}
import finalmp.http.HttpServer

object Main extends IOApp {
  def run(args: List[String]): IO[ExitCode] = {
    val httpServer = new HttpServer[IO]()
    httpServer.start().as(ExitCode.Success)
  }
    // args.headOption match {
    //   case Some(name) =>
    //     IO(println(s"Hello, $name.")).as(ExitCode.Success)
    //   case None =>
    //     IO(System.err.println("Usage: MyApp name")).as(ExitCode(2))
    // }
}
