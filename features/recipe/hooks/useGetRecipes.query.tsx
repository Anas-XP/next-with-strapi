"use client";
import { useQuery } from "@tanstack/react-query";
import { recipeKeys } from "../keys/recipe.keys";
import {
  authGetRecipesAction,
  getRecipesAction,
} from "../actions/recipe.actions";
import { RecipeGetRecipesParams } from "@/strapi-endpoints/api-token-client/learningStrapiV5.schemas";
import { RecipeGetRecipesParams as RecipeAuthGetRecipesParams } from "@/strapi-endpoints/authenticated-client/learningStrapiV5.schemas";
import { useLocale } from "next-intl";

export const useGetRecipes = (
  params?: Omit<RecipeGetRecipesParams, "locale">
) => {
  const locale = useLocale();

  return useQuery({
    queryKey: recipeKeys.byLocale(locale),
    queryFn: () => getRecipesAction({ ...params, locale }),
  });
};

export const useAuthGetRecipes = (
  params?: Omit<RecipeAuthGetRecipesParams, "locale">
) => {
  const locale = useLocale();
  return useQuery({
    queryKey: recipeKeys.byLocale(locale),
    queryFn: () => authGetRecipesAction({ ...params, locale }),
  });
};
