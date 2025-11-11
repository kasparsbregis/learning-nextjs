"use client";
import CategoryFilter from "@/components/products/CategoryFilter";
import InStockRadio from "@/components/products/InStockRadio";
import PriceCheckbox from "@/components/products/PriceCheckbox";
import SearchInput from "@/components/products/SearchInput";
import SingleProductCard from "@/components/products/SingleProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const allCategories = products.flatMap((product) => product.category);
const uniqueCategories = [...new Set(allCategories)];
const ascendingCategories = [...uniqueCategories].sort((a, b) =>
  a.localeCompare(b)
);

const ProductsPage = () => {
  // console.log(uniqueCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [stockFilter, setStockFilter] = useState<string>("all");
  const allPriceRanges = [
    "Under $50",
    "$50 - $100",
    "$100 - $200",
    "$200 - $500",
    "Over 500$",
  ];
  const [searchParams, setSearchParams] = useState<string>("");

  // Helper function to check if a price fits within a range string
  const isPriceInRange = (price: number, rangeString: string): boolean => {
    if (rangeString === "Under $50") {
      return price < 50;
    }
    if (rangeString === "$50 - $100") {
      return price >= 50 && price < 100;
    }
    if (rangeString === "$100 - $200") {
      return price >= 100 && price < 200;
    }
    if (rangeString === "$200 - $500") {
      return price >= 200 && price < 500;
    }
    if (rangeString === "Over 500$") {
      return price >= 500;
    }
    return false;
  };

  const filterByCategory = products.filter(
    (product) =>
      product.category === selectedCategory || selectedCategory === "all"
  );

  const filterByPrice = filterByCategory.filter((product) => {
    if (priceRange.length === 0) return true;
    return priceRange.some((range) => isPriceInRange(product.price, range));
  });

  const filterByStock = filterByPrice.filter((product) => {
    if (stockFilter === "all") return true;
    if (stockFilter === "inStock" && product.inStock === true) return true;
    if (stockFilter === "outOfStock" && product.inStock === false) return true;
    return false;
  });

  const filterBySearch = filterByStock.filter((item) => {
    return item.name.toLowerCase().includes(searchParams.toLowerCase());
  });
  const deleteSearch = () => setSearchParams("");
  // const allPrices = filterByCategory.flatMap((p) => p.price);
  // const sortAllPrices = [...allPrices].sort((a, b) => b - a);
  // const highestPrice = sortAllPrices[0] || 0;
  return (
    <section className="flex flex-col h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold text-center">All products</h1>

      <div className="items-end flex flex-col px-4 pt-5">
        <CategoryFilter
          ascendingCategories={ascendingCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="pt-4">
          Showing {filterBySearch.length} products of {products.length}
        </div>
      </div>
      <div className="flex flex-col py-4">
        <div className="flex mx-4 p-4 rounded-lg border border-white/30 gap-10">
          <PriceCheckbox
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            allPriceRanges={allPriceRanges}
          />
          <InStockRadio
            stockFilter={stockFilter}
            setStockFilter={setStockFilter}
          />
        </div>
      </div>
      <div className="flex flex-col items-end px-4">
        <div className="flex gap-2">
          <SearchInput
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Button
            variant={"destructive"}
            disabled={searchParams === ""}
            onClick={deleteSearch}
            className={searchParams !== "" ? "cursor-pointer" : ""}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 px-4">
        {filterBySearch.map((product) => (
          <SingleProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
