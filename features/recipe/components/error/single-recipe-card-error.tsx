"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangleIcon, RotateCwIcon } from "lucide-react";
import { ErrorComponent } from "next/dist/client/components/error-boundary";

export const SingleRecipeCardError: ErrorComponent = ({ error, reset }) => {
  return (
    <Card className="border-destructive">
      <CardContent className="flex h-96 items-center justify-center">
        <div className="bg-destructive/10 flex size-1/2 items-center justify-center rounded-2xl">
          <AlertTriangleIcon size={30} />
        </div>
      </CardContent>
      <Separator className="bg-destructive" />
      <CardHeader>
        <CardTitle className="text-destructive">{error.name}</CardTitle>
        <CardDescription className="text-destructive">
          {error.message}
        </CardDescription>
        {reset && (
          <CardAction>
            <Button variant={"outline"} onClick={reset}>
              <RotateCwIcon /> Re-try
            </Button>
          </CardAction>
        )}
      </CardHeader>
    </Card>
  );
};
