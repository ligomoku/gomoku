import { createLazyFileRoute } from "@tanstack/react-router";

import { Test } from "@/pages/Test";

export const Route = createLazyFileRoute("/test")({
  component: TestPage,
});

function TestPage() {
  return <Test />;
}
