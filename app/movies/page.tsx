"use client";
import ActorSearchInput from "@/components/movies/ActorSearchInput";
import DirectorSearchInput from "@/components/movies/DirectorSearchInput";
import GenreSelect from "@/components/movies/GenreSelect";
import MovieComponent from "@/components/movies/MovieComponent";
import MovieSearchInput from "@/components/movies/MovieSearchInput";
import { movies } from "@/data/movies";
import { useState } from "react";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [actorSearch, setActorSearch] = useState<string>("");
  const [directorSearch, setDirectorSearch] = useState<string>("");
  const [genreSelect, setGenreSelect] = useState<string>("all");

  const searchMovie = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchActor = searchMovie.filter((movie) =>
    movie.cast.some((actor) =>
      actor.toLowerCase().includes(actorSearch.toLowerCase())
    )
  );

  const searchDirector = searchActor.filter((item) =>
    item.director.toLowerCase().includes(directorSearch.toLowerCase())
  );

  const allGenres = movies.flatMap((item) => item.genre);
  const uniqueGenres = [...new Set(allGenres)];
  const sortedUniqueGenres = uniqueGenres.sort((a, b) => a.localeCompare(b));


  const filterByGenre = searchDirector.filter((item) =>
    item.genre.some((genre) => genre === genreSelect || genreSelect === "all")
  );

  return (
    <section className="flex flex-col h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold text-center">List of movies</h1>
      {filterByGenre.length !== movies.length ? (
        <h3 className="text-center">
          Showing {filterByGenre.length} movies out of {movies.length}
        </h3>
      ) : (
        <h3 className="text-center">Showing all {movies.length} movies</h3>
      )}
      <div className="flex flex-col mt-5">
        <h3 className="font-bold mb-2">Filters:</h3>
        {/* Search by movie name or search by actors */}
        <div className="flex flex-col xl:flex-row xl:justify-between w-full items-center gap-4 xl:gap-8">
          <MovieSearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <ActorSearchInput
            actorSearch={actorSearch}
            setActorSearch={setActorSearch}
          />
          <DirectorSearchInput
            directorSearch={directorSearch}
            setDirectorSearch={setDirectorSearch}
          />
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between w-full items-center gap-4 xl:gap-8 mt-5">
          <GenreSelect
            genreSelect={genreSelect}
            setGenreSelect={setGenreSelect}
            sortedUniqueGenres={sortedUniqueGenres}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 py-20">
        {filterByGenre.map((movie, index) => (
          <MovieComponent key={index} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Movies;
