import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select.jsx";
import { authFormSchema } from "@app/zod/authForm.schema.js";
import { Button } from "@components/ui/button.jsx";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@components/ui/field.jsx";
import { Input } from "@components/ui/input.jsx";
import { Label } from "@components/ui/label.jsx";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@lib/utils.js";
import Container from "@ui/Container.jsx";
import { AnimatePresence, motion as m } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Logo from "../Logo.jsx";

const AuthForm = ({}) => {
  const [mode, setMode] = useState("signIn");
  const form = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      role: mode === "signUp" ? "" : undefined,
    },
    resolver: zodResolver(authFormSchema(mode)),
  });

  const { handleSubmit, control, reset, formState, setValue } = form;
  const { isDirty, isValid } = formState;

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setValue("role", "");
  };

  const toggleMode = () => {
    setMode(mode === "signIn" ? "signUp" : "signIn");
  };

  return (
    <Container
      className={cn("bg-background/80 aspect-square w-100 rounded-lg p-5")}
    >
      <Container className={cn("items-center gap-2")}>
        <Logo />
        <p className={cn("text-foreground/50 text-sm")}>
          {mode === "signIn" ? "Sign in" : "Sign up"} to experience the best
          healthcare services
        </p>
      </Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-5")}
      >
        <FieldGroup className={cn("flex flex-col gap-5")}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input {...field} type="password" placeholder="Password" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <AnimatePresence>
            {mode === "signUp" && (
              <m.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Controller
                  control={control}
                  name="role"
                  render={({ field, fieldState }) => (
                    <Field>
                      <Label>Role</Label>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="patient">Patient</SelectItem>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </m.span>
            )}
          </AnimatePresence>
        </FieldGroup>
        <Button
          type="submit"
          className={cn("w-full")}
          disabled={!isValid || !isDirty}
        >
          {mode === "signIn" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      <p>
        {mode === "signIn"
          ? "Don't have an account? "
          : "Already have an account? "}
        <Button variant="link" size="xs" onClick={toggleMode}>
          {mode === "signIn" ? "Sign Up" : "Sign In"}
        </Button>
      </p>
    </Container>
  );
};

export default AuthForm;
