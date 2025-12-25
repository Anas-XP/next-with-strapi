"use server";
import { usersPermissionsPostAuthLocalRegisterBody } from "@/strapi-endpoints/__generated__/strapi-zod/users-permissions/users-permissions.zod";
import { userPermissionPluginAPI } from "../config";
import { UsersPermissionsPostAuthLocalRegisterBody } from "@/strapi-endpoints/__generated__/strapi-zod/__interfaces__";
import { getLoginRedirectURL } from "../utils";
import { asyncHandler } from "@/lib/error-handling/async-handler.utils";

const registerUsingStrapi =
  userPermissionPluginAPI.usersPermissionsPostAuthLocalRegister;

export const registerAction = asyncHandler(
  async (params: UsersPermissionsPostAuthLocalRegisterBody) => {
    usersPermissionsPostAuthLocalRegisterBody.parse(params);
    const response = await registerUsingStrapi(params);

    return {
      redirectURL: getLoginRedirectURL(),
      username: response.data.user.username,
    };
  },
);
