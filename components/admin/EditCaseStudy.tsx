import { CaseStudy } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdDeleteOutline, MdOutlinePublish } from "react-icons/md";
import { emptyState } from "./AddCaseStudy";
import CaseStudyComponent from "./CaseStudy";

const EditCaseStudy = ({ initialData }: { initialData: CaseStudy }) => {
  const [data, setData] = useState<CaseStudy>(initialData);

  const [error, setError] = useState("");
  const [readyForPublish, setReadyForPublish] = useState(false);
  const [deleteSure, setDeleteSure] = useState(false);

  const router = useRouter();

  console.log(data);

  const publishEditedData = async () => {
    try {
      const res = await axios.post("/api/admin/case-studies/edit-case-study", {
        payload: data,
      });

      localStorage.removeItem("ca_draft");

      setData(emptyState);
      setError("");
      console.log(res);
      router.reload();
    } catch (err: any) {
      console.log(err);
      setError(`${err?.response?.data?.error}`);
    }
  };
  const publishDeleteData = async () => {
    try {
      const res = await axios.post(
        "/api/admin/case-studies/delete-case-study",
        {
          payload: data,
        }
      );

      localStorage.removeItem("ca_draft");

      setData(emptyState);
      setError("");
      console.log(res);
      router.reload();
    } catch (err: any) {
      console.log(err);
      setError(`${err?.response?.data?.error}`);
    }
  };
  return (
    <>
      <div className="flex w-full mt-[-50px] pl-[8%]">
        <p className="text-3xl mb-5 w-full">Edit case study</p>
      </div>

      <p className="w-full italic text-sm mb-5">ID: {data.id}</p>
      <CaseStudyComponent
        setData={setData}
        data={data}
        setReadyForPublish={setReadyForPublish}
      />
      <div className="w-full flex justify-end gap-5 items-center ">
        {deleteSure && (
          <button
            onClick={() => setDeleteSure(false)}
            className="btnPrimary disabled:bg-gray-300 disabled:cursor-not-allowed "
          >
            {"< Go back"}
          </button>
        )}
        {deleteSure && (
          <button
            onClick={publishDeleteData}
            className="btnPrimary disabled:bg-gray-300 disabled:cursor-not-allowed bg-red-500"
          >
            <MdDeleteOutline />
            Are you sure?
          </button>
        )}

        {!deleteSure && (
          <button
            onClick={() => setDeleteSure(true)}
            className="btnPrimary disabled:bg-gray-300 disabled:cursor-not-allowed bg-red-500"
          >
            <MdDeleteOutline />
            Delete
          </button>
        )}
        <button
          onClick={publishEditedData}
          className="btnPrimary disabled:bg-gray-300 disabled:cursor-not-allowed bg-blue-500"
          disabled={
            !data.title || !data.slug || !data.content || !readyForPublish
          }
        >
          <MdOutlinePublish />
          Publish
        </button>
      </div>

      {error && <p>{error}</p>}
    </>
  );
};

export default EditCaseStudy;
