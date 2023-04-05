import React, { useState } from "react";
import { navData, NavDataType } from "@/data/navData";
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";
import { useRouter } from "next/router";

const navStyle = `flex items-center  gap-2 py-2 px-3 hover:bg-white hover:text-black transition border-y-4 border-y-transparent min-h-[3rem] relative z-[51]`;
const home = navData[0];

const Nav = () => {
  const router = useRouter();
  const [menuStateOpen, setMenuOpen] = useState(false);

  const currentPage = (currentLink: string) => {
    if (router.asPath === currentLink) {
      return "border-b-white";
    } else {
      return "border-b-transparent";
    }
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full z-[99] flex justify-between items-center gap-10 bg-black text-white ">
        <Link
          href={home.link}
          className={`${navStyle} mr-auto ${currentPage(home.link)}`}
          onClick={() => setMenuOpen(false)}
        >
          {home.icon} {home.title}
        </Link>
        <div
          className={`flex absolute right-0 top-[3rem] w-[50%] md:w-auto z-[51] ${
            menuStateOpen ? "scale-[1]" : "scale-0"
          } md:scale-[1] bg-black  flex-col md:flex-row md:static md:bg-transparent`}
        >
          {navData.map(
            (item: NavDataType, index: number) =>
              index > 0 && (
                <Link
                  key={item.title}
                  href={item.link}
                  className={`${navStyle} ${currentPage(item.link)}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon} {item.title}
                </Link>
              )
          )}
        </div>

        <button
          className={`${navStyle} md:hidden aspect-square justify-center`}
          onClick={() => setMenuOpen((curr) => !curr)}
        >
          <HiMenuAlt1 />
        </button>
      </div>

      <button
        className={`fixed top-0 left-0  h-[100vh] z-[50] backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuStateOpen ? "opacity-[1] w-full" : "opacity-0 w-0"
        }`}
        onClick={() => setMenuOpen(false)}
      ></button>
    </div>
  );
};

export default Nav;
