import { ExperienceFull } from "@/lib/instanceOfCaseStudy";
import { validatePayload } from "@/lib/validations";
import { CaseStudy, Skill } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ExperienceEditor from "./ExperienceEditor";

interface ExperienceEditorType {
  skillsList: Skill[];
  caseStudyList: CaseStudy[];
  itemValues: ExperienceFull;
}

const EditExperience = ({
  skillsList,
  caseStudyList,
  itemValues,
}: ExperienceEditorType) => {
  const [expState, setExpState] = useState<ExperienceFull>(itemValues);

  const [error, setError] = useState<string | null>(null);
  const [reallyDelete, setReallyDelete] = useState(false);

  const router = useRouter();

  const publishUpdatedExperienceItem = async () => {
    if (!validatePayload(expState)) {
      console.log("Payload not valid");
      return;
    }
    try {
      const res = await axios.post("/api/admin/experience/edit-experience", {
        payload: expState,
      });

      console.log(res);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExperienceItem = async () => {
    try {
      const res = await axios.post("/api/admin/experience/delete-experience", {
        payload: expState.id,
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
      <div className="w-full flex gap-5 items-center justify-end">
        {reallyDelete && (
          <>
            <button
              onClick={deleteExperienceItem}
              className="btnPrimary bg-red-500"
            >
              You Sure?
            </button>
            <button
              className="btnPrimary"
              onClickCapture={() => setReallyDelete(false)}
            >
              Cancel
            </button>
          </>
        )}
        {!reallyDelete && (
          <button
            className="btnPrimary"
            onClickCapture={() => setReallyDelete(true)}
          >
            Delete
          </button>
        )}
        <button
          className="btnPrimary bg-blue-500"
          onClick={publishUpdatedExperienceItem}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default EditExperience;
