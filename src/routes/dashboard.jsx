import Navbar from "@app/components/site/Header.jsx";
import Container from "@ui/Container.jsx";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { cn } from "@app/lib/utils.js";
import PatientDashboard from "@components/site/patient/PatientDashboard.jsx";
import DoctorDashboard from "@components/site/doctor/DoctorDashboard.jsx";
import FinanceDashboard from "@components/site/finance/FinanceDashboard.jsx";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const role = "finance"; // This would be fetched from user context/auth in a real app
  return (
    <Container className={cn("mx-auto max-w-7xl px-4 py-6")}>
      <Navbar />
      <Container>
        <h1 className={cn("text-3xl font-semibold")}>Welcome, (name)</h1>
      </Container>
      {role === "patient" && <PatientDashboard />}
      {role === "doctor" && <DoctorDashboard />}
      {role === "finance" && <FinanceDashboard />}
    </Container>
  );
}

