import { DashboardCard } from "@/features/dashboard/components/dashboard-card/dashboard-card";
import { DashboardCard_Skeleton } from "@/features/dashboard/components/dashboard-card/dashboard-card.skeleton";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <Suspense fallback={<DashboardCard_Skeleton />}>
      <DashboardCard />
    </Suspense>
  );
};

export default DashboardPage;
