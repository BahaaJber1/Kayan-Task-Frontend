import { getDoctors } from "@api/getDoctors.js";
import Navbar from "@components/site/Header.jsx";
import DoctorDashboard from "@components/site/doctor/DoctorDashboard.jsx";
import FinanceDashboard from "@components/site/finance/FinanceDashboard.jsx";
import PatientDashboard from "@components/site/patient/PatientDashboard.jsx";
import { cn } from "@lib/utils.js";
import { createFileRoute } from "@tanstack/react-router";
import Container from "@ui/Container.jsx";
import { useSelector } from "react-redux";

export const Route = createFileRoute("/dashboard")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getDoctors);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { role, name } = useSelector((state) => state.user.user);

  return (
    <Container className={cn("mx-auto max-w-7xl px-4 py-6")}>
      <Navbar />
      <Container>
        <h1 className={cn("text-3xl font-semibold capitalize")}>
          welcome, {name}
        </h1>
      </Container>
      {role === "patient" && <PatientDashboard />}
      {role === "doctor" && <DoctorDashboard />}
      {role === "finance" && <FinanceDashboard />}
    </Container>
  );
}
