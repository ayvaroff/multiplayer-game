package finalmp.http

import finalmp.controllers.{PlayerController, LobbyController, TestClasses}
import finalmp.http.services.{PlayerService, GameService, ApiService}
import cats.effect._
import cats.syntax.all._
import cats.effect.concurrent.Ref
import org.http4s._
import org.http4s.implicits.http4sKleisliResponseSyntaxOptionT
import org.http4s.server.Router
import org.http4s.server.blaze.BlazeServerBuilder
import org.http4s.server.middleware.{CORS, CORSConfig}
import org.http4s.websocket.WebSocketFrame
import fs2.concurrent.{Topic, Queue}
import scala.concurrent.ExecutionContext
import scala.concurrent.duration._

class HttpServer[F[_]: ConcurrentEffect: Timer](
  playerController: PlayerController,
) {

  private def httpApp(
    gameQueue: Queue[F, WebSocketFrame],
    gameTopic: Topic[F, TestClasses.GameState]
  ): HttpRoutes[F] = Router(
    "/api" -> new ApiService(playerController).routes,
    "/player" -> new PlayerService(playerController).routes,
    "/game" -> new GameService(gameQueue, gameTopic).routes,
  )

  def start(): F[Unit] =
    for {
      gameQueue <- Queue.bounded[F, WebSocketFrame](1000)
      initialGameStateRef <- Ref.of[F, TestClasses.GameState](TestClasses.GameState(TestClasses.PlayerMove("Start")))
      initialGameState <- initialGameStateRef.get
      gameTopic <- Topic[F, TestClasses.GameState](initial = initialGameState)
      lobbyController = new LobbyController[F](initialGameStateRef, gameQueue, gameTopic)
      tempo = BlazeServerBuilder[F](ExecutionContext.global)
        .bindHttp(9002, "localhost")
        .withHttpApp(CORS(httpApp(gameQueue, gameTopic), corsConfig).orNotFound)
        .serve
      lobbyStreams = lobbyController.lobbyStreams
      _ <- tempo.merge(lobbyStreams)
      .compile
      .drain
    } yield ()

    private val corsConfig: CORSConfig =
      CORSConfig(
        anyOrigin = false,
        allowedOrigins = List("http://localhost:3000").toSet,
        allowCredentials = false,
        maxAge = 1.day.toSeconds,
      )
}
