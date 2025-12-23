"use server";
import { usersPermissionsPostAuthLocalRegisterBody } from "@/strapi-endpoints/__generated__/strapi-zod/users-permissions/users-permissions.zod";
import { userPermissionPluginAPI } from "../config";
import { UsersPermissionsPostAuthLocalRegisterBody } from "@/strapi-endpoints/__generated__/strapi-zod/__interfaces__";
import { getLoginRedirectURL } from "../utils";

const registerUsingStrapi =
  userPermissionPluginAPI.usersPermissionsPostAuthLocalRegister;

export const registerAction = async (
  params: UsersPermissionsPostAuthLocalRegisterBody,
) => {
  usersPermissionsPostAuthLocalRegisterBody.parse(params);
  await registerUsingStrapi(params);

  return {
    redirectURL: getLoginRedirectURL(),
  };
};
