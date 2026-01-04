import { useSignin, useSignup } from "@api/useAuth.js";
import Logo from "@components/application/Logo.jsx";
import MotionButton from "@components/application/MotionButton.jsx";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@components/ui/field.jsx";
import { Input } from "@components/ui/input.jsx";
import { Label } from "@components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select.jsx";
import { Spinner } from "@components/ui/spinner.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@lib/utils.js";
import Container from "@ui/Container.jsx";
import { authFormSchema } from "@zod/authForm.schema.js";
import { AnimatePresence, motion as m } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const AuthForm = () => {
  const { signin, isPending: isSigninPending } = useSignin();
  const { signup, isPending: isSignupPending } = useSignup();
  const [mode, setMode] = useState("signin");

  const form = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      role: undefined,
      name: undefined,
    },
    resolver: zodResolver(authFormSchema),
  });

  const { handleSubmit, control, formState, setValue, resetField } = form;
  const { isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    if (mode === "signup") {
      signup(data);
      return;
    }
    if (mode === "signin") {
      signin(data);
      resetField("password", {
        keepError: false,
      });
      return;
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setValue("role", undefined);
    setValue("name", undefined);
  };

  return (
    <Container
      className={cn("bg-background/80 aspect-square w-100 rounded-lg p-5")}
    >
      <Container className={cn("items-center gap-2")}>
        <Logo />
        <p className={cn("text-foreground/50 text-sm")}>
          {mode === "signin" ? "Sign in" : "Sign up"} to experience the best
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
            {mode === "signup" && (
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
            {mode === "signup" && (
              <m.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Input {...field} type="text" placeholder="Name" />
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
        <MotionButton
          type="submit"
          className={cn("w-full gap-5")}
          disabled={!isValid || !isDirty}
          whileHover={{ scale: 1.02 }}
        >
          {(isSigninPending || isSignupPending) && <Spinner />}
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </MotionButton>
      </form>
      <p>
        {mode === "signin"
          ? "Don't have an account? "
          : "Already have an account? "}
        <MotionButton variant="link" size="xs" onClick={toggleMode}>
          {mode === "signin" ? "Sign Up" : "Sign In"}
        </MotionButton>
      </p>
    </Container>
  );
};

export default AuthForm;
