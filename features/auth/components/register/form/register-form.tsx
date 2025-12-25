"use client";
import { FormCardWrapper } from "@/components/form-card-wrapper/form-card-wrapper";
import { CardContent } from "@/components/ui/card";
import { useRegister } from "@/features/auth/hooks/use-register.hook";
import { zodRegisterFormSchema } from "@/features/auth/validations/auth-forms.zod";
import { useForm } from "@tanstack/react-form";

import { LogInLinkButton } from "@/components/login-link-button";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { UserPlus } from "lucide-react";

export const RegisterForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmitAsync: zodRegisterFormSchema,
      onChange: () => {
        if (form.state.errorMap.onServer) {
          form.setErrorMap({
            onServer: undefined,
          });
        }
      },
    },
    onSubmit({ value }) {
      registerMutate(value);
    },
  });

  const { mutate: registerMutate, isPending: isRegisterPending } = useRegister({
    form,
  });

  return (
    <FormCardWrapper
      title={
        <span className="flex items-center gap-2">
          <UserPlus />
          Sign Up
        </span>
      }
      description="Enter your info to add a new user"
      formReset={form.reset}
    >
      <>
        <CardContent>
          <form
            id="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="username">
                {(field) => {
                  const serverError = field.state.meta.errorMap?.onServer;
                  const zodErrors = field.state.meta.errors;
                  const displayErrors = serverError ? [serverError] : zodErrors;

                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          if (serverError) {
                            field.setMeta((prev) => ({
                              ...prev,
                              errorMap: {
                                ...prev.errorMap,
                                onServer: undefined,
                              },
                            }));
                          }
                          field.handleChange(e.target.value);
                        }}
                        aria-invalid={isInvalid}
                        placeholder="fulan"
                      />
                      {isInvalid && <FieldError errors={displayErrors} />}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="email">
                {(field) => {
                  const serverError = field.state.meta.errorMap?.onServer;
                  const zodErrors = field.state.meta.errors;
                  const displayErrors = serverError ? [serverError] : zodErrors;

                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          if (serverError) {
                            field.setMeta((prev) => ({
                              ...prev,
                              errorMap: {
                                ...prev.errorMap,
                                onServer: undefined,
                              },
                            }));
                          }
                          field.handleChange(e.target.value);
                        }}
                        aria-invalid={isInvalid}
                        placeholder="fulan@example.com"
                      />
                      {isInvalid && <FieldError errors={displayErrors} />}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="password">
                {(field) => {
                  const serverError = field.state.meta.errorMap?.onServer;
                  const zodErrors = field.state.meta.errors;
                  const displayErrors = serverError ? [serverError] : zodErrors;

                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        type="password"
                        onChange={(e) => {
                          if (serverError) {
                            field.setMeta((prev) => ({
                              ...prev,
                              errorMap: {
                                ...prev.errorMap,
                                onServer: undefined,
                              },
                            }));
                          }
                          field.handleChange(e.target.value);
                        }}
                        aria-invalid={isInvalid}
                        placeholder="********"
                      />
                      {isInvalid && <FieldError errors={displayErrors} />}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation="vertical">
            <Button
              disabled={isRegisterPending}
              type="submit"
              form="register-form"
            >
              <Spinner
                className={cn("hidden", {
                  block: isRegisterPending,
                })}
              />
              {!isRegisterPending && "Submit"}
            </Button>
            <FieldError errors={[form.state.errorMap.onServer]} />

            <Separator />
            <LogInLinkButton variant={"outline"} />
          </Field>
        </CardFooter>
      </>
    </FormCardWrapper>
  );
};
