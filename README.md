<img src="https://avatars.githubusercontent.com/u/123968089?s=400&u=26b1b8e1c6a7852376a21fd0af32d71c6fd13fda&v=4" width="200">

# Gomoku

## Setup Instructions

Using Makefile (from the root directory)

1. Run `make client` in one terminal tab.
2. In a separate terminal tab, run `make server`.

### BACK-END:

1. Open "Gomoku/GomokuServer/GomokuServer.sln" with Visual Studio 2022
2. Open "Program.cs" and replace "http://localhost:4200" with the domain and port where the Angular web server is running
3. Build and Start

### FRONT-END:

1. Open "GomokuClient\src\app\userplay.service.ts" and replace "http://localhost:62411/api/game" with the URL where the C# service is running
2. Open "GomokuClient" in console
3. Run "yarn"
4. Run "yarn dev" for dev environment
