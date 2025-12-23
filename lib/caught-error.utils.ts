import z from "zod";

export const ZEErrorName = z.enum([
  "AxiosError",
  "ForbiddenError",
  "ValidationError",
  "RateLimitError",
  "StrapiError",
  "UnexpectedError",
  "ApplicationError",
]);

export type EErrorName = z.infer<typeof ZEErrorName>;

export interface StrapiValidationError {
  path: string[];
  message: string;
  name: string;
  value: string;
}

export interface StrapiErrorDetails {
  errors?: StrapiValidationError[];
  [key: string]: unknown;
}

export interface INormalizedError {
  message: string;
  details?: StrapiErrorDetails | unknown | null;
  status: number;
  name: EErrorName;
}

export interface StrapiErrorResponse {
  data: null;
  error: {
    status: number;
    name: EErrorName;
    message: string;
    details?: StrapiErrorDetails;
  };
}

export class CaughtError extends Error {
  status: INormalizedError["status"];
  details?: INormalizedError["details"];
  name: INormalizedError["name"];

  constructor(
    message: INormalizedError["message"],
    status: INormalizedError["status"] = 500,
    details?: INormalizedError["details"],
    name: INormalizedError["name"] = "UnexpectedError",
  ) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = name;
  }
}
