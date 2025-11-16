import Link from "next/link";
import { ModeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <div className="w-full items-center flex flex-col border-b border-black/20 dark:border-white/20 fixed offset-0 top-0 bg-transparent backdrop-blur-2xl z-50 ">
      <div className="flex h-14 justify-between max-w-[1200px] w-full items-center px-8">
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
