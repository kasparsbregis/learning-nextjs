import ProductPageComponent from "@/components/products/ProductPageComponent";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import Link from "next/link";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const productId = Number(id);

  const product = products.find((s) => s.id === productId);

  return (
    <section className="flex flex-col h-[calc(100vh-3.5rem)] pt-20">
      {!product ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-5">
          <h1 className="text-3xl font-bold">Product not found</h1>
          <Link href={"/products"}>
            <Button variant={"outline"}>Back To All Products</Button>
          </Link>
        </div>
      ) : (
        <ProductPageComponent product={product} />
      )}
    </section>
  );
};

export default ProductPage;
