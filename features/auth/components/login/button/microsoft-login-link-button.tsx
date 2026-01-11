import { LinkExternalEnhanced } from "@/components/enhanced/link-external.enhanced";
import { MicrosoftSVG } from "@/components/svg/microsoft.svg";
import { buttonVariants } from "@/components/ui/button";

export const MicrosoftLoginLinkButton = () => {
  return (
    <LinkExternalEnhanced
      href="/api/auth-proxy/connect/microsoft"
      className={buttonVariants({ variant: "link" })}
    >
      <MicrosoftSVG /> Continue with Microsoft
    </LinkExternalEnhanced>
  );
};
