package finalmp.controllers

import finalmp.models._
import finalmp.models.game.World
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

final case class LobbyController[F[_]: ConcurrentEffect: Timer](
  refWorld: Ref[F, World],
  gameQueue: Queue[F, WebSocketFrame],
  gameTopic: Topic[F, ServerEvent],
  worldController: WorldController,
) {
  def lobbyStreams(): Stream[F, Unit] = {
    tickStream.merge(playerWorldStream)
  }

  private val tickStream: Stream[F, Unit] =
    Stream
      .awakeEvery[F](FiniteDuration(20, TimeUnit.MILLISECONDS))
      // .awakeEvery[F](FiniteDuration(10, TimeUnit.SECONDS))
      // TODO: make it simple?
      .evalMap(_ => {
        for {
          world <- refWorld.get
        } yield ServerEvent.WorldUpdate(world)
      })
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
                _ <- refWorld.set(worldController.addPlayer(player))
              } yield ()
            }
            case Right(GameEvent.PlayerDisconnect(playerId)) => {
              for {
                // publish message to every player
                _ <- gameTopic.publish1(ServerEvent.PlayerDisconnected(playerId))
                // update game state
                _ <- refWorld.set(worldController.removePlayer(playerId))
              } yield ()
            }
            case Right(GameEvent.PlayerUpdate(updatedPlayer)) => refWorld.set(worldController.updatePlayer(updatedPlayer))
            case _ => Sync[F].delay(println("something is wrong"))
          }
        }
        case _ => Sync[F].delay(println("unknown"))
      }
}
