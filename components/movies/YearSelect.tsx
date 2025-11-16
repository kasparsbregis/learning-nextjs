import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ReleaseYearSelectProps {
  releaseYear: string;
  setReleaseYear: (value: string) => void;
}

const YearSelect = ({
  releaseYear,
  setReleaseYear,
}: ReleaseYearSelectProps) => {
  return (
    <div className="flex flex-col w-full xl:w-[33%] gap-1">
      <h3>Search By Year</h3>
      <Select value={releaseYear} onValueChange={setReleaseYear}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Search by year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All movies</SelectItem>
            <SelectItem value="2020">2020+</SelectItem>
            <SelectItem value="2010">2010-2019</SelectItem>
            <SelectItem value="2000">2000-2009</SelectItem>
            <SelectItem value="1990">1990-1999</SelectItem>
            <SelectItem value="1980">1980-1989</SelectItem>
            <SelectItem value="1970">1970-1979</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearSelect;
