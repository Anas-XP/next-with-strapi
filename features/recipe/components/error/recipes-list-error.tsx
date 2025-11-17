"use client";
import { ErrorComponent } from "next/dist/client/components/error-boundary";
import { RecipesAlertDialog } from "./recipes-alert-dialog";
import { RecipesListSkeletonError } from "./recipes-list-skeleton-error";

export const RecipesListError: ErrorComponent = ({ error, reset }) => {
  return (
    <div className="relative flex min-h-dvh w-dvw items-center justify-center overflow-hidden p-3">
      <div className="grid size-full grid-cols-1 gap-3 overflow-hidden p-3 opacity-15 md:grid-cols-2 xl:grid-cols-3">
        <RecipesListSkeletonError />
      </div>

      <RecipesAlertDialog error={error} reset={reset} />
    </div>
  );
};
