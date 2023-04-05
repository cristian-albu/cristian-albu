import { TechUsed } from "@/data/skill";
import Image from "next/image";
import React from "react";

const TechItem = ({ techItem }: { techItem: TechUsed }) => {
  return (
    <div className="w-[33.33%] md:w-[16.6%] px-3 flex flex-col justify-start items-start gap-3 mb-10 transition">
      <Image
        src={techItem.icon}
        width={50}
        height={50}
        alt=""
        className="w-[33%] aspect-square object-contain"
      />
      <p className="font-bold border-b-[1px] border-b-gray-300 border-dashed pb-2 w-full">
        {techItem.title}
      </p>
      <p className="text-gray-500 text-sm">🔧 {techItem.category}</p>
      <p className="text-gray-500 text-sm border-b-[1px] border-b-gray-300 border-dashed pb-2">
        {techItem.experience < 1
          ? "⌛ Less than 1 year of experience"
          : `⌛ ${techItem.experience} + years of experience`}
      </p>
    </div>
  );
};

export default TechItem;
