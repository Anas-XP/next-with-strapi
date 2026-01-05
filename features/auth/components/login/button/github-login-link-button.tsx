import { LinkExternalEnhanced } from "@/components/enhanced/link-external.enhanced";
import { buttonVariants } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";

export const GithubLoginLinkButton = () => {
  return (
    <LinkExternalEnhanced
      href="/api/auth-proxy/connect/github"
      className={buttonVariants({ variant: "link" })}
    >
      <SiGithub /> Continue with Github
    </LinkExternalEnhanced>
  );
};
