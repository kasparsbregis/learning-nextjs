import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SortFilterProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const SortFilter = ({ sortBy, setSortBy }: SortFilterProps) => {
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
          <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
          <SelectItem value="ratingHighToLow">Rating: High to Low</SelectItem>
          <SelectItem value="mostReviewed">Most Reviewed</SelectItem>
          <SelectItem value="nameAZ">Name: A-Z</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortFilter;
