package finalmp.models.game.codecs

import finalmp.models.game._
import io.circe.generic.semiauto.{deriveEncoder, deriveDecoder}
import io.circe.generic.extras.semiauto.{deriveUnwrappedDecoder, deriveUnwrappedEncoder}
import io.circe.{Encoder, Decoder, KeyEncoder, KeyDecoder}

object JsonCodecs {
  implicit val encoderPoint: Encoder[Point] = deriveUnwrappedEncoder[Point]
  implicit val decoderPoint: Decoder[Point] = deriveUnwrappedDecoder[Point]

  implicit val encoderPosition: Encoder[Position] = deriveEncoder[Position]
  implicit val decoderPosition: Decoder[Position] = deriveDecoder[Position]

  implicit val encoderPlayer: Encoder[Player] = deriveEncoder[Player]
  implicit val decoderPlayer: Decoder[Player] = deriveDecoder[Player]
  implicit val encoderPlayerId: Encoder[PlayerId] = deriveUnwrappedEncoder[PlayerId]
  implicit val decoderPlayerId: Decoder[PlayerId] = deriveUnwrappedDecoder[PlayerId]
  implicit val encoderPlayerName: Encoder[PlayerName] = deriveUnwrappedEncoder[PlayerName]
  implicit val decoderPlayerName: Decoder[PlayerName] = deriveUnwrappedDecoder[PlayerName]
  implicit val encoderPlayerTypeId: Encoder[PlayerTypeId] = deriveUnwrappedEncoder[PlayerTypeId]
  implicit val decoderPlayerTypeId: Decoder[PlayerTypeId] = deriveUnwrappedDecoder[PlayerTypeId]
  
  implicit val encoderPlayerWeaponId: Encoder[PlayerWeaponId] = deriveUnwrappedEncoder[PlayerWeaponId]
  implicit val decoderPlayerWeaponId: Decoder[PlayerWeaponId] = deriveUnwrappedDecoder[PlayerWeaponId]
  implicit val encoderPlayerWeaponName: Encoder[PlayerWeaponName] = deriveUnwrappedEncoder[PlayerWeaponName]
  implicit val decoderPlayerWeaponName: Decoder[PlayerWeaponName] = deriveUnwrappedDecoder[PlayerWeaponName]
  implicit val encoderPlayerWeapon: Encoder[PlayerWeapon] = deriveEncoder[PlayerWeapon]
  implicit val decoderPlayerWeapon: Decoder[PlayerWeapon] = deriveDecoder[PlayerWeapon]
  
  implicit val playerWeaponIdKeyEncoder: KeyEncoder[PlayerWeaponId] = new KeyEncoder[PlayerWeaponId] {
    override def apply(playerWeaponId: PlayerWeaponId): String = playerWeaponId.value
  }
  implicit val playerWeaponIdKeyDecoder: KeyDecoder[PlayerWeaponId] = new KeyDecoder[PlayerWeaponId] {
    override def apply(key: String): Option[PlayerWeaponId] = Some(PlayerWeaponId(key))
  }

  implicit val encoderWorldEntity: Encoder[WorldEntity] = deriveEncoder[WorldEntity]
  implicit val decoderWorldEntity: Decoder[WorldEntity] = deriveDecoder[WorldEntity]
  implicit val encoderWorldEntityId: Encoder[WorldEntityId] = deriveUnwrappedEncoder[WorldEntityId]
  implicit val decoderWorldEntityId: Decoder[WorldEntityId] = deriveUnwrappedDecoder[WorldEntityId]
  implicit val encoderWorldEntityType: Encoder[WorldEntityType] = deriveUnwrappedEncoder[WorldEntityType]
  implicit val decoderWorldEntityType: Decoder[WorldEntityType] = deriveUnwrappedDecoder[WorldEntityType]

  implicit val encoderProjectile: Encoder[Projectile] = deriveEncoder[Projectile]
  implicit val decoderProjectile: Decoder[Projectile] = deriveDecoder[Projectile]
  implicit val encoderProjectileId: Encoder[ProjectileId] = deriveUnwrappedEncoder[ProjectileId]
  implicit val decoderProjectileId: Decoder[ProjectileId] = deriveUnwrappedDecoder[ProjectileId]
  implicit val encoderProjectileType: Encoder[ProjectileType] = deriveUnwrappedEncoder[ProjectileType]
  implicit val decoderProjectileType: Decoder[ProjectileType] = deriveUnwrappedDecoder[ProjectileType]

  implicit val encoderWorld: Encoder[World] = deriveEncoder[World]
  implicit val decoderWorld: Decoder[World] = deriveDecoder[World]
  implicit val encoderWorldId: Encoder[WorldId] = deriveUnwrappedEncoder[WorldId]
  implicit val decoderWorldId: Decoder[WorldId] = deriveUnwrappedDecoder[WorldId]

  implicit val playerIdKeyEncoder: KeyEncoder[PlayerId] = new KeyEncoder[PlayerId] {
    override def apply(playerId: PlayerId): String = playerId.value
  }
  implicit val playerIdKeyDecoder: KeyDecoder[PlayerId] = new KeyDecoder[PlayerId] {
    override def apply(key: String): Option[PlayerId] = Some(PlayerId(key))
  }

  implicit val projectileIdKeyEncoder: KeyEncoder[ProjectileId] = new KeyEncoder[ProjectileId] {
    override def apply(projectileId: ProjectileId): String = projectileId.value
  }
  implicit val projectileIdKeyDecoder: KeyDecoder[ProjectileId] = new KeyDecoder[ProjectileId] {
    override def apply(key: String): Option[ProjectileId] = Some(ProjectileId(key))
  }

  implicit val worldEntityIdKeyEncoder: KeyEncoder[WorldEntityId] = new KeyEncoder[WorldEntityId] {
    override def apply(worldEntityId: WorldEntityId): String = worldEntityId.value
  }
  implicit val worldEntityIdKeyDecoder: KeyDecoder[WorldEntityId] = new KeyDecoder[WorldEntityId] {
    override def apply(key: String): Option[WorldEntityId] = Some(WorldEntityId(key))
  }
}
