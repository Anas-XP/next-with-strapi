"use client";
import { useQuery } from "@tanstack/react-query";
import { recipeKeys } from "../keys/recipe.keys";
import { getRecipeAction } from "../actions/recipe.actions";
import { RecipeGetRecipesParams } from "@/strapi-endpoints/api-token-client/learningStrapiV5.schemas";
import { RecipeGetRecipesParams as RecipeAuthGetRecipesParams } from "@/strapi-endpoints/authenticated-client/learningStrapiV5.schemas";
import { useLocale } from "next-intl";

export const useGetRecipe = (
  params: Omit<RecipeGetRecipesParams, "locale">
) => {
  const locale = useLocale();

  return useQuery({
    queryKey: recipeKeys.byLocale(locale),
    queryFn: () => getRecipeAction({ ...params, locale }),
  });
};

export const useAuthGetRecipe = (
  params: Omit<RecipeAuthGetRecipesParams, "locale">
) => {
  const locale = useLocale();
  return useQuery({
    queryKey: recipeKeys.byLocale(locale),
    queryFn: () => getRecipeAction({ ...params, locale }),
  });
};
