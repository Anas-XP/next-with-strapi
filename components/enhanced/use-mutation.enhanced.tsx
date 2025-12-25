"use client";

import { useRouterEnhanced } from "@/components/enhanced/use-router.enhanced";
import { showToastFromError } from "@/hooks/show-error-toast";
import { assignFormErrors } from "@/lib/error-handling/assign-form-errors.utils";
import { CaughtError } from "@/lib/error-handling/caught-error.utils";
import {
  ZSafeErrorResponse,
  ZSafeSuccessResponse,
} from "@/lib/error-handling/zod-error.schemas";
import { AnyFormApi } from "@tanstack/react-form";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface EnhancedConfig {
  form?: AnyFormApi;

  showErrorToast?: boolean;
  disableRedirect?: boolean;
}

type UseMutationEnhancedOptions<TData, TError, TVariables, TContext> =
  UseMutationOptions<TData, TError, TVariables, TContext> & EnhancedConfig;

export const useMutationEnhanced = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationEnhancedOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const router = useRouterEnhanced();
  const searchParams = useSearchParams();

  const {
    onSuccess,
    form,
    showErrorToast = false,
    disableRedirect = false,
    ...params
  } = options;

  return useMutation({
    ...params,
    onSuccess(data, variables, onMutateResult, context) {
      const safeErrorDataValidation = ZSafeErrorResponse.safeParse(data);
      if (safeErrorDataValidation.success) {
        if (showErrorToast) {
          showToastFromError(
            new CaughtError(
              safeErrorDataValidation.data.error.message,
              500,
              {},
              safeErrorDataValidation.data.error.name,
            ),
          );
        }
        if (form) assignFormErrors(form, safeErrorDataValidation.data.error);

        return;
      }

      const safeResponseDataValidation = ZSafeSuccessResponse.safeParse(data);

      if (safeResponseDataValidation.success) {
        onSuccess?.(data, variables, onMutateResult, context);

        if (form) form.reset();

        if (!disableRedirect) {
          const callbackUrl = searchParams.get("callbackUrl");
          if (
            safeResponseDataValidation.data.data &&
            typeof safeResponseDataValidation.data.data === "object" &&
            "redirectURL" in safeResponseDataValidation.data.data &&
            safeResponseDataValidation.data.data.redirectURL &&
            typeof safeResponseDataValidation.data.data.redirectURL === "string"
          ) {
            if (callbackUrl) {
              router.push(callbackUrl);
            } else {
              router.push(safeResponseDataValidation.data.data.redirectURL);
            }
          }
        }
      }
    },
  });
};
