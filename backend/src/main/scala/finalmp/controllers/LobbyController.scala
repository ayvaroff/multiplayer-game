package finalmp.controllers

import fs2.Stream
import fs2.concurrent.{Topic, Queue}
import java.util.UUID
import scala.util.Random
import cats.effect.concurrent.Ref
import cats.effect.{Sync, ConcurrentEffect, Timer}
import finalmp.models._
import org.http4s.websocket.WebSocketFrame
import scala.concurrent.duration.FiniteDuration
import java.util.concurrent.TimeUnit
import fs2.Pipe
import io.circe.Json

object TestClasses {
  sealed trait GameEvent
  final case object GameTick extends GameEvent
  final case class PlayerMove(input: String) extends GameEvent

  final case class GameState(lastMove: PlayerMove)
}

final case class LobbyController[F[_]: ConcurrentEffect: Timer](
  refGameState: Ref[F, TestClasses.GameState],
  gameQueue: Queue[F, WebSocketFrame],
  gameTopic: Topic[F, TestClasses.GameState],
) {
  def lobbyStreams(): Stream[F, Unit] = {
    tickStream.merge(playerWorldStream)
  }

  private val tickStream: Stream[F, Unit] =
    Stream
      .awakeEvery[F](FiniteDuration(10, TimeUnit.SECONDS))
      .evalMap(_ => refGameState.get)
      .through(gameTopic.publish)

  private val playerWorldStream: Stream[F, Unit] =
    gameQueue
      .dequeue
      .evalMap {
        case WebSocketFrame.Text(message, _) => {
          // val parsedValue: Json = Json.parse(message).getOrElse().hcursor
          refGameState.set(TestClasses.GameState(TestClasses.PlayerMove(message.trim)))
        }
        case _ => refGameState.set(TestClasses.GameState(TestClasses.PlayerMove("unknown")))
      }
}
