"use client";

import { useRouterEnhanced } from "@/components/enhanced/use-router.enhanced";
import { showToastFromError } from "@/hooks/show-error-toast";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { registerAction } from "../actions/register.actions";

export const useRegister = () => {
  const router = useRouterEnhanced();
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: registerAction, // The server action to call

    // This is the most important part!
    onSuccess: (data) => {
      toast.success("Welcome Back!");

      const callbackUrl = searchParams.get("callbackUrl");

      if (callbackUrl) {
        router.push(callbackUrl);
        return;
      }

      if (data.redirectURL) {
        router.push(data.redirectURL);
      }
    },
    onError: (error) => {
      console.log("HHH", JSON.stringify(error));
      console.log("nnn", error);

      showToastFromError(error);
    },
  });
};
