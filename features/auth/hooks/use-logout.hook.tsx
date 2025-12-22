"use client";

import { useRouterEnhanced } from "@/components/enhanced/use-router.enhanced";
import { showToastFromError } from "@/hooks/show-error-toast";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { logoutAction } from "../actions/logout.action";

export const useLogout = () => {
  const router = useRouterEnhanced();
  return useMutation({
    mutationFn: logoutAction, // The server action to call

    // This is the most important part!
    onSuccess: (data) => {
      toast.success("Seeeeeee Yaaaaaaa§!");

      if (data.redirectURL) {
        router.push(data.redirectURL);
      }
    },
    onError: (error) => {
      showToastFromError(error);
    },
  });
};
