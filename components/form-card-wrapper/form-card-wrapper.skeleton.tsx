import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { ReactNode } from "react";
import { Button } from "../ui/button";

type TFormCardWrapperSkeletonProps = {
  children: ReactNode;
};

export const FormCardWrapper_Skeleton = ({
  children,
}: TFormCardWrapperSkeletonProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-44" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-3 w-32" />
        </CardDescription>
        <CardAction>
          <Button size={"icon"} disabled>
            <Skeleton className="size-full" />
          </Button>
        </CardAction>
      </CardHeader>
      <Separator />
      {children}
    </Card>
  );
};
