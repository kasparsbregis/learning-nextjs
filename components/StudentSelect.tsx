import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SkolniekiSelectProps {
  skolnieki: string;
  setSkolnieki: (value: string) => void;
}

const StudentSelect = ({ skolnieki, setSkolnieki }: SkolniekiSelectProps) => {
  return (
    <Select value={skolnieki} onValueChange={setSkolnieki}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select students" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Students</SelectLabel>
          <SelectItem value="all">All Students</SelectItem>
          <SelectItem value="a">A Students (Rating &gt;90)</SelectItem>
          <SelectItem value="b">B Students (Rating 80-90)</SelectItem>
          <SelectItem value="c">C Students (Rating 70-80)</SelectItem>
          <SelectItem value="d">D/F Students (Rating &lt;70)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StudentSelect;
