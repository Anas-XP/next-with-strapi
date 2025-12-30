export function isNextRedirect(error: Error): boolean {
  const digest = (error as { digest?: string })?.digest as string | undefined;

  if (digest?.includes("NEXT_REDIRECT")) return true;

  if (error?.message === "NEXT_REDIRECT") return true;

  if (
    error?.message?.includes("NEXT_REDIRECT") ||
    error?.stack?.includes("NEXT_REDIRECT")
  ) {
    return true;
  }

  return false;
}
