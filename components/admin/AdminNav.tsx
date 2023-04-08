import Link from "next/link";
import React from "react";
import { navStyle } from "../Nav";

const AdminNav = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-[99] flex justify-between items-center gap-10 bg-black text-white ">
      <Link href="/admin" className={navStyle + " mr-auto"}>
        Admin
      </Link>
      <Link href="/admin/case-studies" className={navStyle}>
        Case studies
      </Link>
      <Link href="/admin/skills" className={navStyle}>
        Skills
      </Link>
      <Link href="/admin/experience" className={navStyle}>
        Experience
      </Link>
    </div>
  );
};

export default AdminNav;
