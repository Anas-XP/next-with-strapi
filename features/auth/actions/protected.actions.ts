"use server";

import { asyncHandler } from "@/lib/error-handling/async-handler.utils";
import { CaughtError } from "@/lib/error-handling/caught-error.utils";
import { userPermissionPluginAPI } from "../config";
import { checkAuthCookies } from "./auth-cookies.actions";

const getMeFromStrapi = userPermissionPluginAPI.usersPermissionsGetUsersMe;

export const getCurrentUserAction = asyncHandler(async () => {
  const hasAuthToken = await checkAuthCookies();
  if (!hasAuthToken)
    throw new CaughtError("No auth token found", 500, null, "AuthError");
  const { data: me } = await getMeFromStrapi();

  return me;
});
