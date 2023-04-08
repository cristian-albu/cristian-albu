import AddExperience from "@/components/admin/AddExperience";
import Section from "@/components/Section";
import Wrapper from "@/components/Wrapper";
import db from "@/lib/prisma";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getServerSession } from "next-auth";
import React, { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { ExperienceFull } from "@/lib/instanceOfCaseStudy";
import { CaseStudy, Experience, Skill } from "@prisma/client";
import { MdPlusOne } from "react-icons/md";

export const emptyExperienceState: ExperienceFull = {
  id: "",
  position: "",
  atCompany: "",
  companyLink: "",
  companyLogo: "",
  startDate: new Date(),
  endDate: new Date(),
  summary: ``,
  skills: [],
  caseStudies: [],
};

const Experience: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ experienceList, skillsList, caseStudyList }) => {
  const [uiState, setUiState] = useState<"add" | "edit" | "">("");

  console.log(experienceList);
  return (
    <Section bg="bg-gray-100 min-h-screen">
      <Wrapper>
        <div className="w-full flex justify-between mb-5">
          <p className="text-4xl mr-auto">Experience</p>
          {uiState !== "add" && (
            <button onClick={() => setUiState("add")} className="btnPrimary">
              <MdPlusOne />
              Add Experience item
            </button>
          )}
        </div>

        <div className="w-full">
          {uiState === "add" && (
            <AddExperience
              skillsList={skillsList}
              caseStudyList={caseStudyList}
              emptyExperienceState={emptyExperienceState}
            />
          )}

          {uiState === "" && (
            <div className="w-full flex flex-col justify-start items-start gap-3">
              {experienceList.map((item: Experience) => (
                <div key={item.id}>{item.position}</div>
              ))}
            </div>
          )}
        </div>
      </Wrapper>
    </Section>
  );
};

export default Experience;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const experienceRes = await db.experience.findMany({
    include: {
      skills: true,
      caseStudies: true,
    },
  });

  const experienceList: ExperienceFull[] = JSON.parse(
    JSON.stringify(
      experienceRes.map(
        (item: Experience & { skills: Skill[]; caseStudies: CaseStudy[] }) => ({
          id: item.id,
          position: item.position,
          atCompany: item.atCompany,
          companyLink: item.companyLink,
          companyLogo: item.companyLogo,
          startDate: item.startDate,
          endDate: item.endDate,
          summary: item.summary,
          skills: item.skills,
          caseStudies: item.caseStudies,
        })
      )
    )
  );

  const skillsList = await db.skill.findMany();

  const caseStudyList = await db.caseStudy.findMany();

  return {
    props: { experienceList, skillsList, caseStudyList },
  };
};
