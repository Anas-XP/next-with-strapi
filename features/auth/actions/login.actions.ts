"use server";

import { asyncHandler } from "@/lib/error-handling/async-handler.utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { userPermissionPluginAPI } from "../config";
import { AFTER_LOGIN_REDIRECT_URL } from "../utils";
import { TEProvider, TZodLoginFormSchema } from "../validations/auth-forms.zod";
import { setLoginCookies } from "./auth-cookies.actions";

const loginWithStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLocal;
const loginWithProvider =
  userPermissionPluginAPI.usersPermissionsGetAuthByProviderCallback;
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
);

export const loginWithProviderAction = asyncHandler(
  async ({
    access_token,
    provider,
  }: {
    access_token: string;
    provider: TEProvider;
  }) => {
    const loginWithProviderResponse = await loginWithProvider(provider, {
      access_token,
    });

    await setLoginCookies(loginWithProviderResponse.data);

    revalidatePath("/", "layout");

    redirect(AFTER_LOGIN_REDIRECT_URL);
  },
);
