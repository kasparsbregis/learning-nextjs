import BookCard from "@/components/BookCard";
import { books } from "@/data/books";

const BooksPage = () => {
  return (
    <section className="flex flex-col items-center h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold">Famous Books Explorer</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
        {books.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BooksPage;
