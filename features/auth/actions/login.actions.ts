"use server";

import { asyncHandler } from "@/lib/error-handling/async-handler.utils";
import { userPermissionPluginAPI } from "../config";
import { getLoginRedirectURL } from "../utils";
import { TZodLoginFormSchema } from "../validations/auth-forms.zod";
import { setLoginCookies } from "./auth-cookies.actions";

const loginWithStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLocal;

export const loginAction = asyncHandler(
  async ({ email, password }: TZodLoginFormSchema) => {
    const loginResponse = await loginWithStrapi({
      identifier: email,
      password,
    });

    await setLoginCookies(loginResponse.data);

    return {
      redirectURL: getLoginRedirectURL(),
      username: loginResponse.data.user.username,
    };
  },
  true,
);
