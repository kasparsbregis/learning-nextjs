import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CategoryFilterProps {
  ascendingCategories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const CategoryFilter = ({
  ascendingCategories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) => {
  // Sort categories alphabetically (create copy to avoid mutating original)

  return (
    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all" className="cursor-pointer">
            All Categories
          </SelectItem>
          {ascendingCategories.map((category) => (
            <SelectItem
              value={category}
              key={category}
              className="cursor-pointer"
            >
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
