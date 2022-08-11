package finalmp.http.services

import finalmp.controllers.TestClasses
import cats.effect._
import org.http4s._
import org.http4s.dsl.Http4sDsl
import fs2.concurrent.{Topic, Queue}
import org.http4s.server.websocket.WebSocketBuilder
import org.http4s.websocket.WebSocketFrame

class GameService[F[_]: Sync](
  gameQueue: Queue[F, WebSocketFrame],
  gameTopic: Topic[F, TestClasses.GameState],
) extends Http4sDsl[F] {

  def routes: HttpRoutes[F] = HttpRoutes.of[F] {
    // case GET -> Root / "game" / id =>
    case GET -> Root / "run" =>
      WebSocketBuilder[F].build(
        // Sink, where the incoming WebSocket messages from the client are pushed to.
        receive = gameQueue.enqueue,
        // Outgoing stream of WebSocket messages to send to the client.
        send = gameTopic.subscribe(10).map(as => WebSocketFrame.Text(as.toString())),
      )
  }
}
