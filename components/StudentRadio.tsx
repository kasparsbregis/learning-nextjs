import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ActivityRadioProps {
  activity: string;
  setActivity: (value: string) => void;
}

const StudentRadio = ({ activity, setActivity }: ActivityRadioProps) => {
  return (
    <RadioGroup value={activity} onValueChange={setActivity}>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="showAll" id="r1" />
        <Label htmlFor="r1">Show all</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="active" id="r2" />
        <Label htmlFor="r2">Active</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="inactive" id="r3" />
        <Label htmlFor="r3">Inactive</Label>
      </div>
    </RadioGroup>
  );
};

export default StudentRadio;
