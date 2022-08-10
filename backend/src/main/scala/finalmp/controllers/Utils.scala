package finalmp.controllers

import java.util.UUID

object Utils {
  def createRandomId(): String = UUID.randomUUID().toString
}
