import { AxiosError } from "axios";
import { ZStrapiErrorResponse } from "./zod-error.schemas";

export const getAxiosErrorMessage = (error: AxiosError) => {
  if (error.code === "ECONNREFUSED") {
    return "We couldn't reach our service. Please, check your internet connection.";
  }

  const parsedStrapi = ZStrapiErrorResponse.safeParse(error.response?.data);

  if (parsedStrapi.success) return parsedStrapi.data?.error.message;

  return error.message;
};
