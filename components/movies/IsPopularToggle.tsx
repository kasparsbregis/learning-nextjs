import { Switch } from "../ui/switch";

interface IsPopularToggleProps {
  isPopular: boolean;
  setIsPopular: (value: boolean) => void;
}

const IsPopularToggle = ({ isPopular, setIsPopular }: IsPopularToggleProps) => {
  return (
    <div className="flex flex-col items-end">
      {isPopular === true ? (
        <p className="hover:cursor-pointer">
          Disable <span className="text-yellow-300">⭐Popularity</span> filter
        </p>
      ) : (
        <p className="hover:cursor-pointer">
          Show only <span className="text-yellow-300">⭐Popular</span>
        </p>
      )}
      <Switch onChange={setIsPopular}></Switch>
    </div>
  );
};

export default IsPopularToggle;
