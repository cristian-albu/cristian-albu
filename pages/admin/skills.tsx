import Section from "@/components/Section";
import Wrapper from "@/components/Wrapper";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getServerSession } from "next-auth";
import React, { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import db from "@/lib/prisma";
import { Skill } from "@prisma/client";
import Image from "next/image";
import { getCloudinaryImages } from "@/lib/cloudinary";
import EditSkill from "@/components/admin/EditSkill";
import AddSkill from "@/components/admin/AddSkill";
import AddSkillCategory from "@/components/admin/AddSkillCategory";

const Index: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ skillCategory, skills, techIconsList }) => {
  const [dbSkillState, setDbSkillState] = useState(skills);

  return (
    <div className="min-h-[90vh] flex flex-col w-full justify-center items-center gap-3">
      <Section>
        <Wrapper>
          <div className="flex gap-3 w-full justify-between items-start">
            <div className="w-[48%] flex flex-col gap-10 items-start justify-start ">
              <AddSkill
                dbSkillState={dbSkillState}
                setDbSkillState={setDbSkillState}
                techIconsList={techIconsList}
                skillCategory={skillCategory}
              />
              <AddSkillCategory />
            </div>
            <div className="w-[48%] flex flex-col items-start justify-start gap-3">
              <p className="text-3xl">Skills:</p>
              <div className="w-full flex flex-col items-start justify-start gap-4 h-[60vh] overflow-scroll p-5 border-2 border-black rounded-md">
                {dbSkillState.map((item: Skill) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-6 gap-3 items-center justify-between w-full"
                  >
                    <div className="flex gap-2 items-center col-span-4 ">
                      <Image
                        src={item.icon}
                        width={25}
                        height={25}
                        alt=""
                        className="w-[25px] aspect-square object-contain"
                      />
                      <p>
                        {item.name}{" "}
                        <span className="text-xs text-gray-400">{`(id: ${item.id})`}</span>
                      </p>
                      <p className="italic text-sm text-gray-500">
                        {item.categoryId}
                      </p>
                    </div>

                    <EditSkill
                      item={item}
                      dbSkillState={dbSkillState}
                      setDbSkillState={setDbSkillState}
                      skillCategory={skillCategory}
                      techIconsList={techIconsList}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Wrapper>
      </Section>
    </div>
  );
};
export default Index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const techIconsList: Array<string> = await getCloudinaryImages("tech-icons");

  const [skillCategory, skills] = await Promise.all([
    db.skillCategory.findMany(),
    db.skill.findMany({ orderBy: [{ id: "desc" }] }),
  ]);

  return {
    props: {
      session,
      skillCategory,
      skills,
      techIconsList,
    },
  };
}
