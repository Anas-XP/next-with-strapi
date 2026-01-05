import { CaughtError } from "./caught-error.utils";

export const authError_pre_defined = ({
  message = "No auth token found",
}: {
  message?: string;
}) => new CaughtError(message, 401, null, "AuthError");
