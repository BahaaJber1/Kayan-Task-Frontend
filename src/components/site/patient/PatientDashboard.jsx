import { Button } from "@app/components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@app/components/ui/dialog.jsx";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@app/components/ui/field.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select.jsx";
import { cardData } from "@app/dev-data/card.data.js";
import { visitsData } from "@app/dev-data/vists.data.js";
import { cn } from "@app/lib/utils.js";
import { bookVisitSchema } from "@app/zod/bookVisit.schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@ui/Container.jsx";
import { Controller, useForm } from "react-hook-form";
import { BiCalendar, BiCalendarPlus, BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import Card from "../Card.jsx";
import DatePicker from "../DatePicker.jsx";
import Visit from "../Visit.jsx";
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
  const form = useForm({
    mode: "all",
    defaultValues: {
      doctor: "",
      date: undefined,
      time: "",
    },
    resolver: zodResolver(bookVisitSchema),
  });

  const { handleSubmit, reset, formState, control } = form;
  const { isDirty, isValid } = formState;

  const onSubmit = (data) => {
    console.log(data);
    reset();
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
              <Card card={card} />
            </Container>
          );
        })}
      </Container>
      <Container className={cn("md:w-1/4")}>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              <BiCalendarPlus size={50} />
              Book New Visit
            </Button>
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
                          {visitsData.map((visit) => (
                            <SelectItem key={visit.id} value={visit.doctor}>
                              {visit.doctor}
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
              </FieldGroup>

              <Button type="submit" disabled={!isDirty || !isValid}>
                Book Visit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Container>

      <Container className={cn("gap-10 rounded-lg border p-5")}>
        <Container>
          <h2 className={cn("text-2xl font-semibold")}>My Visits</h2>
          <p className={cn("text-foreground/50")}>
            View all your medical appointments
          </p>
        </Container>

        {visitsData.map((visit) => {
          return (
            <Container
              key={visit.id}
              variants={visitItemVariants}
              className={cn("gap-15")}
            >
              <Visit visit={visit} />
            </Container>
          );
        })}
      </Container>
    </Container>
  );
};

export default PatientDashboard;
