import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="grid grid-cols-1 p-3 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-3/4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-5 w-1/2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <Skeleton className="h-96" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default loading;
