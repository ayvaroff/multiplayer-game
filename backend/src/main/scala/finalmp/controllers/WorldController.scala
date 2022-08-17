package finalmp.controllers

import finalmp.models.game._
import finalmp.models.events.PlayerUpdateInfo
import scala.collection.mutable
import java.time.Instant

final case class WorldController() {
  var world = new World(
    id = WorldId(Utils.createRandomId()),
    createdAt = Instant.now(),
  )

  def addPlayer(player: Player): World = {
    world = new World(
      id = world.id,
      createdAt = world.createdAt,
      players = world.players + (player.id -> player),
      projectiles = world.projectiles,
      entities = world.entities,
    )
    world
  }

  def removePlayer(playerId: PlayerId): World = {
    world = new World(
      id = world.id,
      createdAt = world.createdAt,
      players = world.players - playerId,
      projectiles = world.projectiles,
      entities = world.entities,
    )
    world
  }

  def updatePlayer(playerUpdate: PlayerUpdateInfo): World = world //world.players + (playerUpdate.id -> world.players.get(playerUpdate.id))
}
