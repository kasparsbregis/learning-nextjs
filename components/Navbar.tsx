import Link from "next/link";
import { ModeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <div className="w-full items-center flex flex-col border-b border-gray-600/10 fixed offset-0 top-0 bg-transparent backdrop-blur-md px-10 ">
      <div className="flex h-14 justify-between max-w-[1200px] w-full items-center">
        <Link
          href={"/"}
          className="hover:scale-102 transition-all duration-300"
        >
          Learning Project
        </Link>
        <div className="hover:cursor-pointer">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
