import { createFileRoute, useRouterState } from "@tanstack/react-router";

import type { SwaggerTypes } from "@gomoku/api";

import AIGame from "@/pages/AIGame";

declare module "@tanstack/react-router" {
  interface HistoryState {
    game?: {
      boardSize: number;
      timeControl?: SwaggerTypes.TimeControlDto;
    };
  }
}

//TODO: temporary init game history, remove when API is ready, probably next iteration should be local storage
const initGameHistory: SwaggerTypes.GetGameHistoryResponse = {
  gen: "",
  hasBothPlayersJoined: false,
  isCompleted: false,
  isGameStarted: false,
  movesCount: 0,
  players: undefined!,
  boardSize: 19,
  movesHistory: {},
};

export const Route = createFileRoute("/game/join/ai")({
  component: RouteComponent,
});

function RouteComponent() {
  const { location } = useRouterState();
  const game = location.state?.game || initGameHistory; //TODO: extend global state type

  return <AIGame gameHistory={game} />;
}
