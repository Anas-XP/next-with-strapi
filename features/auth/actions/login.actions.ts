"use server";

import { getEnv } from "@/lib/env.utils";
import { UsersPermissionsPostAuthLocal200 } from "@/strapi-endpoints/api-token-client/learningStrapiV5.schemas";
import { getUsersPermissions } from "@/strapi-endpoints/api-token-client/users-permissions/users-permissions";
import { cookies } from "next/headers";
import { TZodLoginFormSchema } from "../validations/login-form.zod";
import { logger } from "@/lib/logger";
import { AxiosError } from "axios";

const JWT_COOKIE_NAME = "jwt";
const USER_COOKIE_NAME = "user";

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  sameSite: "lax" as const,
};

const userPermissionPluginAPI = getUsersPermissions();

const loginWithStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLocal;

const setLoginCookies = async ({
  jwt,
  user,
}: UsersPermissionsPostAuthLocal200) => {
  const cookieStorage = await cookies();

  cookieStorage.set(JWT_COOKIE_NAME, jwt, COOKIE_CONFIG);
  cookieStorage.set(USER_COOKIE_NAME, JSON.stringify(user), COOKIE_CONFIG);
};

const getLoginRedirectURL = () => {
  return getEnv("LOGIN_REDIRECT_URL", { required: true });
};

export const loginAction = async ({ email, password }: TZodLoginFormSchema) => {
  logger.auth.info("Credentials =?", {
    email,
    password,
  });
  const loginResponse = await loginWithStrapi({
    identifier: email,
    password,
  }).catch((axiosError: AxiosError) => {
    let modifiedError = new Error();
    logger.general.info(
      "CHECKING",
      (axiosError.response &&
        axiosError.response.data &&
        typeof axiosError.response.data === "object" &&
        "error" in axiosError.response.data &&
        typeof axiosError.response.data.error === "object" &&
        axiosError.response.data.error &&
        "status" in axiosError.response.data.error &&
        typeof axiosError.response.data.error.status === "number" &&
        "name" in axiosError.response.data.error &&
        typeof axiosError.response.data.error.name === "string" &&
        "message" in axiosError.response.data.error &&
        typeof axiosError.response.data.error.message === "string")
    );
    if (axiosError.response &&
        axiosError.response.data &&
        typeof axiosError.response.data === "object" &&
        "error" in axiosError.response.data &&
        typeof axiosError.response.data.error === "object" &&
        axiosError.response.data.error &&
        "status" in axiosError.response.data.error &&
        typeof axiosError.response.data.error.status === "number" &&
        "name" in axiosError.response.data.error &&
        typeof axiosError.response.data.error.name === "string" &&
        "message" in axiosError.response.data.error &&
        typeof axiosError.response.data.error.message === "string"
    ) {
      const { name, message } = axiosError.response.data.error;
      modifiedError.name = name;
      modifiedError.message = message;
      throw modifiedError;
    } else {
      throw axiosError;
    }
  });

  logger.auth.info("[RRR]", loginResponse);
  await setLoginCookies(loginResponse.data);

  return {
    redirectURL: getLoginRedirectURL(),
  };
};
