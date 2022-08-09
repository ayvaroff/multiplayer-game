package finalmp.http

import cats.effect._
import cats.syntax.all._
import fs2.concurrent.{Topic, Queue}
import org.http4s._
import org.http4s.implicits.http4sKleisliResponseSyntaxOptionT
import org.http4s.server.Router
import cats.effect.concurrent.Ref
import org.http4s.server.blaze.BlazeServerBuilder
import org.http4s.websocket.WebSocketFrame
import scala.concurrent.ExecutionContext
import finalmp.http.routes.PlayerRoutes
import finalmp.controllers.{PlayerController, LobbyController, TestClasses}

class HttpServer[F[_]: ConcurrentEffect: Timer](
  playerController: PlayerController,
) {

  private def httpApp(
    gameQueue: Queue[F, WebSocketFrame],
    gameTopic: Topic[F, TestClasses.GameState]
  ): HttpRoutes[F] = Router("/api" -> new PlayerRoutes(playerController, gameQueue, gameTopic).routes)

  def start(): F[Unit] =
    for {
      gameQueue <- Queue.bounded[F, WebSocketFrame](1000)
      initialGameStateRef <- Ref.of[F, TestClasses.GameState](TestClasses.GameState(TestClasses.PlayerMove("Start")))
      initialGameState <- initialGameStateRef.get
      gameTopic <- Topic[F, TestClasses.GameState](initial = initialGameState)
      lobbyController = new LobbyController[F](initialGameStateRef, gameQueue, gameTopic)
      // _ <- lobbyController.lobbyStreams(initialGameStateRef).compile.drain
      tempo = BlazeServerBuilder[F](ExecutionContext.global)
        .bindHttp(9002, "localhost")
        .withHttpApp(httpApp(gameQueue, gameTopic).orNotFound)
        .serve
      lobbyStreams = lobbyController.lobbyStreams
      _ <- tempo.merge(lobbyStreams)
      .compile
      .drain
    } yield ()
}
