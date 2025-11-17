import { getUsersPermissions } from "@/strapi-endpoints/api-token-client/users-permissions/users-permissions";

export const JWT_COOKIE_NAME = "jwt";
export const USER_COOKIE_NAME = "user";

export const userPermissionPluginAPI = getUsersPermissions();
