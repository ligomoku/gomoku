import { createLazyFileRoute } from "@tanstack/react-router";
import App from "@/App.tsx";

export const Route = createLazyFileRoute("/game")({
  component: Game,
});

function Game() {
  return <App />;
}
