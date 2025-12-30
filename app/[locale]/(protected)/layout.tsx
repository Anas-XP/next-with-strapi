import { ProtectedLayoutComponent } from "@/components/layout/protected-layout";
import { DashboardCard_Skeleton } from "@/features/dashboard/components/dashboard-card/dashboard-card.skeleton";
import { ReactNode, Suspense } from "react";

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<DashboardCard_Skeleton />}>
      <ProtectedLayoutComponent>{children}</ProtectedLayoutComponent>
    </Suspense>
  );
};

export default ProtectedLayout;
