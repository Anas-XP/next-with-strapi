import { cookies } from "next/headers";
import {
  JWT_COOKIE_NAME,
  USER_COOKIE_NAME,
  userPermissionPluginAPI,
} from "../config";

const logoutFromStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLogout;

const removeLoginCookies = async () => {
  const cookieStorage = await cookies();

  cookieStorage.delete(JWT_COOKIE_NAME);
  cookieStorage.delete(USER_COOKIE_NAME);

  return;
};

export const logoutAction = async () => {
  await logoutFromStrapi();

  await removeLoginCookies();

  return;
};
