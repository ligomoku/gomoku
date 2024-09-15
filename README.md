## Setup Instructions

Using Makefile

1. Run `make client` in one terminal tab.
2. In a separate terminal tab, run `make server`.

### BACK-END:

1) Open "Gomoku/GomokuServer/GomokuServer.sln" with Visual Studio 2022
2) Open "Program.cs" and replace "http://localhost:4200" with the domain and port where the Angular web server is running
3) Build and Start

### FRONT-END:

1) Open "GomokuClient\src\app\userplay.service.ts" and replace "http://localhost:62411/api/game" with the URL where the C# service is running
2) Open "GomokuClient" in console
3) Run "npm install"
4) Run "ng serve --open" for dev environment

Open 2 or more separate client windows with a browser to simulate 2 or more players, the back-end will pair the players.

Each player takes turns against his opponent. The goal of the game is to occupy 5 consecutive squares in any direction. Squares that are occupied by the player are red. Squares occupied by the player opponent are blue.

<img width="1292" alt="Screenshot 2024-09-14 at 15 20 10" src="https://github.com/user-attachments/assets/86d85dc2-48d5-4055-a720-13f24000dc19">
