import React from "react";

export interface Section {
  children: React.ReactElement | React.ReactElement[];
  bg?: string;
}

const Section = ({ children, bg }: Section) => {
  return (
    <div
      className={`flex flex-col w-full py-10 px-5 justify-center relative items-center ${bg}`}
    >
      {children}
    </div>
  );
};

export default Section;
