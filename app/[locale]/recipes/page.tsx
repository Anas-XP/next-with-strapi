import { RecipesListError } from "@/features/recipe/components/error/recipes-list-error";
import { RecipesList } from "@/features/recipe/components/recipes-list";
import { RecipesListSkeleton } from "@/features/recipe/components/skeleton/recipes-list-skeleton";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

const Page = async () => {
  return (
    <ErrorBoundary errorComponent={RecipesListError}>
      <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-2 xl:grid-cols-3">
        <Suspense fallback={<RecipesListSkeleton />}>
          <RecipesList />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default Page;
