import { ExperienceFull } from "@/lib/instanceOfCaseStudy";
import slugify from "@/lib/slugify";
import { validationImageSrc, validationLengthCheck } from "@/lib/validations";
import { CaseStudy, Experience, Skill } from "@prisma/client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

interface ExperienceEditorType {
  skillsList: Skill[];
  caseStudyList: CaseStudy[];
  expState: ExperienceFull;
  setExpState: Dispatch<SetStateAction<ExperienceFull>>;
}

const ExperienceEditor = ({
  skillsList,
  caseStudyList,
  expState,
  setExpState,
}: ExperienceEditorType) => {
  return (
    <form
      className="w-full flex flex-col items-start"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="w-full grid grid-cols-2 gap-x-5">
        <label htmlFor="position">Position</label>
        <label htmlFor="atCompany">Company</label>
        <input
          type="text"
          className={`inputPrimary mb-3 ${
            !validationLengthCheck(expState.position, 5, 128) &&
            "border-2 border-red-500"
          }`}
          placeholder="Position..."
          value={expState.position}
          onChange={({ target }) =>
            setExpState({ ...expState, position: target.value })
          }
          name="position"
        />
        <input
          type="text"
          className={`inputPrimary mb-3 ${
            !validationLengthCheck(expState.atCompany, 3, 128) &&
            "border-2 border-red-500"
          }`}
          placeholder="Company..."
          value={expState.atCompany}
          onChange={({ target }) =>
            setExpState({ ...expState, atCompany: target.value })
          }
          name="atCompany"
        />
      </div>
      <div className="w-full grid grid-cols-4 gap-x-5">
        <label htmlFor="startDate">Start date</label>
        <label htmlFor="endDate">End date</label>
        <label htmlFor="companyLink">Company link</label>
        <label htmlFor="companyLogo">Company logo link</label>
        <input
          type="date"
          className="inputPrimary mb-3"
          value={new Date(expState.startDate).toISOString().split("T")[0]}
          onChange={({ target }) =>
            target.value &&
            setExpState({ ...expState, startDate: new Date(target.value) })
          }
          name="startDate"
        />

        <input
          type="date"
          className="inputPrimary mb-3"
          value={new Date(expState.endDate).toISOString().split("T")[0]}
          onChange={({ target }) =>
            target.value &&
            setExpState({ ...expState, endDate: new Date(target.value) })
          }
          name="endDate"
        />
        <input
          type="text"
          className={`inputPrimary mb-3 ${
            !validationLengthCheck(expState.companyLink, 1, 256) &&
            "border-2 border-red-500"
          }`}
          placeholder="Company link..."
          value={expState.companyLink}
          onChange={({ target }) =>
            setExpState({ ...expState, companyLink: target.value })
          }
          name="companyLink"
        />
        <input
          type="text"
          className={`inputPrimary mb-3 ${
            !validationImageSrc(expState.companyLogo) &&
            "border-2 border-red-500"
          }`}
          placeholder="Company logo..."
          value={expState.companyLogo}
          onChange={({ target }) =>
            setExpState({ ...expState, companyLogo: target.value })
          }
          name="companyLogo"
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-x-5">
        <div>
          <label htmlFor="summary">Summary</label>
          <textarea
            className={`inputPrimary mb-3 min-h-[250px] ${
              !validationLengthCheck(expState.summary, 10, 64000) &&
              "border-2 border-red-500"
            }`}
            placeholder="Summary..."
            value={expState.summary}
            onChange={({ target }) =>
              setExpState({ ...expState, summary: target.value })
            }
            name="summary"
          />
        </div>
        <div className="w-full flex flex-col gap-x-5">
          <p>Skills used:</p>

          <div className="flex gap-3 flex-wrap mb-5">
            {skillsList.map((skill: Skill) => (
              <div key={skill.id}>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    onClick={({ currentTarget }) =>
                      currentTarget.checked
                        ? setExpState({
                            ...expState,
                            skills: [...expState.skills, { id: skill.id }],
                          })
                        : setExpState({
                            ...expState,
                            skills: expState.skills.filter(
                              (e: { id: number }) => e.id !== skill.id
                            ),
                          })
                    }
                  />
                  <Image
                    src={skill.icon}
                    width={15}
                    height={15}
                    alt=""
                    className="w-[15px] aspect-square object-contain"
                  />
                  <p>{skill.name}</p>
                </label>
              </div>
            ))}
          </div>
          <p>Case studies:</p>
          <div className="flex gap-3 flex-wrap flex-col">
            {caseStudyList.map((study: CaseStudy) => (
              <div key={study.id} className="w-full">
                <label className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    onClick={({ currentTarget }) =>
                      currentTarget.checked
                        ? setExpState({
                            ...expState,
                            caseStudies: [
                              ...expState.caseStudies,
                              { id: study.id },
                            ],
                          })
                        : setExpState({
                            ...expState,
                            caseStudies: expState.caseStudies.filter(
                              (e: { id: string }) => e.id !== study.id
                            ),
                          })
                    }
                  />
                  {study.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ExperienceEditor;
