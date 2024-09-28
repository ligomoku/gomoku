import { createLazyFileRoute } from "@tanstack/react-router";
import CreateGame from "@/pages/CreateGame";

export const Route = createLazyFileRoute("/game/create")({
  component: CreateGamePage,
});

function CreateGamePage() {
  return <CreateGame />;
}
