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

  def updatePlayer(playerUpdate: PlayerUpdateInfo): World =
    world.players.get(playerUpdate.id) match {
      case Some(player) => {
        world = new World(
          id = world.id,
          createdAt = world.createdAt,
          players = world.players + (playerUpdate.id -> Player(
            id = player.id,
            name = player.name,
            playerTypeId = player.playerTypeId,
            position = playerUpdate.position,
            health = player.health,
            shields = player.shields,
            collider = player.collider,
            weapons = playerUpdate.weapons,
          )),
          projectiles = world.projectiles,
          entities = world.entities,
        )
        world
      }
      case None => world
    }
}
