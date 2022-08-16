package finalmp.http.decoders

import io.circe.{Encoder, Decoder, KeyEncoder, KeyDecoder}

object PlayerServiceDecoder {
  final case class PlayerIdRequest(value: String)
  final case class PlayerTypeIdRequest(value: String)

  implicit val encoderPlayerIdRequest: Encoder[PlayerIdRequest] = Encoder.forProduct1("player_id")(s => (s.value))
  implicit val decoderPlayerIdRequest: Decoder[PlayerIdRequest] = Decoder.forProduct1("player_id")(PlayerIdRequest.apply)

  implicit val encoderPlayerTypeIdRequest: Encoder[PlayerTypeIdRequest] = Encoder.forProduct1("player_type_id")(s => (s.value))
  implicit val decoderPlayerTypeIdRequest: Decoder[PlayerTypeIdRequest] = Decoder.forProduct1("player_type_id")(PlayerTypeIdRequest.apply)
}
