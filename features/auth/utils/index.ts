import { getEnv } from "@/lib/env.utils";

export const getLoginRedirectURL = () => {
  return getEnv("AFTER_LOGIN_REDIRECT_URL", { required: true });
};
