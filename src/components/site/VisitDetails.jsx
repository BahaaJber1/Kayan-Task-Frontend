import { useCompleteVisit } from "@api/useVisits.js";
import MotionButton from "@components/application/MotionButton.jsx";
import StatusBadge from "@components/site/StatusBadge.jsx";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@components/ui/field.jsx";
import { Input } from "@components/ui/input.jsx";
import { Spinner } from "@components/ui/spinner.jsx";
import { Textarea } from "@components/ui/textarea.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import useScrollToBottom from "@hooks/useScrollToBottom.jsx";
import { cn } from "@lib/utils.js";
import Container from "@ui/Container.jsx";
import { visitDetailsSchema } from "@zod/visitDetails.schema.js";
import { AnimatePresence, motion as m } from "motion/react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { BiDollar, BiPlus, BiTrash } from "react-icons/bi";
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

const parentSlideVariants = {
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

const VisitDetails = ({ visit, onClose }) => {
  const { role } = useSelector((state) => state.user.user);
  const { completeVisit, isPending: isCompletingVisit } = useCompleteVisit();
  const {
    id,
    date: dateString,
    doctor_name: doctorName,
    time,
    status,
    patient_name: patientName,
    treatments: mockTreatments,
    medicalNotes,
  } = visit;

  const date = new Date(dateString);
  const form = useForm({
    mode: "all",
    defaultValues: {
      treatments: mockTreatments || [{ name: undefined, value: 0 }],
      medicalNotes: medicalNotes || "",
    },
    resolver: zodResolver(visitDetailsSchema),
  });
  const { handleSubmit, control, formState, reset, watch } = form;
  const { isValid, isDirty } = formState;

  const treatmentsArray = useFieldArray({
    control: control,
    name: "treatments",
  });

  const {
    fields: treatmentsFields,
    append: addTreatment,
    remove: removeTreatment,
  } = treatmentsArray;

  const [allTreatments, name] = watch(["treatments", "treatments.name"]);
  const scrollRef = useScrollToBottom(allTreatments.length);
  const amount = allTreatments?.reduce(
    (total, treatment) => total + Number(treatment.value),
    0,
  );

  const onSubmit = async (data) => {
    completeVisit({
      visitId: id,
      treatments: data.treatments,
      medicalNotes: data.medicalNotes,
      amount,
    });

    reset();
    onClose();
  };

  if (role === "patient" || role === "finance")
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

        {status === "scheduled" && (
          <Container className={cn("mt-5 flex-row justify-end")}>
            <MotionButton variant="destructive" onClick={onClose}>
              Cancel Visit
            </MotionButton>
          </Container>
        )}
      </Container>
    );

  if (role === "doctor")
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
                        disabled={status !== "scheduled"}
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
                        disabled={status !== "scheduled"}
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
                    disabled={
                      status !== "scheduled" || allTreatments.length >= 10
                    }
                  >
                    <BiPlus />
                  </MotionButton>

                  <AnimatePresence mode="wait">
                    {allTreatments.length > 1 && status === "scheduled" ? (
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
                      disabled={status !== "scheduled"}
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
                $
                {Object.values(allTreatments).reduce(
                  (total, treatment) => total + Number(treatment.value),
                  0,
                )}
              </span>
            </Container>
            <Container className={cn("mt-5 flex-row justify-end gap-2")}>
              <MotionButton
                variant="destructive"
                disabled={status !== "scheduled"}
                onClick={onClose}
              >
                Cancel Visit
              </MotionButton>
              <MotionButton
                type="submit"
                disabled={
                  !isDirty ||
                  !isValid ||
                  status !== "scheduled" ||
                  isCompletingVisit
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

export default VisitDetails;
