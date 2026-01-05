import { LinkExternalEnhanced } from "@/components/enhanced/link-external.enhanced";
import { buttonVariants } from "@/components/ui/button";
import { SiMicroeditor } from "@icons-pack/react-simple-icons";

export const MicrosoftLoginLinkButton = () => {
  return (
    <LinkExternalEnhanced
      href="/api/auth-proxy/connect/microsoft"
      className={buttonVariants({ variant: "link" })}
    >
      <SiMicroeditor /> Continue with Microsoft
    </LinkExternalEnhanced>
  );
};
