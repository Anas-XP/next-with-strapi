"use server";

import { userPermissionPluginAPI } from "../config";
import { getLoginRedirectURL } from "../utils";
import { TZodLoginFormSchema } from "../validations/auth-forms.zod";
import { setLoginCookies } from "./auth-cookies.actions";

const loginWithStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLocal;

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
