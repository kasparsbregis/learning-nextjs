import { Movie } from "@/data/movies";
import {
  AwardIcon,
  ChartLine,
  Clapperboard,
  Globe,
  Timer,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const MovieComponent = ({ movie }: { movie: Movie }) => {
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  return (
    <div className="flex flex-col min-h-96 border rounded-xl">
      <div className="relative h-[300px] w-full overflow-hidden rounded-t-xl">
        <div className="absolute top-2 right-2 z-10 flex gap-0.5">
          {movie.genre.map((zhanrs, index) => (
            <p
              key={index}
              className="bg-gray-900/80 px-2 py-1 rounded-full text-[10px] border border-gray-300/50 text-gray-400"
            >
              {zhanrs}
            </p>
          ))}
        </div>
        <div className="absolute bottom-2 left-2 z-10 flex gap-0.5 items-center">
          {movie.awards && (
            <p>
              <AwardIcon className="text-yellow-300 h-4 w-4" />
            </p>
          )}

          {movie.awards?.map((balva, index) => (
            <p
              key={index}
              className="bg-yellow-600/30 px-2 py-1 rounded-full text-[10px] border border-yellow-300/70 text-yellow-300"
            >
              {balva}
            </p>
          ))}
        </div>
        {movie.isPopular && (
          <p className="absolute top-2 left-2 z-10 bg-yellow-600/50 px-2 py-1 rounded-full text-[10px] border border-yellow-300/50 text-yellow-300">
            ⭐ Popular
          </p>
        )}
        <Link href={`/movies/${movie.id}`}>
          <Image
            src={movie.poster}
            alt={movie.title}
            width={400}
            height={600}
            className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
          />
        </Link>
      </div>
      <div className="flex flex-col mt-2 justify-between gap-2 grow pb-4">
        <div className="flex flex-col gap-2 px-2 ">
          <h1 className="text-xl font-bold text-center">
            {movie.title}, {movie.releaseYear}
          </h1>
          <div className="flex items-center gap-2">
            <ChartLine className="h-4 w-4" />
            Rating:{" "}
            <span className="font-bold">{movie.rating.toFixed(1)}/10</span>
          </div>
          <div className="flex items-center gap-2">
            <Clapperboard className="h-4 w-4" />
            Director: <span className="font-bold">{movie.director}</span>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-6 w-6" />
            Cast: <span className="font-bold">{movie.cast.join(", ")}</span>
          </div>
          <div className="indent-7 line-clamp-3">{movie.description}</div>
        </div>
        <div className="flex flex-col gap-2 px-2 ">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            {hours === 1 ? hours + " hour" : hours + " hours"} and {minutes}{" "}
            minutes
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {movie.language}
          </div>
          <div>
            <Link href={`/movies/${movie.id}`}>
              <Button className="w-full cursor-pointer" variant={"outline"}>
                Movie Page
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
