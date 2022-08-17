package finalmp.models.events.decoder

import finalmp.models.events.decoder.Utils.getValue
import finalmp.models.events.{GameEvent, PlayerUpdateInfo}
import finalmp.models.game.{Position, PlayerId, PlayerWeaponId, PlayerWeapon}
import finalmp.models.game.codecs.JsonCodecs._
import io.circe.{Decoder, HCursor}

object PlayerUpdateDec {
  implicit val decodePlayerUpdate: Decoder[GameEvent.PlayerUpdate] = new Decoder[GameEvent.PlayerUpdate] {
    override def apply(c: HCursor): Decoder.Result[GameEvent.PlayerUpdate] = for {
      playerId <- getValue[PlayerId](c, "data.id")
      position <- getValue[Position](c, "data.position")
      weapons <- getValue[Map[PlayerWeaponId, PlayerWeapon]](c, "data.weapons")
    } yield GameEvent.PlayerUpdate(PlayerUpdateInfo(playerId, position, weapons))
  }
}
