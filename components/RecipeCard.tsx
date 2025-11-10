import { Recipe } from "@/data/recipes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "./ui/card";
import { TimerIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const recipeIngredients = recipe.ingredients.join(", ");
  return (
    <div className="max-w-[600px] w-full">
      <Link href={`/recipes/${recipe.slug}`}>
        <Card className="hover:bg-gray-200 dark:hover:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-2xl">{recipe.name}</CardTitle>
            <CardDescription className="text-base">
              {recipe.description}
            </CardDescription>
            <CardAction>
              <div className="flex flex-col gap-5">
                <div className="flex text-xs items-center justify-end gap-1 text-gray-500">
                  <TimerIcon className="h-4 w-4" />
                  {recipe.time}min
                </div>
                <div>
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    width={120}
                    height={120}
                    className="h-[120px] w-full rounded-xl"
                  />
                </div>
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Ingredients:</p>
            <p className="italic font-light">{recipeIngredients}.</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default RecipeCard;
