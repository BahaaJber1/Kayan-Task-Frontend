import { cn } from "@app/lib/utils.js";
import Container from "@app/ui/Container.jsx";
import React from "react";
import StatusBadge from "../StatusBadge.jsx";
import MotionButton from "@app/components/application/MotionButton.jsx";
import { BiDollar } from "react-icons/bi";
import { Spinner } from "@app/components/ui/spinner.jsx";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const PatientVisitDetails = ({
  visit,
  allTreatments,
  cancelVisit,
  isCancellingVisit,
  onClose,
  treatmentsFields,
  amount,
  parentSlideVariants,
}) => {
  const {
    id,
    date: dateString,
    doctor_name: doctorName,
    time,
    status,
    medical_notes: medicalNotes,
    patient_notes: patientNotes,
  } = visit;

  const date = new Date(dateString);
  const theme = useSelector((state) => state.theme.theme);
  console.log({ theme });

  const handleCancelVisit = () => {
    toast(
      (t) => (
        <Container className={cn("gap-3")}>
          <Container>
            <span className={cn("font-semibold")}>Cancel Visit?</span>
            <p className={cn("text-sm")}>
              Cancel visit with Dr. {doctorName} on {date.toDateString()} at{" "}
              {time}?
            </p>
          </Container>
          <Container className={cn("flex-row justify-end gap-2")}>
            <MotionButton onClick={() => toast.dismiss(t.id)}>
              No, keep it
            </MotionButton>
            <MotionButton
              variant="destructive"
              onClick={() => {
                cancelVisit({ visitId: id });
                toast.dismiss(t.id);
              }}
            >
              Yes, cancel
            </MotionButton>
          </Container>
        </Container>
      ),
      {
        duration: 10000,
        position: "top-center",
        style: {
          background: theme === "dark" ? "#1e1e1e" : "#f9f9f9",
          color: theme === "dark" ? "#fff" : "#000",
          width: "400px",
        },
      },
    );
  };

  return (
    <Container
      variants={parentSlideVariants}
      initial="hidden"
      animate="visible"
    >
      <h2
        className={cn(
          "bg-background sticky top-0 flex items-center justify-between py-5 text-2xl font-semibold",
        )}
      >
        Visit Details - Dr. {doctorName}
        <StatusBadge status={status} />
      </h2>
      <Container className={cn("bg-foreground/5 rounded-lg p-5")}>
        <Container className={cn("flex-row justify-between")}>
          <Container>
            <span className={cn("text-foreground/50")}>Visit ID</span>
            {id}
          </Container>
          <Container>
            <span className={cn("text-foreground/50")}>Date & Time</span>
            {date.toDateString()}, {time}
          </Container>
        </Container>
      </Container>

      {medicalNotes && (
        <Container className={cn("mt-5")}>
          <h3 className={cn("mb-3 text-xl font-semibold")}>Medical Notes</h3>
          <Container className={cn("bg-foreground/5 rounded-lg p-4")}>
            <p className={cn("text-foreground/80 whitespace-pre-wrap")}>
              {medicalNotes}
            </p>
          </Container>
        </Container>
      )}

      {patientNotes && (
        <Container className={cn("mt-5")}>
          <h3 className={cn("mb-3 text-xl font-semibold")}>Patient Notes</h3>
          <Container className={cn("bg-foreground/5 rounded-lg p-4")}>
            <p className={cn("text-foreground/80 whitespace-pre-wrap")}>
              {patientNotes}
            </p>
          </Container>
        </Container>
      )}

      {allTreatments.some(
        (treatment) => treatment.name && treatment.name.trim() !== "",
      ) && (
        <Container className={cn("mt-5")}>
          <h3 className={cn("mb-3 text-xl font-semibold")}>Treatments</h3>
          <Container className={cn("gap-3")}>
            {treatmentsFields.map((treatment, index) => (
              <Container
                key={index}
                className={cn(
                  "bg-foreground/5 flex-row justify-between rounded-lg p-4",
                )}
              >
                <span>{treatment.name}</span>
                <span className={cn("font-semibold text-blue-500")}>
                  ${treatment.value}
                </span>
              </Container>
            ))}
          </Container>

          <Container
            className={cn(
              "bg-foreground/5 mt-3 flex-row items-center justify-between rounded-lg p-5",
            )}
          >
            <Container className={cn("flex-row items-center gap-2")}>
              <BiDollar size={25} className={cn("text-blue-500")} />
              <span className={cn("text-xl")}>Total Amount</span>
            </Container>
            <span className={cn("text-xl font-bold text-blue-500")}>
              ${amount}
            </span>
          </Container>
        </Container>
      )}

      {status === "pending" && (
        <Container className={cn("mt-5 flex-row justify-end")}>
          <MotionButton
            variant="destructive"
            disabled={status !== "pending"}
            onClick={handleCancelVisit}
          >
            {isCancellingVisit && <Spinner />}
            Cancel Visit
          </MotionButton>
        </Container>
      )}
    </Container>
  );
};

export default PatientVisitDetails;
