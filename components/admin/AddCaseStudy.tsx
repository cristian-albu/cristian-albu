import { useRouter } from "next/router";
import React, { useState } from "react";

import CaseStudy from "./CaseStudy";

export interface CaseStudyData {
  title: string;
  slug: string;
  content: string;
}
const AddCaseStudy = () => {
  const router = useRouter();
  const emptyState = {
    title: "",
    slug: "",
    content: "",
  };
  const [data, setData] = useState<CaseStudyData>(emptyState);

  const publishData = async () => {
    localStorage.removeItem("ca_draft");
    router.reload();
  };
  return (
    <>
      <CaseStudy setData={setData} data={emptyState} />
      <button
        onClick={publishData}
        className="btnPrimary disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={!data.title || !data.slug || !data.content}
      >
        Publish
      </button>
    </>
  );
};

export default AddCaseStudy;
