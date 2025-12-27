import AuthForm from "@components/application/authentication/AuthForm.jsx";
import { cn } from "@lib/utils.js";
import { createFileRoute } from "@tanstack/react-router";
import Container from "@ui/Container.jsx";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const RouteComponent = () => {
  return (
    <Container
      className={cn(
        "min-h-screen items-center justify-center bg-linear-to-br from-green-300 to-blue-300",
      )}
    >
      <Container>
        <AuthForm />
      </Container>
    </Container>
  );
};
