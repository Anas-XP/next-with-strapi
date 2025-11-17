"use client";

import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../actions/login.actions";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@/i18n/navigation";

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
      toast.error("Signed In! (Error) ", {
        description: () => (
          <div>
            <pre>{JSON.stringify(error, null, 4)}</pre>
            <Separator />
            <ol className="list-decimal">
              <li>{error.name}</li>
              <li>{error.message}</li>
              <li>{error.stack}</li>
              <li>{JSON.stringify(error.cause, null, 4)}</li>
            </ol>
          </div>
        ),
      });
    },
  });
};
