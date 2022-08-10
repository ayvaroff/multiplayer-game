package finalmp.controllers

import fs2.Stream
import fs2.concurrent.{Topic, Queue}
import cats.effect.concurrent.Ref
import cats.effect.{Sync, ConcurrentEffect, Timer}
import finalmp.models._
import finalmp.models.events.decoder.GameEventDec._
import finalmp.models.events.GameEvent
import org.http4s.websocket.WebSocketFrame
import scala.concurrent.duration.FiniteDuration
import java.util.concurrent.TimeUnit
import io.circe.parser._
import cats.effect.internals.IORunLoop

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
          val decodedMessage = decode[GameEvent](message.trim)

          val taskA = refGameState.set(TestClasses.GameState(TestClasses.PlayerMove(message.trim)))
          val taskB = decodedMessage match {
            case Right(GameEvent.PlayerConnect(_)) => gameTopic.publish1(TestClasses.GameState(TestClasses.PlayerMove("Connected")))
            case Right(GameEvent.PlayerDisconnect(_)) => println("player disconnected")
            case Right(GameEvent.PlayerUpdate(_)) => println("player updated")
            case _ => println("something is wrong")
          }
          
          val tasks = taskA *> taskB
          tasks[F].unsafeRunSync()
        }
        case _ => refGameState.set(TestClasses.GameState(TestClasses.PlayerMove("unknown")))
      }
}
