import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeDropDownProps {
  selectedTime: number;
  setSelectedTime: (value: string) => void;
}

export function TimeDropDown({
  selectedTime,
  setSelectedTime,
}: TimeDropDownProps) {
  return (
    <Select value={selectedTime.toString()} onValueChange={setSelectedTime}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select a time frame" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="10">Less than 10min</SelectItem>
          <SelectItem value="20">Less than 20min</SelectItem>
          <SelectItem value="30">Less than 30min</SelectItem>
          <SelectItem value="45">Less than 45min</SelectItem>
          <SelectItem value="300">All the time in the world</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
