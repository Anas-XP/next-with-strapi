import axios from "axios";
import {
  CaughtError,
  INormalizedError,
  StrapiErrorResponse,
  ZEErrorName,
} from "./caught-error.utils";

export type SafeResult<T> =
  | { success: true; data: T; error?: never }
  | { success: false; error: INormalizedError; data?: never };

export function asyncHandler<TArgs extends unknown[], TOutput>(
  action: (...args: TArgs) => Promise<TOutput>,
  safe: true,
): (...args: TArgs) => Promise<SafeResult<TOutput>>;

export function asyncHandler<TArgs extends unknown[], TOutput>(
  action: (...args: TArgs) => Promise<TOutput>,
  safe?: false,
): (...args: TArgs) => Promise<TOutput>;

export function asyncHandler<TArgs extends unknown[], TOutput>(
  action: (...args: TArgs) => Promise<TOutput>,
  safe = false,
) {
  return (...args: TArgs) =>
    action(...args)
      .then((response) => (safe ? { success: true, data: response } : response))
      .catch((error: unknown) => {
        let normalizedError: CaughtError = new CaughtError(
          "Unexpected Error",
          500,
          null,
          "UnexpectedError",
        );

        if (error instanceof CaughtError) {
          normalizedError = new CaughtError(
            error.message,
            error.status,
            error.details,
            error.name,
          );
        } else if (axios.isAxiosError(error)) {
          const strapiData = error.response?.data as StrapiErrorResponse;

          let message = strapiData?.error?.message || error.message;
          const details = strapiData?.error?.details;

          if (
            strapiData?.error?.name === "ValidationError" &&
            details?.errors &&
            Array.isArray(details.errors) &&
            details.errors.length > 0
          ) {
            const firstError = details.errors[0];
            message = firstError.message;
          }

          normalizedError = new CaughtError(
            message,
            error.response?.status || 500,
            details,
          );

          // التحقق من اسم الخطأ كما كان في الكود السابق
          const errorNameValidationResult = ZEErrorName.safeParse(error.name);
          const strapiErrorNameValidationResult = ZEErrorName.safeParse(
            strapiData?.error?.name,
          );

          if (
            errorNameValidationResult.success &&
            strapiErrorNameValidationResult.success
          ) {
            normalizedError.name = `${strapiErrorNameValidationResult.data}`;
            // في حالة الـ Validation، لا نريد تكرار الاسم في الرسالة لأننا حسنّا الرسالة بالفعل
            if (strapiData?.error?.name !== "ValidationError") {
              normalizedError.message =
                `${errorNameValidationResult.data} : ` +
                normalizedError.message;
            }
          } else if (strapiErrorNameValidationResult.success) {
            normalizedError.name = strapiErrorNameValidationResult.data;
          } else if (errorNameValidationResult.success) {
            normalizedError.name = errorNameValidationResult.data;
          } else {
            // Fallback
            normalizedError.name = "UnexpectedError";
          }
        } else if (error instanceof Error) {
          normalizedError = new CaughtError(error.message, 500, null);

          const errorNameValidationResult = ZEErrorName.safeParse(error.name);

          if (!errorNameValidationResult.success) {
            normalizedError.name = "UnexpectedError";
          } else {
            normalizedError.name = errorNameValidationResult.data;
          }
        }

        if (safe) {
          return {
            success: false,
            error: {
              message: normalizedError.message,
              details: normalizedError.details,
              status: normalizedError.status,
              name: normalizedError.name,
            },
          };
        }

        throw normalizedError;
      });
}
