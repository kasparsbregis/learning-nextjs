import { books } from "@/data/books";

const SingleBookPage = async ({ params }: { params: { slug: string } }) => {
  // Step 2: Extract the slug from params
  const { slug } = await params;

  // Step 3: Find the book that matches the slug
  const book = books.find((book) => book.slug === slug);

  // Step 4: Handle case where book is not found
  if (!book) {
    return (
      <section className="flex flex-col items-center h-[calc(100vh-3.5rem)] pt-20">
        <h1 className="text-3xl">Book Not Found</h1>
        <p className="mt-10">The book you are looking for does not exist.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <div className="mt-10 space-y-4 text-center">
        <p className="text-xl">Author: {book.author}</p>
        <p className="text-lg max-w-2xl">{book.description}</p>
      </div>
    </section>
  );
};

export default SingleBookPage;
