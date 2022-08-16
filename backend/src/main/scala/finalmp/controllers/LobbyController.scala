package finalmp.controllers

import finalmp.models._
import finalmp.models.events.decoder.GameEventDec._
import finalmp.models.events.GameEvent
import finalmp.models.events.ServerEvent
import fs2.Stream
import fs2.concurrent.{Topic, Queue}
import cats.effect.concurrent.Ref
import cats.effect.{Sync, ConcurrentEffect, Timer}
import cats.syntax.flatMap._
import cats.syntax.functor._
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
  gameTopic: Topic[F, ServerEvent],
) {
  def lobbyStreams(): Stream[F, Unit] = {
    tickStream.merge(playerWorldStream)
  }

  private val tickStream: Stream[F, Unit] =
    Stream
      .awakeEvery[F](FiniteDuration(10, TimeUnit.SECONDS))
      // TODO: make it simple?
      .evalMap(_ => Sync[F].delay(ServerEvent.WorldUpdate(refGameState.get.toString)))
      .through(gameTopic.publish)

  private val playerWorldStream: Stream[F, Unit] =
    gameQueue
      .dequeue
      .evalMap {
        case WebSocketFrame.Text(message, _) => {
          val decodedMessage = decode[GameEvent](message.trim)

          decodedMessage match {
            case Right(GameEvent.PlayerConnect(player)) => {
              for {
                // publish message to every player
                _ <- gameTopic.publish1(ServerEvent.PlayerConnected(player))
                // update game state
                _ <- refGameState.set(TestClasses.GameState(TestClasses.PlayerMove(message.trim)))
              } yield ()
            }
            case Right(GameEvent.PlayerDisconnect(playerId)) => gameTopic.publish1(ServerEvent.PlayerDisconnected(playerId))
            case Right(GameEvent.PlayerUpdate(_)) => refGameState.set(TestClasses.GameState(TestClasses.PlayerMove(message.trim)))
            case _ => Sync[F].delay(println("something is wrong"))
          }
        }
        case _ => refGameState.set(TestClasses.GameState(TestClasses.PlayerMove("unknown")))
      }
}
