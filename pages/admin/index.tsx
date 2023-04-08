import Section from "@/components/Section";
import Wrapper from "@/components/Wrapper";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Index = () => {
  return (
    <Section bg="bg-gray-100 min-h-screen">
      <Wrapper>
        <div>Admin</div>
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
