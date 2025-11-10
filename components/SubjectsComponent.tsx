import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { students } from "@/data/students";

interface SelectedSubjectProps {
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
}

const SubjectsComponent = ({
  selectedSubject,
  setSelectedSubject,
}: SelectedSubjectProps) => {
  const allSubjects = students.flatMap((student) => {
    return student.subjects;
  });
  //   console.log(allSubjects);

  const uniqueSubjects = [...new Set(allSubjects)];
  console.log(selectedSubject);

  const alphabeticalSubjects = uniqueSubjects.sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
      <SelectTrigger className="w-60 cursor-pointer">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All Subjects</SelectItem>
          {alphabeticalSubjects.map((subject) => (
            <SelectItem
              value={subject}
              key={subject}
              className="cursor-pointer"
            >
              {subject}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubjectsComponent;
