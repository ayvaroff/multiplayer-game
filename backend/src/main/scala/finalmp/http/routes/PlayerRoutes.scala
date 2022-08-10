package finalmp.http.routes

import cats.effect._
import cats.syntax.all._
import io.circe.parser._
import io.circe.syntax._
import io.circe.generic.auto._
import org.http4s._
import org.http4s.dsl.Http4sDsl
import org.http4s.circe.CirceEntityCodec._
import fs2.{Stream, Pipe}
import fs2.concurrent.{Topic, Queue}
import org.http4s.server.websocket.WebSocketBuilder
import org.http4s.websocket.WebSocketFrame
import scala.concurrent.duration._
import java.util.concurrent.TimeUnit
import finalmp.controllers.{PlayerController, TestClasses}
import finalmp.models.{Player, PlayerId}

class PlayerRoutes[F[_]: Sync](
  controller: PlayerController,
  gameQueue: Queue[F, WebSocketFrame],
  gameTopic: Topic[F, TestClasses.GameState],
) extends Http4sDsl[F] {
  def routes: HttpRoutes[F] = HttpRoutes.of[F] {
    case GET -> Root / "hello" / name =>
      Ok(s"Hello, $name!")

    case req @ POST -> Root / "connect" => {
      // roomManager.connect()
      // Ok(controller.addPlayer(skin: SkinType).asJson.noSpaces)
      Ok(controller.addPlayer().asJson.noSpaces)
    }

    case req @ POST -> Root / "disconnect" => {
      req.as[PlayerId].flatMap { playerId =>
        controller.removePlayer(playerId)
        Ok("Ok")
      }
    }

    // case GET -> Root / "game" / id =>
    case GET -> Root / "game" =>
      WebSocketBuilder[F].build(
        // Sink, where the incoming WebSocket messages from the client are pushed to.
        receive = gameQueue.enqueue,
        // Outgoing stream of WebSocket messages to send to the client.
        send = gameTopic.subscribe(10).map(as => WebSocketFrame.Text(as.toString())),
      )
  }
}
