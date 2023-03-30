import Section from "@/components/Section";
import TechItem from "@/components/TechItem";
import Wrapper from "@/components/Wrapper";
import { TechUsed, techUsedArr } from "@/data/skill";
import { NextPage } from "next";
import React, { useState } from "react";

const tabCategories = [
  "🚀 Current stack",
  "☀️ Frontend & Design technologies",
  "🌙 Backend & CMS technologies",
  "💯 All technologies",
];

const currStack = techUsedArr.filter(
  (item: TechUsed) => item.currentStack === true
);

const frontendStack = techUsedArr.filter(
  (item: TechUsed) =>
    item.category === "Frontend & Backend" ||
    item.category === "Frontend" ||
    item.category === "Design"
);

const backendStack = techUsedArr.filter(
  (item: TechUsed) =>
    item.category === "Frontend & Backend" ||
    item.category === "Backend" ||
    item.category === "CMS" ||
    item.category === "Deployment"
);

const showTechItemList = (tabState: string) => {
  switch (tabState) {
    case "🚀 Current stack":
      return currStack.map((item: TechUsed) => (
        <TechItem techItem={item} key={item.title} />
      ));

    case "☀️ Frontend & Design technologies":
      return frontendStack.map((item: TechUsed) => (
        <TechItem techItem={item} key={item.title} />
      ));

    case "🌙 Backend & CMS technologies":
      return backendStack.map((item: TechUsed) => (
        <TechItem techItem={item} key={item.title} />
      ));

    default:
      return techUsedArr.map((item: TechUsed) => (
        <TechItem techItem={item} key={item.title} />
      ));
  }
};

const About: NextPage = () => {
  const [tabState, setTabState] = useState(tabCategories[0]);

  return (
    <>
      <Section>
        <Wrapper>
          <div className="w-full flex-col gap-3 my-10">
            <h2 className="text-2xl md:text-5xl">Technologies I use</h2>
            <p>
              I only included the technologies that I've used for at least 1
              client project
            </p>
          </div>
          <div className="flex w-full justify-start md:justify-between flex-wrap gap-2 mb-[5rem]">
            {tabCategories.map((item: string) => (
              <button
                key={item}
                onClick={() => setTabState(item)}
                className={item === tabState ? "btnPrimary" : `btnSecondary`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap  w-full items-start justify-start  ">
            {showTechItemList(tabState)}
          </div>
        </Wrapper>
      </Section>
    </>
  );
};

export default About;
