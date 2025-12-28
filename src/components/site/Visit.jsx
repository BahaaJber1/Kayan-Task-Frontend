import { cn } from "@app/lib/utils.js";
import Container from "@app/ui/Container.jsx";
import { BiCalendar, BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

const visitVariants = {
  initial: {},
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const backgroundVariants = {
  initial: {
    scale: 1,
    opacity: 0.6,
  },
  hover: {
    scale: 1.05,
    opacity: 0.8,
    transition: {
      duration: 0.3,
      type: "spring",
    },
  },
};

const Visit = ({ visit }) => {
  const { id, date, doctor, time, status } = visit;

  const statusColors = {
    Completed: "#10b981",
    Scheduled: "#a855f7",
    Cancelled: "#ef4444",
  };

  const bgColor = statusColors[status];

  return (
    <Container
      className={cn("relative w-full rounded-lg")}
      variants={visitVariants}
      whileHover="hover"
      initial="initial"
    >
      <Container
        className={cn(
          "bg-background relative z-10 flex-row justify-between rounded-lg p-5",
        )}
      >
        <Container className={cn("gap-2")}>
          <span>
            Visit #V{id}{" "}
            <span
              className={cn("text-background rounded-full px-2 py-1 text-sm")}
              style={{ backgroundColor: bgColor }}
            >
              {status}
            </span>
          </span>
          <span className={cn("text-foreground/50 flex items-center gap-2")}>
            <BiUser /> {doctor}
          </span>
        </Container>
        <Container className={cn("text-foreground/50 gap-2")}>
          <span className={cn("flex items-center gap-2")}>
            <BiCalendar /> {date.toDateString()}
          </span>
          <span className={cn("flex items-center gap-2")}>
            <BsClock /> {time}
          </span>
        </Container>
      </Container>

      <Container
        className={cn("absolute -inset-1")}
        style={{ backgroundColor: bgColor, filter: "blur(10px)" }}
        variants={backgroundVariants}
      />
    </Container>
  );
};

export default Visit;
