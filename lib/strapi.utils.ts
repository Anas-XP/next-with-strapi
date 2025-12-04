import { AxiosError } from "axios";

interface StrapiErrorResponse {
  data: {
    error: {
      status: number;
      name: string;
      message: string;
      details?: any;
    };
  };
}

export function isStrapiError(error: AxiosError): error is StrapiErrorResponse {
  return !!(
    error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "error" in error.response.data &&
    typeof error.response.data.error === "object" &&
    error.response.data.error &&
    "status" in error.response.data.error &&
    typeof error.response.data.error.status === "number" &&
    "name" in error.response.data.error &&
    typeof error.response.data.error.name === "string" &&
    "message" in error.response.data.error &&
    typeof error.response.data.error.message === "string"
  );
}
