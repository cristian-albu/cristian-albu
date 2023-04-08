import Section from "@/components/Section";
import Wrapper from "@/components/Wrapper";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { AiOutlineBook } from "react-icons/ai";
import { BiWrench } from "react-icons/bi";
import { MdTimeline } from "react-icons/md";
import { authOptions } from "../api/auth/[...nextauth]";

const Index = () => {
  return (
    <Section bg="bg-gray-100 min-h-screen">
      <Wrapper>
        <div className="flex items-center gap-[5rem] text-3xl">
          <Link
            href="/admin/case-studies"
            className="flex items-center justify-center gap-2 flex-col hover:text-blue-500 transition"
          >
            <AiOutlineBook />
            Case studies
          </Link>
          <Link
            href="/admin/skills"
            className="flex items-center justify-center gap-2 flex-col hover:text-blue-500 transition"
          >
            <BiWrench />
            Skills
          </Link>
          <Link
            href="/admin/experience"
            className="flex items-center justify-center gap-2 flex-col hover:text-blue-500 transition"
          >
            <MdTimeline />
            Experience
          </Link>
        </div>
      </Wrapper>
    </Section>
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

  return {
    props: {
      session,
    },
  };
}
