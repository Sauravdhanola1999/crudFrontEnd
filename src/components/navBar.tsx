import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav className="container flex items-center justify-between mx-auto h-14">
        <Link href="/">
          <span className="font-bold text-xl">Home</span>
        </Link>
        <div className="flex gap-4">
          <Link href="/performance">
            <span className="font-bold text-xl">Performance</span>
          </Link>
          <Link href="/allusers">
            <span className="font-bold text-xl">All Users</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
