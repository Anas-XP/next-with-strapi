"use server";

import { getEnv } from "@/lib/env.utils";
import { UsersPermissionsPostAuthLocal200 } from "@/strapi-endpoints/api-token-client/learningStrapiV5.schemas";
import { getUsersPermissions } from "@/strapi-endpoints/api-token-client/users-permissions/users-permissions";
import { cookies } from "next/headers";
import { TZodLoginFormSchema } from "../validations/login-form.zod";

const JWT_COOKIE_NAME = "jwt";
const USER_COOKIE_NAME = "user";

const userPermissionPluginAPI = getUsersPermissions();

const loginWithStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLocal;

const setLoginCookies = async ({
  jwt,
  user,
}: UsersPermissionsPostAuthLocal200) => {
  const cookieStorage = await cookies();

  cookieStorage.set(JWT_COOKIE_NAME, jwt);
  cookieStorage.set(USER_COOKIE_NAME, JSON.stringify(user));
};

const getLoginRedirectURL = () => {
  return getEnv("LOGIN_REDIRECT_URL", { required: true });
};

export const loginAction = async ({ email, password }: TZodLoginFormSchema) => {
  const loginResponse = await loginWithStrapi({
    identifier: email,
    password,
  });

  await setLoginCookies(loginResponse.data);

  return {
    redirectURL: getLoginRedirectURL(),
  };
};
