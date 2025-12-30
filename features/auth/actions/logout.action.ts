"use server";
import { asyncHandler } from "@/lib/error-handling/async-handler.utils";
import { revalidatePath } from "next/cache";
import { userPermissionPluginAPI } from "../config";
import { logoutFromCookies } from "./auth-cookies.actions";

import { redirect } from "next/navigation";
import { AFTER_LOGIN_REDIRECT_URL } from "../utils";

const logoutFromStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLogout;

export const logoutAction = asyncHandler(async () => {
  await logoutFromStrapi();

  await logoutFromCookies();

  revalidatePath("/", "layout");

  redirect(AFTER_LOGIN_REDIRECT_URL);
});
