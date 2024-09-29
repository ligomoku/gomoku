import { createLazyFileRoute } from "@tanstack/react-router";
import { HomeGame } from "@/pages/HomeGame";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <HomeGame />;
}
