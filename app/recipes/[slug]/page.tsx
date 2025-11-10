import { Button } from "@/components/ui/button";
import { recipes } from "@/data/recipes";
import { ArrowLeft, CookingPot, Slice } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RecipePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const recipe = recipes.find((recipe) => recipe.slug === slug);

  if (!recipe) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl">Recipe Not Found</h1>
        <Link href={"/recipes"}>
          <Button>Go Back to Recipes</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="flex flex-col h-[calc(100vh-3.5rem)] pt-20">
      <Link href={"/recipes"} className="flex gap-2 items-center">
        <ArrowLeft className="h-4 w-4" />
        <p>Back to Recipes</p>
      </Link>
      <h1 className="text-3xl font-bold text-center">
        🎉 Let&apos;s make{" "}
        <span className="text-orange-500">{recipe.name}</span> 🎉
      </h1>
      <div className="mt-10 flex flex-col items-center">
        <Image
          src={recipe.imageUrl}
          alt={recipe.name}
          width={500}
          height={500}
          className="rounded-xl border-2 border-gray-500"
        />
      </div>
      <div className="flex gap-5 justify-center mt-10">
        <div className="px-4 max-w-[300px] w-full flex flex-col items-end">
          <h2 className="text-xl font-bold mb-4">
            <div className="flex items-center gap-2">
              <CookingPot className="h-4 w-4" /> Ingredients
            </div>
          </h2>
          {recipe.ingredients.map((ingredient) => (
            <div key={ingredient}>
              <p className="font-bold">{ingredient}</p>
            </div>
          ))}
        </div>
        <div className="px-4 max-w-[500px] w-full">
          <h2 className="text-xl font-bold mb-4">
            <div className="flex items-center gap-2">
              <Slice className="h-4 w-4" />
              Preparation:
            </div>
          </h2>

          {recipe.steps.map((step, index) => (
            <div key={index}>
              <p>
                {index + 1}.<span className="pl-2">{step}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipePage;
