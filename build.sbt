name := "bootcamp-final-backend"

version := "1.0"

scalaVersion := "2.13.8"

val http4sVersion = "0.23.6"
val circeVersion = "0.14.1"
val catsEffectVersion = "3.3.0"

libraryDependencies ++= Seq(
  "org.typelevel" %% "cats-effect" % catsEffectVersion,
  "org.http4s" %% "http4s-dsl" % http4sVersion,
  "org.http4s" %% "http4s-blaze-server" % http4sVersion,
  "org.http4s" %% "http4s-circe" % http4sVersion,
  "io.circe" %% "circe-generic" % circeVersion,
  "io.circe" %% "circe-parser" % circeVersion,
)
