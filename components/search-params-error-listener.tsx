"use client";

import { showToastFromError } from "@/hooks/show-error-toast";
import { CaughtError } from "@/lib/error-handling/caught-error.utils";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useRouterEnhanced } from "./enhanced/use-router.enhanced";

function SearchParamsErrorListenerCore() {
  const searchParams = useSearchParams();
  const router = useRouterEnhanced();
  const pathname = usePathname();

  useEffect(() => {
    const errorName = searchParams.get("error[name]");
    const errorMessage = searchParams.get("error[message]");
    const errorStatus = searchParams.get("error[status]");

    if (!errorName) return;

    const caughtError = new CaughtError(
      errorMessage || "Unknown Error",
      Number(errorStatus),
      null,
      errorName,
    );

    showToastFromError(caughtError);

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete("error[name]");
    newParams.delete("error[message]");
    newParams.delete("error[status]");

    const queryString = newParams.toString();
    const newPath = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newPath, { scroll: false });
  }, [searchParams, router, pathname]);

  return null;
}

export function SearchParamsErrorListener() {
  return (
    <Suspense>
      <SearchParamsErrorListenerCore />
    </Suspense>
  );
}
