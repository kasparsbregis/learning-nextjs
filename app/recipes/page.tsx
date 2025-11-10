"use client";
import RecipeCard from "@/components/RecipeCard";
import { TimeDropDown } from "@/components/TimeDropDown";
import { Button } from "@/components/ui/button";
import { recipes } from "@/data/recipes";
import { ClockIcon, Delete } from "lucide-react";
import { useState } from "react";

const RecipesPage = () => {
  const [selectedTime, setSelectedTime] = useState(300);
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.time <= selectedTime
  );

  return (
    <section className="flex flex-col items-center h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold">All recipes</h1>
      <div className="mt-10 items-center flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <h2>How much time do you have?</h2>
        </div>
        <div className="flex items-center gap-2">
          <TimeDropDown
            selectedTime={selectedTime}
            setSelectedTime={(value: string) => setSelectedTime(Number(value))}
          />
          {selectedTime !== 300 && (
            <Button
              className="cursor-pointer bg-red-500/30 border border-gray-500 text-black dark:text-white hover:bg-red-500/40"
              onClick={() => setSelectedTime(300)}
            >
              <Delete />
              Remove Filters
            </Button>
          )}
        </div>
      </div>
      <div className="py-10 flex flex-col items-center gap-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {filteredRecipes.length === 0 && (
          <div>
            <h1>
              Recipes that takes less than {selectedTime} minutes are not found
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipesPage;
