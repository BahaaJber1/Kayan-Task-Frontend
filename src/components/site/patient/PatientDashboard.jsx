import { useBookVisit, useGetVisits } from "@api/useVisits.js";
import MotionButton from "@components/application/MotionButton.jsx";
import Card from "@components/site/Card.jsx";
import DatePicker from "@components/site/DatePicker.jsx";
import Visit from "@components/site/Visit.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog.jsx";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@components/ui/field.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select.jsx";
import { Spinner } from "@components/ui/spinner.jsx";
import { Textarea } from "@components/ui/textarea.jsx";
import { cardData } from "@dev-data/patient/card.data.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@lib/utils.js";
import Container from "@ui/Container.jsx";
import { bookVisitSchema } from "@zod/bookVisit.schema.js";
import { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiCalendarPlus } from "react-icons/bi";
import { useSelector } from "react-redux";

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

const PatientDashboard = () => {
  const doctors = useSelector((state) => state.user.doctors);
  const { visits, isLoading: isLoadingVisits } = useGetVisits();
  const { bookVisit, isPending } = useBookVisit();

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm({
    mode: "all",
    defaultValues: {
      doctor: "",
      date: undefined,
      time: "",
      notes: "",
    },
    resolver: zodResolver(bookVisitSchema),
  });

  const { handleSubmit, reset, formState, control } = form;
  const { isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    bookVisit(data);
    reset();
    setOpenDialog(false);
  };

  return (
    <Container
      className={cn("gap-10")}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className={cn("text-foreground/50")}>
        Manage your appointments and medical visits
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
              <Card card={card} visits={visits} />
            </Container>
          );
        })}
      </Container>
      <Container className={cn("flex-row justify-end")}>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <MotionButton size="lg">
              <BiCalendarPlus size={50} />
              Book New Visit
            </MotionButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <Container>
                <DialogTitle>Book a New Visit</DialogTitle>
                <DialogDescription className={cn("text-foreground/50")}>
                  Select a doctor and preferred date & time for your appointment
                </DialogDescription>
              </Container>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={cn("flex flex-col gap-5")}
            >
              <FieldGroup className={cn("flex flex-col gap-5")}>
                <Controller
                  control={control}
                  name="doctor"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Doctor:</FieldLabel>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="date"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Date:</FieldLabel>
                      <DatePicker
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="time"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Time:</FieldLabel>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="14:00">02:00 PM</SelectItem>
                          <SelectItem value="15:00">03:00 PM</SelectItem>
                          <SelectItem value="16:00">04:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="notes"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel className={cn("text-xl font-semibold")}>
                        Notes
                      </FieldLabel>
                      <Textarea
                        {...field}
                        placeholder="Medical notes and observations..."
                        className={cn("min-h-[8lh] resize-none")}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <MotionButton
                type="submit"
                disabled={!isDirty || !isValid || isPending}
                className={cn("w-1/2 self-end")}
              >
                {isPending && <Spinner />}
                Book Visit
              </MotionButton>
            </form>
          </DialogContent>
        </Dialog>
      </Container>

      <Container className={cn("rounded-lg border p-5 shadow-lg")}>
        <Container className={cn("gap-2")}>
          <h2 className={cn("text-2xl font-semibold")}>My Visits</h2>
          <p className={cn("text-foreground/50")}>
            View all your medical appointments
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
                <Visit visit={visit} variants={visitItemVariants} />
              </Container>
            );
          })}
        </Suspense>
      </Container>
    </Container>
  );
};

export default PatientDashboard;
