import { LinkEnhanced } from "@/components/enhanced/link.enhanced";
import { LogInLinkButton } from "@/components/login-link-button";
import { RegisterLinkButton } from "@/components/register-link-button";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUserAction } from "@/features/auth/actions/protected.actions";
import { LayoutDashboardIcon } from "lucide-react";

export const LandingPageButtons = async () => {
  const { success: isLoggedIn } = await getCurrentUserAction();

  if (isLoggedIn)
    return (
      <LinkEnhanced href={"/dashboard"} className={buttonVariants()}>
        <LayoutDashboardIcon />
        Dashboard
      </LinkEnhanced>
    );

  return (
    <>
      <LogInLinkButton />
      <RegisterLinkButton />
    </>
  );
};
