import { ImagesCarousel } from "@/components/images-carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RecipeGetRecipes200DataItem } from "@/strapi-endpoints/api-token-client/learningStrapiV5.schemas";

export const SingleRecipeCard = ({
  recipe,
}: {
  recipe: RecipeGetRecipes200DataItem;
}) => {
  return (
    <Card>
      <CardContent className="h-96">
        <ImagesCarousel
          images={[recipe.main_image]}
          CarouselContentClassName="h-96"
        />
      </CardContent>
      <Separator />
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
