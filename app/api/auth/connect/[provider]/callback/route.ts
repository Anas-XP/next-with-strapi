import { loginWithProviderAction } from "@/features/auth/actions/login.actions";
import { ZEProvider } from "@/features/auth/validations/auth-forms.zod";
import { getAxiosErrorMessage } from "@/lib/error-handling/error-messages.utils";
import { logger } from "@/lib/logger";
import { AxiosError } from "axios";
import type { AppRouteHandlerFn } from "next/dist/server/route-modules/app-route/module";
import { NextResponse } from "next/server";

export const GET: AppRouteHandlerFn = async (
  request,
  { params: awaitableParams },
) => {
  const params = await awaitableParams;
  const providerValidation = ZEProvider.safeParse(params?.["provider"]);

  logger.auth.info(providerValidation);

  if (!providerValidation.success)
    return NextResponse.redirect(
      new URL("/login?error=provider_not_valid", request.url),
    );

  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("access_token");

  logger.auth.info(searchParams.entries());

  if (!token)
    return NextResponse.redirect(new URL("/login?error=no_token", request.url));

  const { success, data, error } = await loginWithProviderAction({
    provider: providerValidation.data,
    access_token: token,
  });

  logger.auth.info(success, data, error);

  if (!success)
    return NextResponse.redirect(
      new URL(
        `/login?error=${error.name}&message=${getAxiosErrorMessage(error as AxiosError)}`,
        request.url,
      ),
    );
};
