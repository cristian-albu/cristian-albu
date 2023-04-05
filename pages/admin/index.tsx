import Skills from "@/components/admin/Skills";
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
import { Skill, SkillCategory } from "@prisma/client";
import axios from "axios";

const Index: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ session, skillCategory, skills }) => {
  console.log(skillCategory, skills);

  const [skillCategoryState, setSkillCategoryState] = useState("");

  const [skillState, setSkillState] = useState({
    name: "",
    icon: "",
    categoryId: "",
  });

  const handleNewSkillCategory = async () => {
    const payload: SkillCategory = { id: skillCategoryState };

    try {
      const newSkillCategory = await axios.post(
        "/api/admin/new-skill-category",
        { payload }
      );

      console.log(newSkillCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewSkill = async () => {
    const payload: Skill = {
      id: 0,
      name: skillState.name,
      icon: skillState.icon,
      categoryId: skillState.categoryId,
    };

    try {
      const newSkillCategory = await axios.post("/api/admin/new-skill", {
        payload,
      });

      console.log(newSkillCategory);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-[90vh] flex flex-col w-full justify-center items-center gap-3">
      <Section>
        <Wrapper>
          <div className="flex flex-col gap-3 w-full">
            <div className="w-full flex flex-col gap-3 items-start justify-start max-w-[48%]">
              <input
                type="text"
                value={skillCategoryState}
                onChange={({ target }) => setSkillCategoryState(target.value)}
                className="border-2 border-black p-1 w-full"
              />
              <button onClick={handleNewSkillCategory} className="btnPrimary">
                Add new skill category
              </button>
            </div>
            <div className="w-full flex flex-col gap-3 items-start justify-start max-w-[48%]">
              <input
                type="text"
                value={skillState.name}
                onChange={({ target }) =>
                  setSkillState({ ...skillState, name: target.value })
                }
                className="border-2 border-black p-1 w-full"
              />
              <input
                type="text"
                value={skillState.icon}
                onChange={({ target }) =>
                  setSkillState({ ...skillState, icon: target.value })
                }
                className="border-2 border-black p-1 w-full"
              />
              <input
                type="text"
                value={skillState.categoryId}
                onChange={({ target }) =>
                  setSkillState({
                    ...skillState,
                    categoryId: target.value,
                  })
                }
                className="border-2 border-black p-1 w-full"
              />
              <button onClick={handleNewSkill} className="btnPrimary">
                Add new skill
              </button>
            </div>
          </div>
          <Skills />
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

  const [skillCategory, skills] = await Promise.all([
    db.skillCategory.findMany(),
    db.skill.findMany(),
  ]);

  return {
    props: {
      session,
      skillCategory,
      skills,
    },
  };
}
