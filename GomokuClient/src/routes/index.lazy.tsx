import { createLazyFileRoute } from "@tanstack/react-router";
import { TimeControls } from "@/components/TimeControls";

export const Route = createLazyFileRoute("/")({
  component: Home,
});

function Home() {
  return <TimeControls />;
}
