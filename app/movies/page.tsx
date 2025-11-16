"use client";
import ActorSearchInput from "@/components/movies/ActorSearchInput";
import DirectorSearchInput from "@/components/movies/DirectorSearchInput";
import GenreMultiSelect from "@/components/movies/GenreMultiSelect";
import IsPopularToggle from "@/components/movies/IsPopularToggle";
import LanguageSelect from "@/components/movies/LanguageSelect";
import MovieComponent from "@/components/movies/MovieComponent";
import MovieSearchInput from "@/components/movies/MovieSearchInput";
import RatingSelect from "@/components/movies/RatingSelect";
import YearSelect from "@/components/movies/YearSelect";
import { Option } from "@/components/ui/multiselect";
import { movies } from "@/data/movies";
import { useState } from "react";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [actorSearch, setActorSearch] = useState<string>("");
  const [directorSearch, setDirectorSearch] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<Option[]>([]);
  const [releaseYear, setReleaseYear] = useState<string>("all");
  const [rating, setRating] = useState<string>("all");
  const [language, setLanguage] = useState<string>("all");
  const [isPopular, setIsPopular] = useState<boolean>(false);

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

  const filterBySelectedGenres = searchDirector.filter((movie) => {
    if (selectedGenres.length === 0) return true;
    return selectedGenres.some((selection) =>
      movie.genre.includes(selection.label)
    );
  });

  const allLanguages = movies.map((item) => item.language);
  const uniqueLanguages = [...new Set(allLanguages)].sort((a, b) =>
    a.localeCompare(b)
  );

  const filterByYear = filterBySelectedGenres.filter((item) => {
    if (releaseYear === "all") {
      return true;
    } else if (releaseYear === "2020") {
      return item.releaseYear >= 2020;
    } else if (releaseYear === "2010") {
      return item.releaseYear >= 2010 && item.releaseYear < 2020;
    } else if (releaseYear === "2000") {
      return item.releaseYear >= 2000 && item.releaseYear < 2010;
    } else if (releaseYear === "1990") {
      return item.releaseYear >= 1990 && item.releaseYear < 2000;
    } else if (releaseYear === "1980") {
      return item.releaseYear >= 1980 && item.releaseYear < 1990;
    } else if (releaseYear === "1970") {
      return item.releaseYear < 1980;
    } else {
      return true;
    }
  });

  const filterByRating = filterByYear.filter((item) => {
    if (rating === "9") {
      return item.rating >= 9;
    } else if (rating === "8") {
      return item.rating >= 8;
    } else if (rating === "7") {
      return item.rating >= 7;
    } else {
      return true;
    }
  });

  const filterByLanguage = filterByRating.filter(
    (item) => item.language === language || language === "all"
  );

  const filterByIsPopular = filterByLanguage.filter((item) => {
    if (isPopular === false) {
      return true;
    } else {
      return item.isPopular === true;
    }
  });

  return (
    <section className="flex flex-col h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold text-center">List of movies</h1>
      {filterByIsPopular.length !== movies.length ? (
        <h3 className="text-center">
          Showing {filterByIsPopular.length} movies out of {movies.length}
        </h3>
      ) : (
        <h3 className="text-center">Showing all {movies.length} movies</h3>
      )}
      <div className="flex flex-col mt-10">
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
          <GenreMultiSelect
            sortedUniqueGenres={sortedUniqueGenres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <YearSelect
            releaseYear={releaseYear}
            setReleaseYear={setReleaseYear}
          />
          <RatingSelect rating={rating} setRating={setRating} />
        </div>
        <div className="flex flex-col items-end mt-5 gap-2">
          <LanguageSelect
            uniqueLanguages={uniqueLanguages}
            language={language}
            setLanguage={setLanguage}
          />
          <IsPopularToggle isPopular={isPopular} setIsPopular={setIsPopular} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 py-20 ">
        {filterByIsPopular.map((movie, index) => (
          <MovieComponent key={index} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Movies;
