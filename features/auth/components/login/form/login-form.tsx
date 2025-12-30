"use client";
import { FormCardWrapper } from "@/components/form-card-wrapper/form-card-wrapper";
import { RegisterLinkButton } from "@/components/register-link-button";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
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
import { useForm } from "@tanstack/react-form";
import { useLogin } from "../../../hooks/use-login.hook";
import { zodLoginFormSchema } from "../../../validations/auth-forms.zod";
import { LogInIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || undefined;
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmitAsync: zodLoginFormSchema,
      onChange: () => {
        if (form.state.errorMap.onServer) {
          form.setErrorMap({
            onServer: undefined,
          });
        }
      },
    },
    onSubmit({ value }) {
      loginMutate({ ...value, callbackUrl });
    },
  });

  const { mutate: loginMutate, isPending: isLoginPending } = useLogin({ form });

  return (
    <FormCardWrapper
      title=<span className="flex items-center gap-2">
        <LogInIcon />
        Login
      </span>
      description="Enter your credentials below to login to your account"
      formReset={form.reset}
    >
      <>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="email">
                {(field) => {
                  const serverError = field.state.meta.errorMap?.onServer;
                  const zodErrors = field.state.meta.errors;
                  const displayErrors = serverError ? [serverError] : zodErrors;

                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email (Identifier)
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="fulan@example.com"
                        required
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
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        type="password"
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="********"
                        required
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
            <Button disabled={isLoginPending} type="submit" form="login-form">
              <Spinner
                className={cn("hidden", {
                  block: isLoginPending,
                })}
              />
              {!isLoginPending && "Submit"}
            </Button>
            <FieldError errors={[form.state.errorMap.onServer]} />

            <Separator />

            <RegisterLinkButton variant={"outline"} />
          </Field>
        </CardFooter>
      </>
    </FormCardWrapper>
  );
};
