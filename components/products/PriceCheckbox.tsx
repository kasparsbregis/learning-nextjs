import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface PriceRangeProps {
  priceRange: string[];
  setPriceRange: (value: string[]) => void;
  allPriceRanges: string[];
}

const PriceCheckbox = ({
  priceRange,
  setPriceRange,
  allPriceRanges,
}: PriceRangeProps) => {
  return (
    <div className="flex flex-col gap-2 w-[50%] border px-2 rounded-md py-2 ">
      <h3 className="font-bold text-center">Select Price Range:</h3>
      <div className="flex justify-between">
        {allPriceRanges.map((item) => (
          <Label
            className="hover:bg-accent/50 flex items-center rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950 cursor-pointer"
            key={item}
          >
            <Checkbox
              id={item}
              className="hidden"
              checked={priceRange.includes(item)}
              onCheckedChange={(checked) => {
                if (checked) {
                  // add the item to the price range
                  setPriceRange([...priceRange, item]);
                } else {
                  // remove the item from the price range
                  setPriceRange(priceRange.filter((p) => p !== item));
                }
              }}
            />
            <p className="text-sm leading-none font-medium">{item}</p>
          </Label>
        ))}
      </div>
    </div>
  );
};

export default PriceCheckbox;
