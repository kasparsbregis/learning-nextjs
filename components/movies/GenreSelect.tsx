import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface GenreSelectProps {
  genreSelect: string;
  setGenreSelect: (value: string) => void;
  sortedUniqueGenres: string[];
}

const GenreSelect = ({
  genreSelect,
  setGenreSelect,
  sortedUniqueGenres,
}: GenreSelectProps) => {
  return (
    <div className="flex flex-col w-full xl:w-[33%] gap-1">
      <h3>Select Genre:</h3>
      <Select value={genreSelect} onValueChange={setGenreSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Genre" />
        </SelectTrigger>
        <SelectContent className="h-80">
          <SelectGroup>
            <SelectItem value="all">All Genres</SelectItem>
            {sortedUniqueGenres.map((genre, index) => (
              <SelectItem value={genre} key={index}>
                {genre}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GenreSelect;
