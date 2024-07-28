import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="flex flex-row justify-center p-3">
      <div className="flex gap-[2rem]">
        <Link
          href={"/"}
          className="bg-[rgba(0,0,0,0.8)] text-white px-4 py-1 rounded-md text-sm"
        >
          Home
        </Link>
        <Link
          href={"/create"}
          className="bg-[rgba(0,0,0,0.8)] text-white px-4 py-1 rounded-md text-sm"
        >
          Create
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
