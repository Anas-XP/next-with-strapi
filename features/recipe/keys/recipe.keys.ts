export const recipeKeys = {
  all: ["recipe"] as const,
  byLocale: (locale: string) => [...recipeKeys.all, locale] as const,
};
