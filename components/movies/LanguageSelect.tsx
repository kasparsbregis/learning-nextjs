import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface LanguageSelectProps {
  uniqueLanguages: string[];
  language: string;
  setLanguage: (value: string) => void;
}

const LanguageSelect = ({
  uniqueLanguages,
  language,
  setLanguage,
}: LanguageSelectProps) => {
  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All languages</SelectItem>
          {uniqueLanguages.map((language, index) => (
            <SelectItem value={language} key={index}>
              {language}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
