import { AnyFormApi } from "@tanstack/react-form";
import { TNormalizedError } from "../error-handling/zod-error.schemas";

export function assignFormErrors(form: AnyFormApi, error: TNormalizedError) {
  if (!form) return;

  if (
    error.details &&
    typeof error.details === "object" &&
    "errors" in error.details &&
    Array.isArray(error.details.errors)
  ) {
    error.details.errors.forEach((err) => {
      const fieldName = err.path.join(".");

      form.setFieldMeta(fieldName, (prev) => ({
        ...prev,
        isTouched: true,
        errorMap: {
          ...prev.errorMap,
          onServer: { message: err.message },
        },
      }));
    });
  } else {
    form.setErrorMap({
      onServer: { message: error.message },
    });
  }
}
