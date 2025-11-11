import { Input } from "../ui/input";

interface SearchInputProps {
  searchParams: string;
  setSearchParams: (value: string) => void;
}

const SearchInput = ({ searchParams, setSearchParams }: SearchInputProps) => {
  return (
    <Input
      type="text"
      className="w-72 placeholder:text-center"
      placeholder="Search By Name"
      value={searchParams}
      onChange={(e) => setSearchParams(e.target.value)}
    />
  );
};

export default SearchInput;
