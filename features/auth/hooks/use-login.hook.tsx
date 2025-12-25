"use client";

import { useMutationEnhanced } from "@/components/enhanced/use-mutation.enhanced";
import { toast } from "sonner";
import { loginAction } from "../actions/login.actions";
import { AnyFormApi } from "@tanstack/react-form";

export const useLogin = ({ form }: { form: AnyFormApi }) => {
  return useMutationEnhanced({
    mutationFn: loginAction,
    form,
    onSuccess: ({ success, data }) => {
      if (success) {
        toast.success(`Welcome Back! ${data.username}`);
      }
    },
  });
};
