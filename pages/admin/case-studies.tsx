import AddCaseStudy, { emptyState } from "@/components/admin/AddCaseStudy";
import EditCaseStudy from "@/components/admin/EditCaseStudy";
import Section from "@/components/Section";
import Wrapper from "@/components/Wrapper";
import { BiArrowBack } from "react-icons/bi";
import db from "@/lib/prisma";
import { CaseStudy } from "@prisma/client";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getServerSession } from "next-auth";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlinePublish } from "react-icons/md";
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";

export const CaseStudies: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ caseStudies }) => {
  const [uiState, setUiState] = useState({ showAdd: false, showEdit: false });

  const [editInit, setEditInit] = useState(emptyState);

  const handleEditCaseStudy = (data: CaseStudy) => {
    setEditInit(data);
    setUiState({ ...uiState, showEdit: true, showAdd: false });
  };

  if (uiState.showAdd) {
    return (
      <Section bg="bg-gray-100 pt-[3%]">
        <Wrapper>
          <div className="w-full flex items-center">
            <button
              className="flex gap-2 items-center mb-5 relative"
              onClick={() =>
                setUiState({ ...uiState, showEdit: false, showAdd: false })
              }
            >
              <BiArrowBack /> Back
            </button>
          </div>
          <AddCaseStudy />
        </Wrapper>
      </Section>
    );
  }

  if (uiState.showEdit) {
    return (
      <Section bg="bg-gray-100 pt-[3%]">
        <Wrapper>
          <div className="w-full flex items-center">
            <button
              className="flex gap-2 items-center mb-5 relative"
              onClick={() =>
                setUiState({ ...uiState, showEdit: false, showAdd: false })
              }
            >
              <BiArrowBack /> Back
            </button>
          </div>
          <EditCaseStudy initialData={editInit} />
        </Wrapper>
      </Section>
    );
  }

  return (
    <Section bg="bg-gray-100 min-h-screen">
      <Wrapper>
        <div className="w-full my-10">
          <p className="text-5xl">Case studies </p>
        </div>
        <div className="w-full flex items-center flex-wrap">
          <div className="flex flex-col w-full mb-10 gap-3">
            {caseStudies.length > 0 ? (
              caseStudies.map((item: CaseStudy) => (
                <div
                  key={item.id}
                  className="flex items-center w-full justify-start border-b-2 border-b-gray-300 border-dashed gap-3 pb-3"
                >
                  <Image
                    src={item.mainImage}
                    width={35}
                    height={35}
                    alt=""
                    className="w-[35px] aspect-auto object-contain"
                  />
                  <p></p>
                  {item.title}
                  <button
                    className="flex items-center gap-2 ml-auto"
                    onClick={() => handleEditCaseStudy(item)}
                  >
                    <AiOutlineEdit /> Edit
                  </button>
                </div>
              ))
            ) : (
              <>No case studies yet...</>
            )}
          </div>
          <button
            className="btnPrimary ml-auto"
            onClick={() =>
              setUiState({ ...uiState, showAdd: true, showEdit: false })
            }
          >
            <MdOutlinePublish />
            Add Case study
          </button>
        </div>
      </Wrapper>
    </Section>
  );
};
export default CaseStudies;

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

  const caseStudies = await db.caseStudy.findMany();

  return {
    props: { caseStudies },
  };
};
