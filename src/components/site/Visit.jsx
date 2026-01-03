import { useAcceptVisit } from "@api/useVisits.js";
import MotionButton from "@components/application/MotionButton.jsx";
import StatusBadge from "@components/site/StatusBadge.jsx";
import VisitDetails from "@components/site/VisitDetails.jsx";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@components/ui/dialog.jsx";
import { Spinner } from "@components/ui/spinner.jsx";
import { cn } from "@lib/utils.js";
import Container from "@ui/Container.jsx";
import { useState } from "react";
import { BiCalendar, BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { useSelector } from "react-redux";

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
  completed: "#10b981",
  scheduled: "#a855f7",
  cancelled: "#ef4444",
  pending: "#f59e0b",
  active: "#3b82f6",
};

const Visit = ({ visit }) => {
  const [open, setOpen] = useState(false);
  const { role } = useSelector((state) => state.user.user);
  const { acceptVisit, isPending: isAccepting } = useAcceptVisit();
  const {
    id,
    date: dateString,
    doctor_name: doctorName,
    time,
    status,
    patient_name: patientName,
  } = visit;
  const date = new Date(dateString);
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
                  Visit {id} <StatusBadge status={status} showText={false} />
                </span>
                <span
                  className={cn("text-foreground/50 flex items-center gap-2")}
                >
                  <BiUser /> {doctorName}
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
                  Visit {id} <StatusBadge status={status} showText={false} />
                </span>
                <span className={cn("flex items-center gap-2")}>
                  <BiUser /> {patientName}
                </span>
                <span className={cn("flex items-center gap-2")}>
                  <BiCalendar /> {date.toDateString()}
                  <BsClock /> {time}
                </span>
              </Container>

              <Container className={cn("flex-row-reverse")}>
                <MotionButton>
                  {status === "scheduled" ? "Continue" : "Show Details"}
                </MotionButton>
                {status === "pending" && (
                  <MotionButton
                    variant="outline"
                    onClick={() => {
                      acceptVisit({ visitId: id });
                    }}
                  >
                    {isAccepting && <Spinner />}
                    Start Visit
                  </MotionButton>
                )}
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
