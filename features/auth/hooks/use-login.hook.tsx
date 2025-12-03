"use client";

import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../actions/login.actions";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@/i18n/navigation";
import { formatToTitleCase } from "@/lib/string.utils";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginAction, // The server action to call

    // This is the most important part!
    onSuccess: (data) => {
      toast.success("Welcome Back!");

      if (data.redirectURL) {
        router.push(data.redirectURL);
      }
    },
    onError: (error) => {
      toast.error(`${formatToTitleCase(error.name)}`, {
        description: () => (
          <div>
            <Separator />
            <p>{error.message}</p>
          </div>
        ),
      });
    },
  });
};
