import axios from "axios";
import {
  TNormalizedError,
  ZEErrorName,
  ZStrapiErrorResponse,
} from "./zod-error.schemas";
import { getAxiosErrorMessage } from "./error-messages.utils";
import { logger } from "../logger";

export class CaughtError extends Error {
  status: number;
  details?: TNormalizedError["details"];
  name: TNormalizedError["name"];

  constructor(
    message: string,
    status: number = 500,
    details: TNormalizedError["details"] = null,
    name: string = "UnexpectedError",
  ) {
    super(message);
    this.status = status;
    this.details = details;

    const errorNameValidation = ZEErrorName.safeParse(name);

    if (!errorNameValidation.success) {
      this.name = "UnknownError";
    } else {
      this.name = errorNameValidation.data;
    }

    Object.setPrototypeOf(this, CaughtError.prototype);
  }

  static from(error: unknown): CaughtError {
    if (error instanceof CaughtError) {
      return error;
    }

    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      const axiosErrorMessage = getAxiosErrorMessage(error);

      const parsedStrapi = ZStrapiErrorResponse.safeParse(responseData);

      if (parsedStrapi.success) {
        const strapiError = parsedStrapi.data.error;
        const nameParse = ZEErrorName.safeParse(strapiError.name);
        const finalName = nameParse.success ? nameParse.data : "StrapiError";

        return new CaughtError(
          axiosErrorMessage,
          error.response?.status || 500,
          strapiError.details,
          finalName,
        );
      }

      return new CaughtError(
        axiosErrorMessage,
        error.response?.status || 500,
        null,
        "AxiosError",
      );
    }

    if (error instanceof Error) {
      return new CaughtError(error.message, 500, null, "UnexpectedError");
    }

    return new CaughtError("An unknown error occurred", 500);
  }

  toNormalizedObject(): TNormalizedError {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details,
    };
  }

  toSearchParams() {
    const params = new URLSearchParams();

    params.set("error[name]", this.name);
    params.set("error[message]", this.message);
    params.set("error[status]", this.status.toString());

    return params.toString();
  }
}
