package finalmp.http

import finalmp.http.HttpConfig.HttpServerConfig
import scala.concurrent.duration.Duration

final case class HttpConfig(server: HttpServerConfig)

object HttpConfig {
  final case class HttpServerConfig(
    host: String,
    port: Int,
    cors: CorsConfig,
  )
  final case class CorsConfig(
    anyOrigin: Boolean,
    allowedOrigins: List[String],
    maxAge: Duration,
    allowCredentials: Boolean,
  )
}
