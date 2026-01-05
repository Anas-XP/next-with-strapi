"use server";
import { asyncHandler } from "@/lib/error-handling/async-handler.utils";
import { authError_pre_defined } from "@/lib/error-handling/pre-defined-errors.utils";
import { UsersPermissionsPostAuthLocal200 } from "@/strapi-endpoints/__generated__/strapi-client/learningStrapiV5.schemas";
import { cookies } from "next/headers";
import {
  COOKIE_CONFIG,
  JWT_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  USER_COOKIE_NAME,
} from "../config";
import { fnWithSafeProp } from "@/types";

export const checkAuthCookiesCore: fnWithSafeProp = async ({ safe } = {}) => {
  const cookieStorage = await cookies();
  const hasJWTCookie = !!cookieStorage.get(JWT_COOKIE_NAME);

  // eslint-disable-next-line
  if (safe) return hasJWTCookie as any; // "any" is used intentionally (Types are being determined above)

  if (!hasJWTCookie)
    throw authError_pre_defined({ message: "No auth token found" });

  return hasJWTCookie;
};

export const checkAuthCookies = asyncHandler(checkAuthCookiesCore, false);

export const setLoginCookies = asyncHandler(
  async ({ jwt, refreshToken, user }: UsersPermissionsPostAuthLocal200) => {
    const cookieStorage = await cookies();

    cookieStorage.set(JWT_COOKIE_NAME, jwt, COOKIE_CONFIG);

    if (refreshToken)
      cookieStorage.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, COOKIE_CONFIG);

    cookieStorage.set(USER_COOKIE_NAME, JSON.stringify(user), COOKIE_CONFIG);
  },
);

export const logoutFromCookies = asyncHandler(async () => {
  const cookieStorage = await cookies();

  cookieStorage.delete(JWT_COOKIE_NAME);
  cookieStorage.delete(REFRESH_TOKEN_COOKIE_NAME);
  cookieStorage.delete(USER_COOKIE_NAME);

  return;
});
