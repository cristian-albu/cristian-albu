import { SkillCategory } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const AddSkillCategory = () => {
  const [skillCategoryState, setSkillCategoryState] = useState("");

  const handleNewSkillCategory = async () => {
    const payload: SkillCategory = { id: skillCategoryState };

    try {
      await axios.post("/api/admin/new-skill-category", { payload });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col  justify-start items-start gap-2">
      <p className="text-3xl">Add a new skill category</p>
      <label htmlFor="Skill category">
        Skill Category name: {skillCategoryState !== "" ? "✅" : "❓"}
      </label>
      <input
        name="Skill category"
        type="text"
        value={skillCategoryState}
        onChange={({ target }) => setSkillCategoryState(target.value)}
        className="inputPrimary"
      />
      <button onClick={handleNewSkillCategory} className="btnPrimary">
        <IoMdAdd /> Add new skill category
      </button>
    </div>
  );
};

export default AddSkillCategory;
