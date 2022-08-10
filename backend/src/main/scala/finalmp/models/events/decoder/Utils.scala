package finalmp.models.events.decoder

import io.circe.{ACursor, Decoder, HCursor}

object Utils {
  def getValue[T](c: HCursor, path: String)(implicit dec: Decoder[T]): Decoder.Result[T] =
    path
      .split("\\.")
      .foldLeft[ACursor](c)((cur, path) => cur.downField((path)))
      .as[T]
}
