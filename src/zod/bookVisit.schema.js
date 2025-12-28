import z from "zod";

const bookVisitSchema = z.object({
  doctor: z.string().min(1, "Please select a doctor"),
  date: z.date({
    required_error: "Please select a date",
    invalid_type_error: "Invalid date format",
  }),
  time: z.string().min(1, "Please select a time"),
});

export { bookVisitSchema };
