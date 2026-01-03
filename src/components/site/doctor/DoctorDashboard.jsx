import { useGetVisits } from "@api/useVisits.js";
import Card from "@components/site/Card.jsx";
import Visit from "@components/site/Visit.jsx";
import { Spinner } from "@components/ui/spinner.jsx";
import { cardData } from "@dev-data/doctor/card.data.js";
import { cn } from "@lib/utils.js";
import Container from "@ui/Container.jsx";
import { Suspense } from "react";

const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.7,
      staggerChildren: 0.4,
    },
  },
};

const cardItemVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const visitItemVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const DoctorDashboard = () => {
  const { visits } = useGetVisits();
  return (
    <Container
      className={cn("gap-10")}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className={cn("text-foreground/50")}>
        Manage patient visits and medical records
      </p>
      <Container
        className={cn("gap-10 md:flex-row md:justify-between")}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cardData.map((card, index) => {
          return (
            <Container
              className={cn("w-full")}
              variants={cardItemVariants}
              initial="hidden"
              animate="visible"
              key={card.id}
            >
              <Card card={card} visits={visits} />
            </Container>
          );
        })}
      </Container>

      <Container className={cn("rounded-lg border p-5 shadow-lg")}>
        <Container className={cn("gap-2")}>
          <h2 className={cn("text-2xl font-semibold")}>Patient Visits</h2>
          <p className={cn("text-foreground/50")}>
            Start and manage patient appointments
          </p>
        </Container>

        <Suspense
          fallback={
            <Container className={cn("flex-row items-center")}>
              <Spinner /> Loading visits...
            </Container>
          }
        >
          {visits?.map((visit) => {
            return (
              <Container
                key={visit.id}
                variants={visitItemVariants}
                initial="hidden"
                animate="visible"
                className={cn("gap-15")}
              >
                <Visit visit={visit} />
              </Container>
            );
          })}
        </Suspense>
      </Container>
    </Container>
  );
};

export default DoctorDashboard;
