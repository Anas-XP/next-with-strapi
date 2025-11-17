import { SingleRecipeCardSkeletonError } from "./single-recipe-card-skeleton-error";

export const RecipesListSkeletonError = () => {
  return Array(5)
    .fill("item")
    .map((_, index) => (
      <SingleRecipeCardSkeletonError key={`${index}-recipe-skeleton-card`} />
    ));
};
