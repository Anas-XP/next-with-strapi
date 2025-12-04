"use server";

import { getEnv } from "@/lib/env.utils";
import { logger } from "@/lib/logger";
import { UsersPermissionsPostAuthLocal200 } from "@/strapi-endpoints/__generated__/strapi-client/learningStrapiV5.schemas";
import { cookies } from "next/headers";
import {
  COOKIE_CONFIG,
  JWT_COOKIE_NAME,
  USER_COOKIE_NAME,
  userPermissionPluginAPI,
} from "../config";
import { TZodLoginFormSchema } from "../validations/login-form.zod";

const loginWithStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLocal;

const setLoginCookies = async ({
  jwt,
  user,
}: UsersPermissionsPostAuthLocal200) => {
  const cookieStorage = await cookies();

  cookieStorage.set(JWT_COOKIE_NAME, jwt, COOKIE_CONFIG);
  cookieStorage.set(USER_COOKIE_NAME, JSON.stringify(user), COOKIE_CONFIG);
};

const getLoginRedirectURL = () => {
  return getEnv("LOGIN_REDIRECT_URL", { required: true });
};

export const loginAction = async ({ email, password }: TZodLoginFormSchema) => {
  logger.auth.info("Credentials =?", {
    email,
    password,
  });
  const loginResponse = await loginWithStrapi({
    identifier: email,
    password,
  });

  logger.auth.info("[RRR]", loginResponse);
  await setLoginCookies(loginResponse.data);

  return {
    redirectURL: getLoginRedirectURL(),
  };
};
