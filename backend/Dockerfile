FROM hseeberger/scala-sbt:eclipse-temurin-11.0.14.1_1.6.2_2.13.8 AS builder

WORKDIR /build
COPY . .
RUN sbt assembly

FROM openjdk:11-jre-slim

WORKDIR /app

COPY --from=builder /build/target/scala-2.13/ .

EXPOSE 9002
CMD ["java", "-jar", "multiplayer-backend.jar"]
