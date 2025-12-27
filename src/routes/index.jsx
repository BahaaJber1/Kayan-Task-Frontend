import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const RouteComponent = () => {
  return <div>Hello "/"!</div>;
};
