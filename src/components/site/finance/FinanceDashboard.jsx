import { cardData } from "@app/dev-data/finance/card.data.js";

import { cn } from "@lib/utils.js";
import Container from "@ui/Container.jsx";
import Card from "@components/site/Card.jsx";
import TableData from "@components/site/finance/VisitsTable/TableData.jsx";

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

const FinanceDashboard = () => {
  return (
    <Container
      className={cn("gap-10")}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className={cn("text-foreground/50")}>
        Review and manage financial records
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
              key={card.id}
            >
              <Card card={card} />
            </Container>
          );
        })}
      </Container>

      <Container className={cn("rounded-lg border p-5 shadow-lg")}>
        <Container className={cn("gap-2")}>
          <h2 className={cn("text-2xl font-semibold")}>Visit Records</h2>
          <p className={cn("text-foreground/50")}>
            All completed visits with financial details
          </p>
        </Container>

        <Container>
          <TableData />
        </Container>
      </Container>
    </Container>
  );
};

export default FinanceDashboard;
