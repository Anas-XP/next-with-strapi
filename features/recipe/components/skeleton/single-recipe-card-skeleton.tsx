import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const SingleRecipeCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="h-96">
        <Skeleton className="size-full" />
      </CardContent>
      <Separator />
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-7 w-3/4" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-5 w-1/3" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
