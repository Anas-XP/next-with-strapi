import { UserPlus } from "lucide-react";
import { LinkEnhanced } from "./enhanced/link.enhanced";
import { buttonVariants } from "./ui/button";
import { REGISTER_URL } from "@/features/auth/utils";

export const RegisterLinkButton = ({
  variant,
}: {
  variant?: NonNullable<Parameters<typeof buttonVariants>["0"]>["variant"];
}) => {
  return (
    <LinkEnhanced href={REGISTER_URL} className={buttonVariants({ variant })}>
      <UserPlus />
      Register
    </LinkEnhanced>
  );
};
