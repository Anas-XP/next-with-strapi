import { LinkExternalEnhanced } from "@/components/enhanced/link-external.enhanced";
import { buttonVariants } from "@/components/ui/button";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export const GoogleLoginLinkButton = () => {
  return (
    <LinkExternalEnhanced
      href="/api/auth-proxy/connect/google"
      className={buttonVariants({ variant: "link" })}
    >
      <SiGoogle /> Continue with Google
    </LinkExternalEnhanced>
  );
};
