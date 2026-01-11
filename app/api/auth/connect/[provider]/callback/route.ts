import { loginWithProviderAction } from "@/features/auth/actions/login.actions";
import { ZEProvider } from "@/features/auth/validations/auth-forms.zod";
import { CaughtError } from "@/lib/error-handling/caught-error.utils";
import type { AppRouteHandlerFn } from "next/dist/server/route-modules/app-route/module";
import { NextResponse } from "next/server";

export const GET: AppRouteHandlerFn = async (
  request,
  { params: awaitableParams },
) => {
  const params = await awaitableParams;
  const providerValidation = ZEProvider.safeParse(params?.["provider"]);

  if (!providerValidation.success) {
    const caughtError = new CaughtError(
      `${providerValidation.error.message}`,
      400,
      null,
      "ProviderValidationError",
    );
    caughtError.toSearchParams();

    return NextResponse.redirect(
      new URL("/login" + caughtError.toSearchParams(), request.url),
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("access_token");

  if (!token)
    return NextResponse.redirect(new URL("/login?error=no_token", request.url));

  const { success, error } = await loginWithProviderAction({
    provider: providerValidation.data,
    access_token: token,
  });

  if (!success) {
    const caughtError = new CaughtError(
      error.message,
      error.status,
      null,
      error.name,
    );

    return NextResponse.redirect(
      new URL(`/login?${caughtError.toSearchParams()}`, request.url),
    );
  }
};
