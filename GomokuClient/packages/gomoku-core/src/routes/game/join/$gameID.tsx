import { createFileRoute } from "@tanstack/react-router";
import JoinGame from "@/pages/JoinGame";

export const Route = createFileRoute("/game/join/$gameID")({
  component: JoinGamePage,
});

function JoinGamePage() {
  return <JoinGame />;
}
