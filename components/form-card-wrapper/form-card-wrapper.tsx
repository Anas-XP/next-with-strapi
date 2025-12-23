"use client s";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { RefreshCwIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TFormCardWrapperProps = {
  title: string;
  description: string;
  formReset: () => void;
  children: ReactNode;
  isActionPending?: boolean;
  className?: string;
};

export const FormCardWrapper = ({
  title,
  description,
  children,
  formReset,
  isActionPending = false,
  className,
}: TFormCardWrapperProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Button
            disabled={isActionPending}
            type="button"
            variant="outline"
            onClick={() => {
              formReset();
            }}
          >
            <RefreshCwIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <Separator />
      {children}
    </Card>
  );
};
