import { Skeleton } from "../ui/skeleton";

export const Field_Skeleton = () => {
  return (
    <div className="space-y-2 p-3">
      <Skeleton className="size-3/4 h-3" />
      <Skeleton className="size-full h-9" />
    </div>
  );
};
