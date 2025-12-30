import MotionButton from "@components/application/MotionButton.jsx";
import StatusBadge from "@components/site/StatusBadge.jsx";
import VisitDetails from "@components/site/VisitDetails.jsx";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@components/ui/dialog.jsx";
import { cn } from "@lib/utils.js";
import Container from "@ui/Container.jsx";
import { useState } from "react";
import { BiCalendar, BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

const visitVariants = {
  initial: {},
  hover: {
    scale: 1.01,
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
    scale: 1.01,
    opacity: 0.8,
    transition: {
      duration: 0.3,
      type: "spring",
    },
  },
};

const statusColors = {
  Completed: "#10b981",
  Scheduled: "#a855f7",
  Cancelled: "#ef4444",
};

const Visit = ({ visit }) => {
  const [open, setOpen] = useState(false);
  const role = "finance"; // placeholder for now
  const { id, date, doctor, time, status, patient } = visit;
  const bgColor = statusColors[status];

  if (role === "patient")
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
        className={cn("overflow-y-scroll")}
      >
        <DialogTrigger asChild>
          <Container
            className={cn("relative w-full rounded-lg")}
            variants={visitVariants}
            whileHover="hover"
            initial="initial"
          >
            <Container
              className={cn(
                "bg-background relative z-10 cursor-pointer flex-row justify-between rounded-lg p-5",
              )}
            >
              <Container className={cn("gap-2")}>
                <span className={cn("flex items-center gap-5")}>
                  Visit #V{id} <StatusBadge status={status} />
                </span>
                <span
                  className={cn("text-foreground/50 flex items-center gap-2")}
                >
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
              style={{ backgroundColor: `${bgColor}30`, filter: "blur(10px)" }}
              variants={backgroundVariants}
            />
          </Container>
        </DialogTrigger>
        <DialogContent
          className={cn("max-h-screen max-w-3xl! overflow-y-auto")}
        >
          <VisitDetails visit={visit} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );

  if (role === "doctor")
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Container
            className={cn("relative w-full rounded-lg")}
            variants={visitVariants}
            whileHover="hover"
            initial="initial"
          >
            <Container
              className={cn(
                "bg-background relative z-10 cursor-pointer flex-row justify-between rounded-lg p-5",
              )}
            >
              <Container className={cn("text-foreground/50 gap-2")}>
                <span className={cn("text-foreground flex items-center gap-5")}>
                  Visit #V{id} <StatusBadge status={status} />
                </span>
                <span className={cn("flex items-center gap-2")}>
                  <BiUser /> {patient}
                </span>
                <span className={cn("flex items-center gap-2")}>
                  <BiCalendar /> {date.toDateString()}
                  <BsClock /> {time}
                </span>
              </Container>

              <Container>
                <MotionButton>
                  {status === "Scheduled" ? "Continue" : "Show Details"}
                </MotionButton>
              </Container>
            </Container>

            <Container
              className={cn("absolute -inset-1")}
              style={{ backgroundColor: `${bgColor}30`, filter: "blur(10px)" }}
              variants={backgroundVariants}
            />
          </Container>
        </DialogTrigger>
        <DialogContent
          className={cn("max-h-screen max-w-3xl! overflow-y-auto")}
        >
          <VisitDetails visit={visit} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
};

export default Visit;
