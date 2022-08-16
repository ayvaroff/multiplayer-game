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
  implicit val encoderPlayerId: Encoder[PlayerId] = Encoder.forProduct1("id")(s => (s.value))
  implicit val decoderPlayerId: Decoder[PlayerId] = Decoder.forProduct1("id")(PlayerId.apply)
  implicit val encoderPlayerName: Encoder[PlayerName] = deriveUnwrappedEncoder[PlayerName]
  implicit val decoderPlayerName: Decoder[PlayerName] = deriveUnwrappedDecoder[PlayerName]
  implicit val encoderPlayerTypeId: Encoder[PlayerTypeId] = Encoder.forProduct1("player_type_id")(s => (s.value))
  implicit val decoderPlayerTypeId: Decoder[PlayerTypeId] = Decoder.forProduct1("player_type_id")(PlayerTypeId.apply)
  implicit val encoderPlayerWeaponId: Encoder[PlayerWeaponId] = deriveUnwrappedEncoder[PlayerWeaponId]
  implicit val decoderPlayerWeaponId: Decoder[PlayerWeaponId] = deriveUnwrappedDecoder[PlayerWeaponId]
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
  implicit val encoderWorldEntityId: Encoder[WorldEntityId] = deriveEncoder[WorldEntityId]
  implicit val decoderWorldEntityId: Decoder[WorldEntityId] = deriveDecoder[WorldEntityId]
  implicit val encoderWorldEntityType: Encoder[WorldEntityType] = deriveEncoder[WorldEntityType]
  implicit val decoderWorldEntityType: Decoder[WorldEntityType] = deriveDecoder[WorldEntityType]

  implicit val encoderProjectile: Encoder[Projectile] = deriveEncoder[Projectile]
  implicit val decoderProjectile: Decoder[Projectile] = deriveDecoder[Projectile]
  implicit val encoderProjectileId: Encoder[ProjectileId] = deriveEncoder[ProjectileId]
  implicit val decoderProjectileId: Decoder[ProjectileId] = deriveDecoder[ProjectileId]
  implicit val encoderProjectileType: Encoder[ProjectileType] = deriveEncoder[ProjectileType]
  implicit val decoderProjectileType: Decoder[ProjectileType] = deriveDecoder[ProjectileType]

  implicit val encoderWorld: Encoder[World] = deriveEncoder[World]
  implicit val decoderWorld: Decoder[World] = deriveDecoder[World]
  implicit val encoderWorldId: Encoder[WorldId] = deriveEncoder[WorldId]
  implicit val decoderWorldId: Decoder[WorldId] = deriveDecoder[WorldId]

  implicit val playerIdKeyEncoder: KeyEncoder[PlayerId] = new KeyEncoder[PlayerId] {
    override def apply(playerId: PlayerId): String = playerId.value
  }
  implicit val playerIdKeyDecoder: KeyDecoder[PlayerId] = new KeyDecoder[PlayerId] {
    override def apply(key: String): Option[PlayerId] = Some(PlayerId(key))
  }
}
