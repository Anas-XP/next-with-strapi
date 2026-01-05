import React from "react";
import { LinkEnhanced } from "../../../../../components/enhanced/link.enhanced";
import { LogInIcon } from "lucide-react";
import { buttonVariants } from "../../../../../components/ui/button";
import { LOGIN_URL } from "@/features/auth/utils";

export const LogInLinkButton = ({
  variant,
}: {
  variant?: NonNullable<Parameters<typeof buttonVariants>["0"]>["variant"];
}) => {
  return (
    <LinkEnhanced href={LOGIN_URL} className={buttonVariants({ variant })}>
      <LogInIcon />
      Login
    </LinkEnhanced>
  );
};
