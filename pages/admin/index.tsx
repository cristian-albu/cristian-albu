import Section from "@/components/Section";
import Wrapper from "@/components/Wrapper";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Index: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ session }) => {
  return <div></div>;
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
