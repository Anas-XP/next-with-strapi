"use client";

import { useMutationEnhanced } from "@/components/enhanced/use-mutation.enhanced";
import { logoutAction } from "../actions/logout.action";

export const useLogout = () => {
  return useMutationEnhanced({
    mutationFn: logoutAction,
    showErrorToast: true,
  });
};
