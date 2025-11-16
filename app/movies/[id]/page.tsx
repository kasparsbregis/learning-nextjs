import { Button } from "@/components/ui/button";
import { movies } from "@/data/movies";
import {
  ArrowLeft,
  AwardIcon,
  ChartNoAxesCombined,
  ExternalLink,
  Languages,
  Timer,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SingleMoviePage = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;
  const idNumber = Number(id);
  const movie = movies.find((movie) => movie.id === idNumber);

  if (!movie) {
    return (
      <section className="flex flex-col h-screen w-screen items-center justify-center pt-20 gap-4">
        <h1 className="text-3xl font-bold text-center">Movie not found</h1>
        <div className="flex flex-col items-center gap-2">
          <Link href={`/movies`}>
            <Button
              variant={"outline"}
              className="group cursor-pointer transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 translate-x-1 transition-transform duration-300 group-hover:translate-x-0" />
              Back To Movies
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  return (
    <section className="flex flex-col w-full px-0! mt-14 pb-14 border-x border-black/20 dark:border-white/20 bg-gray-100 dark:bg-gray-900/50 mb-10 rounded-b-xl border-b">
      <Link
        href={`/movies`}
        className="flex items-center gap-2 px-8 py-4 group"
      >
        <ArrowLeft className="h-4 w-4 translate-x-1 transition-transform duration-300 group-hover:translate-x-0" />
        Back To Movies
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-4 px-10 gap-x-4 pt-10 items-stretch">
        <div className="w-full h-full relative overflow-hidden min-h-[400px] rounded-xl border border-foreground/30">
          {movie.isPopular && (
            <p className="absolute z-10 right-2 top-2 bg-yellow-600/50 px-2 py-1 rounded-full text-[10px] border border-yellow-300/50 text-yellow-300">
              ⭐Popular
            </p>
          )}

          <Image
            src={movie.poster}
            alt={movie.title}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 md:col-span-3  rounded-xl px-4 py-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold mb-10">
              {movie.title}, {movie.releaseYear}
            </h1>
            <div className="flex justify-between gap-6">
              <div className="flex flex-col max-w-[50%] gap-2 justify-between">
                <div className="flex items-center gap-2 mb-2">
                  {movie.awards?.map((balva, index) => (
                    <div
                      key={index}
                      className="dark:bg-yellow-600/30 bg-yellow-400/70 px-2 py-1 rounded-full text-[10px] border dark:border-yellow-300/70 border-yellow-700/70 dark:text-yellow-300 text-yellow-700 flex items-center"
                    >
                      <AwardIcon className="dark:text-yellow-300 text-yellow-700 h-3 w-3" />
                      {balva}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {movie.genre.map((genre, index) => (
                    <p
                      key={index}
                      className="bg-foreground/20 border border-foreground/50 px-4 py-1 rounded-full"
                    >
                      {genre}
                    </p>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <ChartNoAxesCombined className="h-4 w-4" />
                  <p>{movie.rating} out of 10</p>
                </div>
                <div>
                  <p>{movie.description}</p>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4" />
                    <h3 className="font-bold">Language:</h3>
                  </div>
                  <p>{movie.language}</p>
                </div>
                <div>
                  <Link href={movie.poster} target="_blank">
                    <Button
                      className="w-full flex items-center cursor-pointer"
                      variant={"outline"}
                    >
                      <ExternalLink />
                      IMDB Link
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col max-w-[50%] gap-8">
                <div className="border-t border-foreground/10 pt-2">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <h3 className="font-bold">Director:</h3>
                  </div>
                  <p>{movie.director}</p>
                </div>
                <div className="border-t border-foreground/10 pt-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <h3 className="font-bold">Cast:</h3>
                  </div>
                  <p>{movie.cast.join(", ")}</p>
                </div>
                <div className="border-t border-foreground/10 pt-2">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    <h3 className="font-bold">Length:</h3>
                  </div>
                  <p>
                    {hours === 1 ? hours + " hour" : hours + " hours"} and{" "}
                    {minutes} minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleMoviePage;
