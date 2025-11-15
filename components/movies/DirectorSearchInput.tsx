import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface DirectorSearchProps {
  directorSearch: string;
  setDirectorSearch: (value: string) => void;
}

const DirectorSearchInput = ({
  directorSearch,
  setDirectorSearch,
}: DirectorSearchProps) => {
  return (
    <div className="flex flex-col w-full xl:w-[33%] gap-1">
      <h3>Search By Director</h3>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Find Director"
          value={directorSearch}
          onChange={(e) => setDirectorSearch(e.target.value)}
        />
        <Button
          variant={"destructive"}
          className="cursor-pointer"
          onClick={() => setDirectorSearch("")}
          disabled={directorSearch === "" ? true : false}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default DirectorSearchInput;
