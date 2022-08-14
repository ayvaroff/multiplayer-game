package finalmp.controllers

import fs2.Stream
import fs2.concurrent.{Topic, Queue}
import cats.effect.concurrent.Ref
import cats.effect.{Sync, ConcurrentEffect, Timer}
import cats.syntax.flatMap._
import cats.syntax.functor._
import finalmp.models._
import finalmp.models.events.decoder.GameEventDec._
import finalmp.models.events.GameEvent
import org.http4s.websocket.WebSocketFrame
import scala.concurrent.duration.FiniteDuration
import java.util.concurrent.TimeUnit
import io.circe.parser._

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
      .evalMap(_ => {
        // TODO: how to stop/close stream?
        println("Working?")
        refGameState.get
      })
      .through(gameTopic.publish)

  private val playerWorldStream: Stream[F, Unit] =
    gameQueue
      .dequeue
      .evalMap {
        case WebSocketFrame.Text(message, _) => {
          val decodedMessage = decode[GameEvent](message.trim)

          // TODO: make it work (publish to topic)
          val taskB: F[Unit] = decodedMessage match {
            case Right(GameEvent.PlayerConnect(_)) => {
              for {
                _ <- gameTopic.publish1(TestClasses.GameState(TestClasses.PlayerMove("Connected")))
                _ <- refGameState.set(TestClasses.GameState(TestClasses.PlayerMove(message.trim)))
              } yield()
            }
            case Right(GameEvent.PlayerDisconnect(_)) => gameTopic.publish1(TestClasses.GameState(TestClasses.PlayerMove("DisConnected")))
            case Right(GameEvent.PlayerUpdate(_)) => refGameState.set(TestClasses.GameState(TestClasses.PlayerMove(message.trim)))
            case _ => Sync[F].delay(println("something is wrong"))
          }
          
          taskB
        }
        case _ => refGameState.set(TestClasses.GameState(TestClasses.PlayerMove("unknown")))
      }
}
