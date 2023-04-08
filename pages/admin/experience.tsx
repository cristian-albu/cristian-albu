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
import { MdEdit, MdPlusOne } from "react-icons/md";
import EditExperience from "@/components/admin/EditExperience";

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
  const [uiState, setUiState] = useState("");

  return (
    <Section bg="bg-gray-100 min-h-screen">
      <Wrapper>
        <div className="w-full flex justify-between mb-10">
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
            <>
              <button
                onClick={() => setUiState("")}
                className="btnPrimary mb-5"
              >
                {`< Back`}
              </button>
              <AddExperience
                skillsList={skillsList}
                caseStudyList={caseStudyList}
                emptyExperienceState={emptyExperienceState}
              />
            </>
          )}

          {experienceList.map((item: ExperienceFull) => (
            <div key={item.id}>
              {uiState === "" && (
                <div className="w-full grid grid-cols-5 justify-start items-center gap-5 mb-5">
                  <p className="col-span-2">
                    {item.position} @ {item.atCompany}
                  </p>
                  <p>From {item.startDate.toString().split("T")[0]}</p>
                  <p>To {item.endDate.toString().split("T")[0]}</p>
                  <button
                    onClick={() => setUiState(item.id)}
                    className="ml-auto flex items-center gap-2"
                  >
                    <MdEdit />
                    Edit
                  </button>
                </div>
              )}

              {uiState === item.id && (
                <div className="w-full">
                  <div className="flex items-center w-full ">
                    <button
                      onClick={() => setUiState("")}
                      className="btnPrimary mb-5"
                    >
                      {`< Back`}
                    </button>
                    <p className="ml-3">Item id: {item.id}</p>
                  </div>

                  <EditExperience
                    skillsList={skillsList}
                    caseStudyList={caseStudyList}
                    itemValues={item}
                  />
                </div>
              )}
            </div>
          ))}
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
