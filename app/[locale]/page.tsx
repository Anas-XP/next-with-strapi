import { ThemeToggle } from "@/components/theme-toggle";
import { Spinner } from "@/components/ui/spinner";
import { LandingPageButtons } from "@/features/landing-page/components/landing-page-buttons";
import { getSafeLocale } from "@/lib/i18n.utils";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await getSafeLocale(params);

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between px-16 py-32 sm:items-start">
        <Image
          className="invert-0 dark:invert-100"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl leading-10 font-semibold tracking-tight">
            Next.JS with Strapi
          </h1>
          <p className="max-w-md text-lg leading-8">
            A robust dashboard template.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Suspense fallback={<Spinner />}>
            <LandingPageButtons />
          </Suspense>
        </div>
        <ThemeToggle />
      </main>
    </div>
  );
}
