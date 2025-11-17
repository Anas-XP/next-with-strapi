"use server";

import { getRecipe as apiTokenGetRecipe } from "@/strapi-endpoints/api-token-client/recipe/recipe";
import { getRecipe as authGetRecipe } from "@/strapi-endpoints/authenticated-client/recipe/recipe";

// api token client
const recipeApi = apiTokenGetRecipe();
// authenticated client
const authRecipeAPI = authGetRecipe();

export const getRecipesAction = recipeApi.recipeGetRecipes;
export const authGetRecipesAction = authRecipeAPI.recipeGetRecipes;
