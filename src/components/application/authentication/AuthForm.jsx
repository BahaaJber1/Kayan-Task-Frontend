import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@components/ui/field.jsx";
import { Input } from "@app/components/ui/input.jsx";
import Container from "@ui/Container.jsx";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@app/lib/utils.js";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { DevTool } from "@hookform/devtools";
import { Label } from "@app/components/ui/label.jsx";

const authFormSchema = z.object({
  email: z.email("Invalid email address"),
});

const AuthForm = ({ mode = "signIn" }) => {
  const form = useForm({
    mode: "all",
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(authFormSchema),
  });

  const { handleSubmit, control } = form;
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className={cn("aspect-square w-100 rounded-lg bg-white p-5")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <DevTool control={control} />
      <FieldGroup>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              {console.log({ fieldState })}
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field}
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
};

export default AuthForm;
