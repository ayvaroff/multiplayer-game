package finalmp.controllers

import finalmp.math.MathUtils
import finalmp.models.game._
import finalmp.models.game.configs.{PlayerTypesConfig, GameConfig}
import scala.util.Random
import cats.data.NonEmptyList

final case class PlayerController(
  playerConfig: PlayerTypesConfig.Config,
  gameConfig: GameConfig,
) {
  // it is not required to store player data in the controller in scope of this project
  var players = Map[PlayerId, Player]()

  def createPlayer(playerTypeId: PlayerTypeId): Option[Player] =
    for {
      playerTypeData <- playerConfig.get(playerTypeId.value)
      playerId = Utils.createRandomId()
      playerPosition = Utils.createRandomPosition(gameConfig)
    } yield new Player(
      id = PlayerId(playerId),
      name = PlayerName(s"Player_$playerId"),
      playerTypeId = playerTypeId,
      position = playerPosition,
      health = playerTypeData.maxHealth,
      shields = playerTypeData.maxShield,
      collider = NonEmptyList(playerTypeData.collider.head, playerTypeData.collider.tail),
      weapons = createPlayerWeaponsInformation(playerTypeData, playerPosition)
    )

    private def createPlayerWeaponsInformation(
      playerTypeData: PlayerTypesConfig.PlayerType,
      playerPosition: Position,
    ): Map[PlayerWeaponId, PlayerWeapon] = playerTypeData.weapons.map({
      case (weaponName, weaponTypeData) => {
        val playerWeaponId = PlayerWeaponId(Utils.createRandomId())
        val weaponPositionPoint = MathUtils.rotateRelativePoint(
          Point(weaponTypeData.offset.x, weaponTypeData.offset.y),
          playerPosition.rotation,
        )

        playerWeaponId -> PlayerWeapon(
          id = playerWeaponId,
          name = PlayerWeaponName(weaponName),
          position = Position(weaponPositionPoint.point._1, weaponPositionPoint.point._2, playerPosition.rotation),
          health = weaponTypeData.health,
        )
      }
    })
}
