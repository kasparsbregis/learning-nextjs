import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ActorSearchProps {
  actorSearch: string;
  setActorSearch: (value: string) => void;
}

const ActorSearchInput = ({
  actorSearch,
  setActorSearch,
}: ActorSearchProps) => {
  return (
    <div className="flex flex-col w-full xl:w-[33%] gap-1">
      <h3>Search By Cast Members</h3>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Find Actor"
          className="relative"
          value={actorSearch}
          onChange={(e) => setActorSearch(e.target.value)}
        />
        <Button
          variant={"destructive"}
          className="cursor-pointer"
          disabled={actorSearch === "" ? true : false}
          onClick={() => setActorSearch("")}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default ActorSearchInput;
