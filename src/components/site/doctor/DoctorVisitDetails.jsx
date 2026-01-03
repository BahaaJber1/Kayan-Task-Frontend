import { cn } from "@app/lib/utils.js";
import Container from "@app/ui/Container.jsx";
import React from "react";
import StatusBadge from "../StatusBadge.jsx";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@app/components/ui/field.jsx";
import { Controller } from "react-hook-form";
import { Input } from "@app/components/ui/input.jsx";
import { AnimatePresence, motion as m } from "motion/react";
import MotionButton from "@app/components/application/MotionButton.jsx";
import { BiDollar, BiPlus, BiTrash } from "react-icons/bi";
import { Textarea } from "@app/components/ui/textarea.jsx";
import { Spinner } from "@app/components/ui/spinner.jsx";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const treatmentItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const AnimatedErrorField = m.create(FieldError);

const errorVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const DoctorVisitDetails = ({
  visit,
  allTreatments,
  addTreatment,
  removeTreatment,
  isCompletingVisit,
  completeVisit,
  cancelVisit,
  onClose,
  treatmentsFields,
  amount,
  parentSlideVariants,
  handleSubmit,
  control,
  isDirty,
  onSubmit,
  isCancellingVisit,
  isValid,
  scrollRef,
}) => {
  const {
    id,
    date: dateString,
    patient_name: patientName,
    patient_notes: patientNotes,
    time,
    status,
  } = visit;
  const date = new Date(dateString);

  const theme = useSelector((state) => state.theme.theme);

  const handleCancelVisit = () => {
    toast(
      (t) => (
        <Container className={cn("gap-3")}>
          <Container>
            <span className={cn("font-semibold")}>Cancel Visit?</span>
            <p className={cn("text-sm")}>
              Cancel visit with {patientName} on {date.toDateString()} at {time}
              ?
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
        duration: Infinity,
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
        Visit Details - {patientName}
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
      {patientNotes && (
        <Container>
          <h3 className={cn("mb-3 text-xl font-semibold")}>Patient Notes</h3>
          <Container className={cn("bg-foreground/5 rounded-lg p-4")}>
            <p className={cn("text-foreground/80 whitespace-pre-wrap")}>
              {patientNotes}
            </p>
          </Container>
        </Container>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className={cn("flex flex-col gap-5")}>
          <h3 className={cn("text-xl font-semibold")}>Treatments</h3>
          {treatmentsFields.map((field, index) => (
            <Container
              className={cn("grid grid-cols-[1fr_150px_auto]")}
              key={field.id}
              variants={treatmentItemVariants}
              initial="hidden"
              animate="visible"
              ref={index === treatmentsFields.length - 1 ? scrollRef : null}
            >
              <Controller
                control={control}
                name={`treatments.${index}.name`}
                render={({ field, fieldState }) => (
                  <Field>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Treatment name"
                      disabled={status !== "active"}
                    />
                    {fieldState.invalid && (
                      <AnimatedErrorField
                        errors={[fieldState.error]}
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={control}
                name={`treatments.${index}.value`}
                render={({ field, fieldState }) => (
                  <Field>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Value"
                      disabled={status !== "active"}
                    />
                    {fieldState.invalid && (
                      <AnimatedErrorField
                        errors={[fieldState.error]}
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    )}
                  </Field>
                )}
              />
              <Container className={cn("flex-row gap-2")}>
                <MotionButton
                  type="button"
                  onClick={() => addTreatment({ name, value: 0 })}
                  disabled={status !== "active" || allTreatments.length >= 10}
                >
                  <BiPlus />
                </MotionButton>

                <AnimatePresence mode="wait">
                  {allTreatments.length > 1 && status === "active" ? (
                    <Container
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MotionButton
                        type="button"
                        variant="destructive"
                        onClick={() => removeTreatment(index)}
                      >
                        <BiTrash />
                      </MotionButton>
                    </Container>
                  ) : null}
                </AnimatePresence>
              </Container>
            </Container>
          ))}
          <Container>
            <Controller
              control={control}
              name="medicalNotes"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className={cn("text-xl font-semibold")}>
                    Medical Notes
                  </FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Medical notes and observations..."
                    className={cn("min-h-[8lh] resize-none")}
                    disabled={status !== "active"}
                  />
                  {fieldState.invalid && (
                    <AnimatedErrorField
                      errors={[fieldState.error]}
                      variants={errorVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  )}
                </Field>
              )}
            />
          </Container>

          <Container
            className={cn(
              "bg-foreground/5 flex-row items-center justify-between rounded-lg p-5",
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
          <Container className={cn("mt-5 flex-row justify-end gap-2")}>
            <MotionButton
              type="button"
              variant="destructive"
              disabled={status !== "active"}
              onClick={handleCancelVisit}
            >
              {isCancellingVisit && <Spinner />}
              Cancel Visit
            </MotionButton>
            <MotionButton
              type="submit"
              disabled={
                !isDirty || !isValid || status !== "active" || isCompletingVisit
              }
            >
              {isCompletingVisit && <Spinner />}
              Complete Visit
            </MotionButton>
          </Container>
        </FieldGroup>
      </form>
    </Container>
  );
};

export default DoctorVisitDetails;
