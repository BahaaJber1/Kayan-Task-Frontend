import { authFormSchema } from "@zod/authForm.schema.js";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@lib/utils.js";
import { setUser } from "@app/store/slices/user.slice.js";
import { useNavigate } from "@tanstack/react-router";
import Container from "@ui/Container.jsx";
import axios from "axios";
import { AnimatePresence, motion as m } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const { handleSubmit, control, reset, formState, setValue } = form;
  const { isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    let result;
    if (mode === "signup") {
      result = await axios.post(
        "http://localhost:5000/api/v1/users/signup",
        data,
        { withCredentials: true },
      );
    }
    if (mode === "signin") {
      result = await axios.post(
        "http://localhost:5000/api/v1/users/signin",
        data,
        { withCredentials: true },
      );
    }

    if (result.status !== 200) {
      return;
    }

    dispatch(setUser(result.data.user));
    navigate({ to: "/dashboard" });

    reset();
    setValue("role", undefined);
    setValue("name", undefined);
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
          className={cn("w-full")}
          disabled={!isValid || !isDirty}
          whileHover={{ scale: 1.02 }}
        >
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
