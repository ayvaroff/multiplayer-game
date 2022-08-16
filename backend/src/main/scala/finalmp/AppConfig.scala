package finalmp

import finalmp.http.HttpConfig
import finalmp.models.game.configs.{PlayerTypesConfig, GameConfig}
import pureconfig.generic.auto._
import pureconfig.module.enumeratum._
import pureconfig.module.cats._
import pureconfig.CollectionReaders._
import pureconfig.{ConfigSource, ConfigReader}
import cats.effect.{Sync}

final case class AppConfig(
  http: HttpConfig,
  playerTypes: PlayerTypesConfig.Config,
  game: GameConfig,
)

object AppConfig {
  def load[F[_]: Sync]: F[AppConfig] = Sync[F].delay(ConfigSource.default.at("finalmp").loadOrThrow[AppConfig])
}