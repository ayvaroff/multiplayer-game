package finalmp.http

import finalmp.controllers.{PlayerController, LobbyController, WorldController}
import finalmp.http.services.{PlayerService, GameService, ApiService}
import finalmp.http.HttpConfig.HttpServerConfig
import finalmp.models.events.ServerEvent
import finalmp.models.game.World
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

class HttpServer[F[_]: ConcurrentEffect: Timer](
  config: HttpServerConfig,
  playerController: PlayerController,
  worldController: WorldController,
) {

  private def httpApp(
    gameQueue: Queue[F, WebSocketFrame],
    gameTopic: Topic[F, ServerEvent]
  ): HttpRoutes[F] = Router(
    "/api" -> new ApiService(playerController).routes,
    "/player" -> new PlayerService(playerController).routes,
    "/game" -> new GameService(gameQueue, gameTopic).routes,
  )

  def start(): F[Unit] =
    for {
      gameQueue <- Queue.bounded[F, WebSocketFrame](1000)
      initialWorldRef <- Ref.of[F, World](worldController.world)
      initialGameState <- initialWorldRef.get
      gameTopic <- Topic[F, ServerEvent](initial = ServerEvent.WorldUpdate(initialGameState))
      lobbyController = new LobbyController[F](initialWorldRef, gameQueue, gameTopic, worldController)
      tempo = BlazeServerBuilder[F](ExecutionContext.global)
        .bindHttp(config.port, config.host)
        .withHttpApp(CORS(httpApp(gameQueue, gameTopic), corsConfig).orNotFound)
        .serve
      lobbyStreams = lobbyController.lobbyStreams
      _ <- tempo.merge(lobbyStreams)
      .compile
      .drain
    } yield ()

    private val corsConfig: CORSConfig =
      CORSConfig(
        anyOrigin = config.cors.anyOrigin,
        allowedOrigins = config.cors.allowedOrigins.toSet,
        allowCredentials = config.cors.allowCredentials,
        maxAge = config.cors.maxAge.toSeconds,
      )
}
