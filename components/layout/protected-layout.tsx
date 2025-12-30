import { getCurrentUserAction } from "@/features/auth/actions/protected.actions";
import { LOGOUT_URL } from "@/features/auth/utils";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const ProtectedLayoutComponent = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const { success: isLoggedIn } = await getCurrentUserAction();

  if (isLoggedIn) return children;

  if (!isLoggedIn) redirect(LOGOUT_URL);
};
