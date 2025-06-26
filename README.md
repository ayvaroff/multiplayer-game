# Real-time multiplayer shooter game

This project was developed as the final project for the [Evolution Scala Bootcamp](https://github.com/evolution-gaming/scala-bootcamp). It features both a TypeScript-based frontend game and a Scala backend server.

> [!TIP]
> You can find visual demo using the [following link](https://dms.licdn.com/playlist/vid/v2/C4D05AQFrUE7KDw_gQw/mp4-720p-30fp-crf28/mp4-720p-30fp-crf28/0/1664530861710?e=1751544000&v=beta&t=i-fFiYaBLgKZFuFHysGOHLqZVfAvuHlAjoDkf-szvH0) or open [the origin post in LinkedIn](https://www.linkedin.com/posts/ayvaroff_evolution-scala-bootcamp-activity-6981548442661580800-X2r2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAf_aUQB61BblC_7w_IKNcWWqJsBg-lG4RQ)

> [!WARNING]
> The RESTful API is not secure and is intended for demonstration purposes only. Security features were not a focus of this project.

### Overview

Although the bootcamp focused on Scala, I challenged myself to build the game frontend from scratch using TypeScript and the HTML5 Canvas API without any game engines or external libraries. The frontend is structured around the Entity-Component-System (ECS) architecture, a common pattern in game development.

The backend is implemented in Scala using http4s, providing both a RESTful API and WebSocket support for real-time multiplayer gameplay.

### Features

- Real-time multiplayer gameplay via WebSockets
- Custom ECS-based game engine in TypeScript
- RESTful API for game management (demo purposes)
- No external game engines or libraries used

---

## Tech Stack

- **Frontend:** TypeScript, HTML5 Canvas, WebSocket, ECS architecture
- **Backend:** Scala, http4s, WebSocket, REST API

---

## Author

- **Anton Ayvarov** – [ayvaroff](https://github.com/ayvaroff)

---

## License

This project is unlicensed.
