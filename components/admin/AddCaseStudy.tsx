import { CaseStudy } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlinePublish } from "react-icons/md";
import CaseStudyComponent from "./CaseStudy";

export const emptyState = {
  id: "emptyId",
  title: "",
  slug: "",
  mainImage: "",
  content: "",
  description: "",
};

const AddCaseStudy = () => {
  const [data, setData] = useState<CaseStudy>(emptyState);

  const [error, setError] = useState("");

  const [readyForPublish, setReadyForPublish] = useState(false);

  const router = useRouter();

  const publishData = async () => {
    try {
      const res = await axios.post("/api/admin/case-studies/add-case-study", {
        payload: data,
      });

      localStorage.removeItem("ca_draft");

      setData(emptyState);
      setError("");
      router.reload();
      console.log(res);
    } catch (err: any) {
      setError(`${err.response.data.error}`);
    }
  };
  return (
    <>
      <div className="flex w-full mt-[-50px] pl-[8%]">
        <p className="text-3xl mb-5 w-full">Add case study</p>
      </div>

      <CaseStudyComponent
        setData={setData}
        data={emptyState}
        setReadyForPublish={setReadyForPublish}
      />
      <button
        onClick={publishData}
        className="btnPrimary ml-auto disabled:bg-gray-300 disabled:cursor-not-allowed bg-blue-500"
        disabled={
          !data.title || !data.slug || !data.content || !readyForPublish
        }
      >
        <MdOutlinePublish />
        Publish
      </button>
      {error && <p>{error}</p>}
    </>
  );
};

export default AddCaseStudy;
