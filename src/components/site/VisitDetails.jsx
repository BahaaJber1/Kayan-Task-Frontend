import { useCancelVisit, useCompleteVisit } from "@api/useVisits.js";
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
import PatientVisitDetails from "./patient/PatientVisitDetails.jsx";
import DoctorVisitDetails from "./doctor/DoctorVisitDetails.jsx";

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
  const { cancelVisit, isPending: isCancellingVisit } = useCancelVisit();
  const {
    id,
    date: dateString,
    doctor_name: doctorName,
    time,
    status,
    patient_name: patientName,
    treatments,
    medical_notes: medicalNotes,
    patient_notes: patientNotes,
  } = visit;

  console.log({ treatments });

  const date = new Date(dateString);
  const form = useForm({
    mode: "all",
    defaultValues: {
      treatments:
        treatments?.length > 0 ? treatments : [{ name: "", value: 0 }],
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

  if (role === "patient" || role === "finance") {
    return (
      <PatientVisitDetails
        visit={visit}
        allTreatments={allTreatments}
        cancelVisit={cancelVisit}
        isCancellingVisit={isCancellingVisit}
        onClose={onClose}
        treatmentsFields={treatmentsFields}
        amount={amount}
        parentSlideVariants={parentSlideVariants}
      />
    );
  }

  if (role === "doctor")
    return (
      <DoctorVisitDetails
        visit={visit}
        allTreatments={allTreatments}
        addTreatment={addTreatment}
        removeTreatment={removeTreatment}
        isCompletingVisit={isCompletingVisit}
        completeVisit={completeVisit}
        cancelVisit={cancelVisit}
        onClose={onClose}
        treatmentsFields={treatmentsFields}
        amount={amount}
        parentSlideVariants={parentSlideVariants}
        handleSubmit={handleSubmit}
        control={control}
        isDirty={isDirty}
        onSubmit={onSubmit}
        scrollRef={scrollRef}
        isValid={isValid}
      />
    );
};

export default VisitDetails;
