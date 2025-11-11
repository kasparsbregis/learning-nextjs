import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface StockFilterProps {
  stockFilter: string;
  setStockFilter: (value: string) => void;
}

const InStockRadio = ({ stockFilter, setStockFilter }: StockFilterProps) => {
  console.log(stockFilter);
  return (
    <div className="flex flex-col gap-2 w-[50%] border px-2 rounded-md py-2  justify-between items-center">
      <h3 className="font-bold text-center">Sort By Availability:</h3>
      <RadioGroup
        defaultValue={stockFilter}
        onValueChange={setStockFilter}
        className="flex gap-3"
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="all" id="r1" className="sr-only peer" />
          <Label
            htmlFor="r1"
            className="hover:bg-accent/50 flex items-center rounded-lg border p-3 cursor-pointer dark:peer-data-[state=checked]:bg-blue-950 dark:peer-data-[state=checked]:border-blue-900 dark:peer-data-[state=checked]:hover:bg-blue-950 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:hover:bg-blue-50"
          >
            All
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="inStock" id="r2" className="sr-only peer" />
          <Label
            htmlFor="r2"
            className="hover:bg-accent/50 flex items-center rounded-lg border p-3 cursor-pointer dark:peer-data-[state=checked]:bg-blue-950 dark:peer-data-[state=checked]:border-blue-900 dark:peer-data-[state=checked]:hover:bg-blue-950 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:hover:bg-blue-50"
          >
            In Stock
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="outOfStock" id="r3" className="sr-only peer" />
          <Label
            htmlFor="r3"
            className="hover:bg-accent/50 flex items-center rounded-lg border p-3 cursor-pointer dark:peer-data-[state=checked]:bg-blue-950 dark:peer-data-[state=checked]:border-blue-900 dark:peer-data-[state=checked]:hover:bg-blue-950 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:hover:bg-blue-50"
          >
            Out Of Stock
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default InStockRadio;
