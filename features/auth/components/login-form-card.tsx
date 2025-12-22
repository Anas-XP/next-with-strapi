import { Card } from "@/components/ui/card";
import { LoginForm } from "./login-form";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export function LoginFormCard() {
  return (
    <Card className="w-full max-w-sm">
      <Suspense
        fallback={
          <div className="flex justify-center p-10">
            <Spinner />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </Card>
  );
}
