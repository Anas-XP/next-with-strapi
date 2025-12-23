import { LinkEnhanced } from "@/components/enhanced/link.enhanced";
import { buttonVariants } from "@/components/ui/button";
import { RegisterForm } from "@/features/auth/components/register/form/register-form";
import { RegisterForm_Skeleton } from "@/features/auth/components/register/form/register-form.skeleton";
import { getSafeLocale } from "@/lib/i18n.utils";
import { HomeIcon } from "lucide-react";
import { Suspense } from "react";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await getSafeLocale(params);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LinkEnhanced href={"/"} className={buttonVariants()}>
          <HomeIcon /> Home
        </LinkEnhanced>

        <Suspense fallback={<RegisterForm_Skeleton />}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
