import { isRedirectError } from "next/dist/client/components/redirect-error";
import { CaughtError } from "./caught-error.utils";
import { TNormalizedError } from "./zod-error.schemas";

export type SafeResult<T> =
  | { success: true; data: T; error?: never }
  | { success: false; error: TNormalizedError; data?: never };

export function asyncHandler<TArgs extends unknown[], TOutput>(
  action: (...args: TArgs) => Promise<TOutput>,
  safe: false,
): (...args: TArgs) => Promise<TOutput>;

export function asyncHandler<TArgs extends unknown[], TOutput>(
  action: (...args: TArgs) => Promise<TOutput>,
  safe?: true,
): (...args: TArgs) => Promise<SafeResult<TOutput>>;

export function asyncHandler<TArgs extends unknown[], TOutput>(
  action: (...args: TArgs) => Promise<TOutput>,
  safe = true,
) {
  return async (...args: TArgs) => {
    try {
      const response = await action(...args);
      return safe ? { success: true, data: response } : response;
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }

      const normalizedError = CaughtError.from(error);

      if (safe) {
        return {
          success: false,
          error: normalizedError.toNormalizedObject(),
        };
      }

      throw normalizedError;
    }
  };
}
