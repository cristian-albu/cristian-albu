import { Skill, SkillCategory } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineDeleteOutline, MdModeEditOutline } from "react-icons/md";

const EditSkill = ({
  item,
  dbSkillState,
  setDbSkillState,
  skillCategory,
  techIconsList,
}: any) => {
  const [editState, setEditState] = useState<{ name: string; values: Skill }>({
    name: "",
    values: { name: "", icon: "", categoryId: "", id: 0 },
  });

  const handleEditSkill = async (skill: Skill) => {
    try {
      await axios.post("/api/admin/edit-skill", {
        payload: { item: editState.name, values: skill },
      });

      setDbSkillState(
        dbSkillState.map((item: Skill) =>
          item.name === editState.name ? skill : item
        )
      );

      setEditState({
        name: "",
        values: { name: "", id: 0, categoryId: "", icon: "" },
      });
    } catch (error: any) {
      console.warn(error.response.data.error);
    }
  };

  const handleDeleteSkill = async (skill: Skill) => {
    try {
      const deleteSkill = await axios.post("/api/admin/delete-skill", {
        payload: skill,
      });

      const newDbSkillState = dbSkillState.filter(
        (item: Skill) => item.name !== skill.name
      );

      setDbSkillState(newDbSkillState);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <button
        onClick={() =>
          setEditState({
            name: item.name,
            values: {
              id: 0,
              name: item.name,
              icon: item.icon,
              categoryId: item.categoryId,
            },
          })
        }
        className="flex items-center text-sm gap-1"
      >
        <MdModeEditOutline />
        Edit
      </button>

      <button
        onClick={() => handleDeleteSkill(item)}
        className="flex items-center text-sm gap-1 text-red-700"
      >
        <MdOutlineDeleteOutline /> Delete
      </button>
      {editState.name === item.name && (
        <div className="fixed top-0 right-0 w-full h-full z-[80] bg-black/75 flex flex-col items-center justify-center">
          <div className="w-full max-w-[700px]  bg-white shadow-xl shadow-black/20 rounded-lg p-10 flex flex-col gap-3">
            <label htmlFor="Skill name edit">Skill name</label>
            <input
              name="Skill name edit"
              type="text"
              placeholder="Nextjs..."
              value={editState.values.name}
              onChange={({ target }) =>
                setEditState({
                  name: editState.name,
                  values: {
                    ...editState.values,
                    name: target.value,
                  },
                })
              }
              className="border-2 border-black p-1 w-full"
            />
            <label htmlFor="category select edit">Skill category:</label>
            <select
              name="category select edit"
              id="category select edit"
              className="border-2 border-black p-2 w-full"
              value={editState.values.categoryId}
              onChange={({ target }) =>
                setEditState({
                  name: editState.name,
                  values: {
                    ...editState.values,
                    categoryId: target.value,
                  },
                })
              }
            >
              <option>Select...</option>
              {skillCategory.map((category: SkillCategory) => (
                <option key={`${category.id} edit`} value={category.id}>
                  {category.id}
                </option>
              ))}
            </select>

            <label htmlFor="Skill image">Skill image:</label>
            <div id="Skill image" className="flex flex-wrap gap-3">
              {techIconsList.map((img: string) => (
                <Image
                  src={img}
                  width={40}
                  height={40}
                  alt=""
                  key={`${img} edit`}
                  onClick={() =>
                    setEditState({
                      name: editState.name,
                      values: { ...editState.values, icon: img },
                    })
                  }
                  className={`w-[40px] aspect-square object-contain cursor-pointer p-1 border-2 ${
                    editState.values.icon === img
                      ? "border-black opacity-100"
                      : "border-transparent opacity-50"
                  }`}
                />
              ))}
            </div>
            <div className="flex w-full justify-between gap-5 items-center">
              <button
                onClick={() =>
                  setEditState({
                    name: "",
                    values: {
                      name: "",
                      id: 0,
                      categoryId: "",
                      icon: "",
                    },
                  })
                }
                className="btnPrimary"
              >
                Cancel
              </button>{" "}
              <button
                onClick={() => handleEditSkill(editState.values)}
                className="btnPrimary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditSkill;
