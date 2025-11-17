import { SingleRecipeCardSkeleton } from "./single-recipe-card-skeleton";

export const RecipesListSkeleton = () => {
  return Array(5)
    .fill("item")
    .map((_, index) => (
      <SingleRecipeCardSkeleton key={`${index}-recipe-skeleton-card`} />
    ));
};
