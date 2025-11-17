import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const SingleRecipeCardSkeletonError = () => {
  return (
    <Card className="border-destructive">
      <CardContent className="flex h-96 items-center justify-center">
        <div className="bg-destructive size-full" />
      </CardContent>
      <Separator className="bg-destructive" />
      <CardHeader>
        <CardTitle>
          <div className="bg-destructive h-7 w-3/4" />
        </CardTitle>
        <CardDescription>
          <div className="bg-destructive h-5 w-1/3" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
