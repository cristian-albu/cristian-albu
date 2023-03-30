import { TechUsed } from "@/data/skill";
import Image from "next/image";
import React from "react";

const TechItem = ({ techItem }: { techItem: TechUsed }) => {
  return (
    <div className="w-[25%] md:w-[16.6%] px-1 md:px-3 flex flex-col justify-start items-start gap-3 mb-10 transition">
      <Image
        src={techItem.icon}
        width={50}
        height={50}
        alt=""
        className="w-[33%] aspect-square object-contain"
      />
      <p>{techItem.title}</p>
      <p className="text-gray-400 ">{techItem.category}</p>
      <p className="text-gray-400 text-xs">
        {techItem.experience < 1
          ? "Less than 1 year of experience"
          : `${techItem.experience} + years of experience`}
      </p>
    </div>
  );
};

export default TechItem;
