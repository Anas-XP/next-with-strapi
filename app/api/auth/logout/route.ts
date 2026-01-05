import { logoutFromCookies } from "@/features/auth/actions/auth-cookies.actions";
import { AFTER_LOGOUT_REDIRECT_URL } from "@/features/auth/utils";
import { revalidatePath } from "next/cache";
import { AppRouteHandlerFn } from "next/dist/server/route-modules/app-route/module";
import { NextResponse } from "next/server";

export const GET: AppRouteHandlerFn = async () => {
  await logoutFromCookies();

  revalidatePath("/", "layout");

  return NextResponse.redirect(AFTER_LOGOUT_REDIRECT_URL);
};
