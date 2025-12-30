import { Button_Skeleton } from "@/components/skeleton/button.skeleton";
import { Card, CardFooter } from "@/components/ui/card";

export const DashboardCard_Skeleton = () => {
  return (
    <Card className="container mx-auto mt-3">
      <CardFooter>
        <Button_Skeleton />
      </CardFooter>
    </Card>
  );
};
