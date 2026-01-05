"use server";

import { asyncHandler } from "@/lib/error-handling/async-handler.utils";
import { userPermissionPluginAPI } from "../config";
import { checkAuthCookies } from "./auth-cookies.actions";
import { authError_pre_defined } from "@/lib/error-handling/pre-defined-errors.utils";

const getMeFromStrapi = userPermissionPluginAPI.usersPermissionsGetUsersMe;

export const getCurrentUserAction = asyncHandler(async () => {
  await checkAuthCookies();

  const { data: me } = await getMeFromStrapi();

  if (!me) throw authError_pre_defined({ message: "User not found." });

  return me;
});
