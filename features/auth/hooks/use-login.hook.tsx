"use client";

import { useMutationEnhanced } from "@/components/enhanced/use-mutation.enhanced";
import { AnyFormApi } from "@tanstack/react-form";
import { loginAction } from "../actions/login.actions";

export const useLogin = ({ form }: { form: AnyFormApi }) => {
  return useMutationEnhanced({
    mutationFn: loginAction,
    form,
  });
};
