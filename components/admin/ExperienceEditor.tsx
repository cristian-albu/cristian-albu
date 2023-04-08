import { ExperienceFull } from "@/lib/instanceOfCaseStudy";
import slugify from "@/lib/slugify";
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
      <label htmlFor="position">Position</label>
      <input
        type="text"
        className="inputPrimary mb-3"
        placeholder="Position..."
        value={expState.position}
        onChange={({ target }) =>
          setExpState({ ...expState, position: target.value })
        }
        name="position"
      />
      <label htmlFor="atCompany">Company</label>
      <input
        type="text"
        className="inputPrimary mb-3"
        placeholder="Company..."
        value={expState.atCompany}
        onChange={({ target }) =>
          setExpState({ ...expState, atCompany: target.value })
        }
        name="atCompany"
      />
      <div className="w-full grid grid-cols-2 gap-x-5">
        <label htmlFor="companyLink">Company link</label>
        <label htmlFor="companyLogo">Company logo link</label>{" "}
        <input
          type="text"
          className="inputPrimary mb-3"
          placeholder="Company link..."
          value={expState.companyLink}
          onChange={({ target }) =>
            setExpState({ ...expState, companyLink: target.value })
          }
          name="companyLogo"
        />
        <input
          type="text"
          className="inputPrimary mb-3"
          placeholder="Company logo..."
          value={expState.companyLogo}
          onChange={({ target }) =>
            setExpState({ ...expState, companyLogo: target.value })
          }
          name="companyLink"
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-x-5">
        <label htmlFor="startDate">Start date</label>
        <label htmlFor="endDate">End date</label>
        <input
          type="date"
          className="inputPrimary mb-3"
          value={expState.startDate.toISOString().split("T")[0]}
          onChange={({ target }) =>
            target.value &&
            setExpState({ ...expState, startDate: new Date(target.value) })
          }
          name="startDate"
        />

        <input
          type="date"
          className="inputPrimary mb-3"
          value={expState.endDate.toISOString().split("T")[0]}
          onChange={({ target }) =>
            target.value &&
            setExpState({ ...expState, endDate: new Date(target.value) })
          }
          name="endDate"
        />
      </div>

      <label htmlFor="summary">Summary</label>
      <textarea
        className="inputPrimary mb-3 min-h-[250px]"
        placeholder="Summary..."
        value={expState.summary}
        onChange={({ target }) =>
          setExpState({ ...expState, summary: target.value })
        }
        name="summary"
      />

      <div className="w-full grid grid-cols-2 gap-x-5">
        <label>Skills used:</label>

        <label>Skills used:</label>

        <div className="flex gap-3 flex-wrap">
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
    </form>
  );
};

export default ExperienceEditor;
