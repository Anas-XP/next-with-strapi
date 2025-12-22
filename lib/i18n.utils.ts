import { setRequestLocale } from "next-intl/server";

export async function getSafeLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale;
}
