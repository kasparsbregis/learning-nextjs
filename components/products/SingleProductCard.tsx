import Image from "next/image";
import { Button } from "../ui/button";
import { Product } from "@/data/products";
import { ShoppingCart } from "lucide-react";
import { renderStars } from "@/lib/helpers";

const SingleProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="dark:border-white/30 border-black/30 border rounded-lg bg-gray-700/20">
      <div className="flex flex-col relative">
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
        <div className="rounded-b-lg py-4 px-4 flex flex-col justify-between min-h-72">
          {/* Product Name + Description */}
          <div className="flex flex-col flex-1">
            <h1 className="font-bold text-center text-xl">{product.name}</h1>
            <p className="pt-2 text-md">{product.description}</p>
          </div>
          <div className="flex flex-col">
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
                      {(
                        (product.price / 100) *
                        (100 - product.discount)
                      ).toFixed(2)}
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
            {/* Buy Button */}
            {product.inStock && (
              <div className="mt-5">
                <Button className="w-full cursor-pointer">
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
