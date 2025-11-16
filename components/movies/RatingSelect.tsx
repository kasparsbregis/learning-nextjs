import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface RatingSelectProps {
  rating: string;
  setRating: (value: string) => void;
}

const RatingSelect = ({ rating, setRating }: RatingSelectProps) => {
  return (
    <div className="flex flex-col w-full xl:w-[33%] gap-1">
      <h3>Search By Rating</h3>
      <Select value={rating} onValueChange={setRating}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="9">9+</SelectItem>
            <SelectItem value="8">8+</SelectItem>
            <SelectItem value="7">7+</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RatingSelect;
