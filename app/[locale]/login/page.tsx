import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { LoginFormCard } from "@/features/auth/components/login-form-card";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "default",
            size: "icon-lg",
            className: "mx-auto",
          })}
        >
          <Logo />
        </Link>

        <LoginFormCard />
      </div>
    </div>
  );
};

export default LoginPage;
