"use server";

import { asyncHandler } from "@/lib/error-handling/async-handler.utils";
import { userPermissionPluginAPI } from "../config";
import { AFTER_LOGIN_REDIRECT_URL } from "../utils";
import { TZodLoginFormSchema } from "../validations/auth-forms.zod";
import { setLoginCookies } from "./auth-cookies.actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const loginWithStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLocal;

export const loginAction = asyncHandler(
  async ({
    email,
    password,
    callbackUrl,
  }: TZodLoginFormSchema & {
    callbackUrl?: string;
  }) => {
    const loginResponse = await loginWithStrapi({
      identifier: email,
      password,
    });

    await setLoginCookies(loginResponse.data);

    revalidatePath("/", "layout");

    let destination = AFTER_LOGIN_REDIRECT_URL;

    if (callbackUrl && callbackUrl.startsWith("/")) {
      destination = callbackUrl;
    }

    redirect(destination);
  },
  true,
);
