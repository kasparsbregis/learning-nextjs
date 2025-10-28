"use client";
import { Button } from "@/components/ui/button";
import { quotes } from "@/data/fitness-quotes";
import { useState, useEffect } from "react";

const FitnessQuotePage = () => {
  const [number, setNumber] = useState(1);
  const [mounted, setMounted] = useState(false);

  function randomNumberGenerator() {
    return Math.floor(Math.random() * 5) + 1;
  }

  useEffect(() => {
    // This is intentionally setting state in useEffect to prevent hydration mismatch
    /* eslint-disable */
    const randomNum = randomNumberGenerator();
    setNumber(randomNum);
    setMounted(true);
    /* eslint-enable */
  }, []);

  const quoteOfTheDay = quotes.find((quote) => quote.id === number);

  if (!mounted) {
    return (
      <section className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)]">
        <h1 className="text-gray-500">Fitness Quote Of The Day:</h1>
        <h1 className="text-xl text-center text-gray-200">Loading...</h1>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)]">
      <h1 className="text-gray-500">Fitness Quote Of The Day:</h1>
      <h1 className="text-5xl md:text-7xl text-center text-gray-200 max-w-xl">
        &quot; {quoteOfTheDay?.text || "No quote found"} &quot;
      </h1>
      <Button
        variant={"outline"}
        className="mt-10 cursor-pointer"
        onClick={() => setNumber(randomNumberGenerator())}
      >
        Randomize Quote
      </Button>
    </section>
  );
};

export default FitnessQuotePage;
