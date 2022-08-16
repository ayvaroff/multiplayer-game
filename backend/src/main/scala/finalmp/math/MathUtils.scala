package finalmp.math

import finalmp.models.game.Point
import scala.math.{cos, sin, toRadians}

object MathUtils {
  def rotateRelativePoint(point: Point, degree: Double): Point = {
    val cosValue = cos(toRadians(degree))
    val sinValue = sin(toRadians(degree))

    Point(
      cosValue * point.point._1 - sinValue * point.point._2,
      sinValue * point.point._1 + cosValue * point.point._2,
    )
  }
}
