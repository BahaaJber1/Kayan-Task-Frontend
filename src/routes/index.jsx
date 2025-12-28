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
        "to-kayan-accent from-kayan-green min-h-screen items-center justify-center bg-linear-to-br",
      )}
    >
      <Container>
        <AuthForm />
      </Container>
    </Container>
  );
};
