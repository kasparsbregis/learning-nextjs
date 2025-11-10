import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SortProps {
  sort: string;
  setSort: (value: string) => void;
}

const Sorting = ({ sort, setSort }: SortProps) => {
  return (
    <Select value={sort} onValueChange={setSort}>
      <SelectTrigger className="w-60 cursor-pointer">
        <SelectValue placeholder="Sort By:" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Alphabetically</SelectLabel>
          <SelectItem value="alphabeticallyAZ" className="cursor-pointer">
            <ArrowDownAZ />
            Ascending Alphabetically
          </SelectItem>
          <SelectItem value="alphabeticallyZA" className="cursor-pointer">
            <ArrowDownZA />
            Descending Alphabetically
          </SelectItem>
          <SelectLabel>By Grade</SelectLabel>
          <SelectItem value="byGrade01" className="cursor-pointer">
            <ArrowDown10 />
            Descending By Grade
          </SelectItem>
          <SelectItem value="byGrade10" className="cursor-pointer">
            <ArrowDown01 />
            Ascending By Grade
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Sorting;
