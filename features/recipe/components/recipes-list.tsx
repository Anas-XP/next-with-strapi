import { getLocale } from "next-intl/server";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { connection } from "next/server";
import React from "react";
import { getRecipesAction } from "../actions/recipe.actions";
import { SingleRecipeCardError } from "./error/single-recipe-card-error";
import { SingleRecipeCard } from "./single-recipe-card";

export const RecipesList = async () => {
  await connection();

  const locale = await getLocale();
  const response = await getRecipesAction({
    populate: ['categories'],
    locale,
    fields: ['title'],
    filters: {
      'title' : {
        $eq: 'Recipe'
      },
      
    },
    pagination: {
      page: 1,
      pageSize: 10,
    }
  });

  const recipes = response.data.data;

  return recipes.map((recipe) => (
    <React.Fragment key={`${recipe.documentId}-card`}>
      <ErrorBoundary errorComponent={SingleRecipeCardError}>
        <SingleRecipeCard recipe={recipe} />
      </ErrorBoundary>
    </React.Fragment>
  ));
};
