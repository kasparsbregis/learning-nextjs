import { Label } from "../ui/label";
import MultipleSelector, { Option } from "../ui/multiselect";

interface GenreMultiSelectProps {
  sortedUniqueGenres: string[];
  selectedGenres: Option[];
  setSelectedGenres: (genres: Option[]) => void;
}

const GenreMultiSelect = ({
  sortedUniqueGenres,
  selectedGenres,
  setSelectedGenres,
}: GenreMultiSelectProps) => {
  // Transform string array into Option[] format
  const genreOptions: Option[] = sortedUniqueGenres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  return (
    <div className="flex flex-col w-full xl:w-[33%] gap-1 z-20">
      <Label>Search By Genre</Label>
      <MultipleSelector
        commandProps={{
          label: "Select Genres",
        }}
        defaultOptions={genreOptions}
        value={selectedGenres}
        onChange={setSelectedGenres}
        placeholder="Select Genres"
        emptyIndicator={
          <p className="text-center text-sm">No other genres left</p>
        }
      />
    </div>
  );
};

export default GenreMultiSelect;
