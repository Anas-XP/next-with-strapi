import React from "react";
import { LinkEnhanced } from "./enhanced/link.enhanced";
import { LogInIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";

export const LogInLinkButton = ({
  variant,
}: {
  variant?: NonNullable<Parameters<typeof buttonVariants>["0"]>["variant"];
}) => {
  return (
    <LinkEnhanced href={"/login"} className={buttonVariants({ variant })}>
      <LogInIcon />
      Login
    </LinkEnhanced>
  );
};
