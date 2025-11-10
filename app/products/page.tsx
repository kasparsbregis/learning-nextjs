import SingleProductCard from "@/components/products/SingleProductCard";
import { products } from "@/data/products";

const ProductsPage = () => {
  return (
    <section className="flex flex-col h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold text-center">All products</h1>
      <div className=" py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 px-4">
        {products.map((product) => (
          <SingleProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
