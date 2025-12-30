"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { useLogout } from "@/features/auth/hooks/use-logout.hook";
import { LogOutIcon } from "lucide-react";

export const DashboardCard = () => {
  const { mutate: logout, isPending } = useLogout();
  return (
    <Card className="container mx-auto mt-3">
      <CardFooter>
        <Button
          variant={"destructive"}
          onClick={() => {
            logout();
          }}
          disabled={isPending}
        >
          <LogOutIcon /> Logout
        </Button>
      </CardFooter>
    </Card>
  );
};
