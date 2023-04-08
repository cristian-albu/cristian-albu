import { ExperienceFull } from "@/lib/instanceOfCaseStudy";
import { validatePayload, validationLengthCheck } from "@/lib/validations";
import { CaseStudy, Skill } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ExperienceEditor from "./ExperienceEditor";

interface ExperienceEditorType {
  skillsList: Skill[];
  caseStudyList: CaseStudy[];
  emptyExperienceState: ExperienceFull;
}

const AddExperience = ({
  skillsList,
  caseStudyList,
  emptyExperienceState,
}: ExperienceEditorType) => {
  const [expState, setExpState] =
    useState<ExperienceFull>(emptyExperienceState);
  const router = useRouter();

  const publishExperienceItem = async () => {
    if (!validatePayload(expState)) {
      console.log("Payload not valid");
      return;
    }
    try {
      const res = await axios.post("/api/admin/experience/add-experience", {
        payload: expState,
      });

      console.log(res);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ExperienceEditor
        skillsList={skillsList}
        caseStudyList={caseStudyList}
        expState={expState}
        setExpState={setExpState}
      />
      <button onClick={publishExperienceItem} className="btnPrimary">
        Publish
      </button>
    </div>
  );
};

export default AddExperience;
