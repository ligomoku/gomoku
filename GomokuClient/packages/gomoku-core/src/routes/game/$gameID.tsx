import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game/$gameID")({
  component: () => <div>Hello /game/$gameID!</div>,
});
