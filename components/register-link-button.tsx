import { UserPlus } from "lucide-react";
import { LinkEnhanced } from "./enhanced/link.enhanced";
import { buttonVariants } from "./ui/button";

export const RegisterLinkButton = ({
  variant,
}: {
  variant?: NonNullable<Parameters<typeof buttonVariants>["0"]>["variant"];
}) => {
  return (
    <LinkEnhanced href={"/register"} className={buttonVariants({ variant })}>
      <UserPlus />
      Register
    </LinkEnhanced>
  );
};
