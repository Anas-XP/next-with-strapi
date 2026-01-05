import { getCurrentUserAction } from "@/features/auth/actions/protected.actions";
import { authError_pre_defined } from "@/lib/error-handling/pre-defined-errors.utils";

export const checkPhoneVerification = async ({ safe = false } = {}) => {
  const { data: me } = await getCurrentUserAction();

  if (safe) return !!me?.isPhoneVerified;

  if (!me?.isPhoneVerified)
    throw authError_pre_defined({ message: "Phone number is not verified!" });

  return me.isPhoneVerified;
};
