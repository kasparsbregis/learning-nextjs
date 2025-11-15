import Image from "next/image";
import { Button } from "../ui/button";
import { Product } from "@/data/products";
import { ShoppingCart, Tags } from "lucide-react";
import { renderStars } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Category color mapping - easier to maintain and extend
export const categoryColors: Record<string, string> = {
  Electronics: "bg-cyan-600",
  Fashion: "bg-teal-500",
  Sports: "bg-green-600",
  "Home & Kitchen": "bg-purple-800",
  Books: "bg-yellow-900",
};

const SingleProductCard = ({ product }: { product: Product }) => {
  // Get category color, default to gray if category not found
  const categoryColor = categoryColors[product.category] || "bg-gray-600";

  return (
    <div
      className={cn(
        "dark:border-white/30 border-black/30 border rounded-lg bg-gray-700/20 h-full flex flex-col",
        product.inStock ? "opacity-100" : "opacity-40"
      )}
    >
      <div className="flex flex-col relative flex-1">
        {product.discount && (
          <div className="absolute top-2 left-2 z-10 bg-green-500 px-4 py-1 rounded-lg font-bold text-xl">
            -{product.discount}% Off
          </div>
        )}
        {!product.inStock && (
          <div className="absolute top-2 right-2 z-10 bg-red-500 px-4 py-1 rounded-lg font-bold text-base">
            Out Of Stock
          </div>
        )}

        <div className="w-full max-h-60 overflow-hidden rounded-t-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-60 max-h-60 object-cover"
          />
        </div>
        <div className="text-center font-bold text-xl">
          <h1 className={cn("p-2", categoryColor)}>{product.category}</h1>
        </div>

        <div className="rounded-b-lg py-4 px-4 flex flex-col justify-between h-80">
          {/* Product Name + Description */}
          <div className="flex flex-col flex-1 min-h-0">
            <h1 className="font-bold text-center text-xl mb-2">
              {product.name}
            </h1>
            <p className="text-md overflow-hidden text-ellipsis line-clamp-3">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col justify-end">
            {/* Price + Rating */}
            <div className="flex justify-between pt-5 items-end">
              <div>
                {!product.discount ? (
                  <div className="text-4xl sm:text-3xl md:text-4xl font-bold">
                    ${product.price.toFixed(2)}
                  </div>
                ) : (
                  <div>
                    <div className="text-red-500 line-through text-xl font-semibold">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="text-4xl sm:text-3xl md:text-4xl font-bold text-green-500">
                      $
                      {(product.price * (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col md:hidden xl:flex xl:flex-col">
                <div className="flex">{renderStars(product.rating)}</div>
                <div className="text-sm text-right">
                  <span className="text-xl font-bold">{product.rating}</span> (
                  {product.reviews})
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <div className="flex items-center gap-1 text-sm justify-end">
                <Tags className="h-4 w-4" />
                {product.tags.join(", ").toUpperCase()}
              </div>
              {/* Buy Button */}
              {product.inStock && (
                <Link href={`/products/${product.id}`}>
                  <Button className="w-full cursor-pointer">
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
