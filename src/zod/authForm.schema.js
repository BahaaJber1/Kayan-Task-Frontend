import z from "zod";

const authFormSchema = (mode) => {
  const schema = z.object({
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Password must contain at least one special character",
      }),
  });

  if (mode === "signUp") {
    return schema.extend({
      role: z.enum(["patient", "doctor", "finance"], "Role is required"),
    });
  }

  return schema;
};

export { authFormSchema };
