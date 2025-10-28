import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

// Define the type for props
interface BookCardProps {
  book: {
    slug: string;
    title: string;
    author: string;
    description: string;
  };
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="">
      <Card className="w-full max-w-sm min-w-[250px]">
        <CardHeader>
          <CardTitle className="text-center">{book.title}</CardTitle>
          <CardDescription className="text-center">
            {book.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p>{book.author}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/books/${book.slug}`} className="w-full">
            <Button className="w-full cursor-pointer">Learn More</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookCard;
