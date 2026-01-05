import { routing } from "@/i18n/routing";
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
export const PHONE_VERIFICATION_URL = "/verify-phone";

export const PUBLIC_ROUTES = ["/"];

export const AUTH_ROUTES = [
  LOGIN_URL,
  REGISTER_URL,
  // "/forgot-password"
];

export const createPathnameRegex = (routes: string[]) =>
  RegExp(
    `^(/(${routing.locales.join("|")}))?(${routes
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

export const publicPathnameRegex = createPathnameRegex(PUBLIC_ROUTES);
export const authPathnameRegex = createPathnameRegex(AUTH_ROUTES);
