"use server";

import { asyncHandler } from "@/lib/error-handling/async-handler.utils";
import { userPermissionPluginAPI } from "../config";

const getMeFromStrapi = userPermissionPluginAPI.usersPermissionsGetUsersMe;

export const getMeAction = asyncHandler(async () => {
  const { data: me } = await getMeFromStrapi();

  return me;
});
