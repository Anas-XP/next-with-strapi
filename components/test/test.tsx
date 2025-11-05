"use client";
import { useRecipeGetRecipes } from "@/strapi-endpoints/hooks/recipe/recipe";

export const TestComponent = () => {
  const { data } = useRecipeGetRecipes({
    fields: ["cook_time"],
    populate: ["categories"],
    sort: {
      cook_time: "desc",
    },
  });

  const recipes = data?.data.data || [];
  return <div>{JSON.stringify(recipes)}</div>;
};
