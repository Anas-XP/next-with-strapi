"use client";

import { useMutationEnhanced } from "@/components/enhanced/use-mutation.enhanced";
import { AnyFormApi } from "@tanstack/react-form";
import { toast } from "sonner";
import { registerAction } from "../actions/register.actions";

export const useRegister = ({ form }: { form: AnyFormApi }) => {
  return useMutationEnhanced({
    form,
    mutationFn: registerAction,
    onSuccess: ({ username }) => {
      toast.success(`Welcome, ${username}!`, {
        description: `Now, you can login.`,
      });
    },
  });
};
