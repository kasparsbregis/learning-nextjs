import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { categoryColors } from "./SingleProductCard";
import { cn } from "@/lib/utils";

const ProductPageComponent = ({ product }: { product: Product }) => {
  const categoryColor = categoryColors[product.category] || "bg-gray-600";
  return (
    <div>
      <Link
        href={"/products"}
        className="flex items-center gap-2 w-fit text-gray-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Back To All Products
      </Link>
      <div className="flex gap-10 mt-10">
        <div>
          <Image
            src={product.image}
            alt="Product name"
            width={600}
            height={600}
            className="w-full h-96 max-h-96 object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-5">{product.name}</h1>
          <div className={cn("w-fit px-3 py-1 rounded-xl mb-2", categoryColor)}>
            {product.category}
          </div>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPageComponent;
