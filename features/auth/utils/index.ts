import { getEnv } from "@/lib/env.utils";

export const AFTER_LOGIN_REDIRECT_URL = getEnv(
  "NEXT_PUBLIC_AFTER_LOGIN_REDIRECT_URL",
  {
    required: true,
  },
);

export const AFTER_LOGOUT_REDIRECT_URL = getEnv(
  "NEXT_PUBLIC_AFTER_LOGOUT_REDIRECT_URL",
  {
    required: true,
  },
);

export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const LOGOUT_URL = "/api/auth/logout";
