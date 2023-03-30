import { XpData, xpData } from "@/data/xpData";
import Section from "@/components/Section";
import Wrapper from "@/components/Wrapper";
import React from "react";
import { TechUsed, techUsedArr, techUsedObj } from "@/data/skill";
import Image from "next/image";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ExperienceTimeline = () => {
  return (
    <>
      <Section>
        <Wrapper>
          <div className="flex w-full justify-between flex-wrap">
            {xpData.map(
              (item: XpData) =>
                item.type === "work" && (
                  <div
                    key={item.title + item.at}
                    className="w-full flex flex-col"
                  >
                    <p>{item.title}</p>
                    <a
                      href={item.link}
                      className=""
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {item.at}
                    </a>
                    <p>
                      {months[item.startingDate.getMonth()]}{" "}
                      {item.startingDate.getFullYear()}
                      {" - "}
                      {months[item.endingDate.getMonth()]}{" "}
                      {item.endingDate.getFullYear()}
                    </p>
                  </div>
                )
            )}
          </div>
        </Wrapper>
      </Section>
    </>
  );
};

export default ExperienceTimeline;
