import { createLazyFileRoute } from "@tanstack/react-router";
import { GomokuHomepage } from "@/components/Gomoku-homepage.tsx";

export const Route = createLazyFileRoute("/")({
  component: Home,
});

function Home() {
  return <GomokuHomepage />;
}
