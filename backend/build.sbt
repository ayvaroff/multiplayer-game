name := "multiplayer-backend"

version := "1.0"

scalaVersion := "2.13.8"

val http4sVersion = "0.21.22"
val circeVersion = "0.13.0"
val catsVersion = "2.6.1"
val catsEffectVersion = "2.5.1"

libraryDependencies ++= Seq(
  "org.typelevel" %% "cats-core" % catsVersion,
  "org.typelevel" %% "cats-effect" % catsEffectVersion,
  "org.http4s" %% "http4s-dsl" % http4sVersion,
  "org.http4s" %% "http4s-blaze-server" % http4sVersion,
  "org.http4s" %% "http4s-circe" % http4sVersion,
  "io.circe" %% "circe-generic" % circeVersion,
  "io.circe" %% "circe-parser" % circeVersion,
)
