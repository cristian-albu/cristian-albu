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
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Index: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ session }) => {
  console.log(session);
  if (session) {
    return (
      <Section>
        <Wrapper>
          <div className="min-h-[90vh] flex flex-col w-full justify-center items-center gap-3">
            <p> Signed in as</p>
            <div className="flex items-center gap-3">
              <Image
                src={
                  session?.user?.image
                    ? session?.user?.image
                    : "/assets/tech-icons/nextjs_logo.png"
                }
                width={35}
                height={35}
                alt={`${session?.user?.email}'s picture`}
                className="w-[35px] aspect-square rounded-full"
              />
              <p>{session?.user?.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => signOut()} className="btnPrimary">
                Sign Out
              </button>
              <Link href={"/admin"} className="btnPrimary">
                Go to Admin Panel
              </Link>
            </div>
          </div>
        </Wrapper>
      </Section>
    );
  } else {
    return (
      <Section>
        <Wrapper>
          <div className="min-h-[90vh] flex flex-col w-full justify-center items-center">
            <h1 className="mb-5">You are not signed in</h1>
            <button onClick={() => signIn()} className="btnPrimary">
              Sign In
            </button>
          </div>
        </Wrapper>
      </Section>
    );
  }
};

export default Index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session,
    },
  };
}
