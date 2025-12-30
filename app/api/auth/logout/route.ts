import { logoutFromCookies } from "@/features/auth/actions/auth-cookies.actions";
import { AFTER_LOGOUT_REDIRECT_URL } from "@/features/auth/utils";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  const locale = await getLocale();

  await logoutFromCookies();

  revalidatePath("/", "layout");

  redirect({ href: AFTER_LOGOUT_REDIRECT_URL, locale });
}
