import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const MovieSearchInput = ({ searchTerm, setSearchTerm }: SearchInputProps) => {
  return (
    <div className="flex flex-col w-full xl:w-[33%] gap-1">
      <h3>Search By Movie Name</h3>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Find Movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant={"destructive"}
          className="cursor-pointer"
          disabled={searchTerm === "" ? true : false}
          onClick={() => setSearchTerm("")}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default MovieSearchInput;
