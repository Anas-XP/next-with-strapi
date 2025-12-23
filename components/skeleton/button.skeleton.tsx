import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const Button_Skeleton = () => {
  return (
    <Button disabled size={"icon"}>
      <Skeleton className="h-full w-32" />
    </Button>
  );
};
