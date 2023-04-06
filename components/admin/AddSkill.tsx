import { Skill, SkillCategory } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const AddSkill = ({
  dbSkillState,
  setDbSkillState,
  techIconsList,
  skillCategory,
}: any) => {
  const [skillState, setSkillState] = useState<Skill>({
    id: 0,
    name: "",
    icon: "",
    categoryId: "Select",
  });

  const [error, setError] = useState("");

  const handleNewSkill = async () => {
    const payload: Skill = {
      id: 0,
      name: skillState.name,
      icon: skillState.icon,
      categoryId: skillState.categoryId,
    };

    if (payload.name.length < 1) {
      setError("Name too short");
      return;
    } else if (payload.icon.length < 1) {
      setError("No image selected");
      return;
    } else if (
      payload.categoryId.length < 1 ||
      payload.categoryId === "Select"
    ) {
      setError("No category selected");
      return;
    }

    setError("");

    try {
      await axios.post("/api/admin/new-skill", {
        payload,
      });

      setDbSkillState([skillState, ...dbSkillState]);

      setSkillState({
        id: 0,
        name: "",
        icon: "",
        categoryId: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <p className="text-3xl">Add a new skill</p>
      <label htmlFor="Skill name">
        Skill name: {skillState.name !== "" ? "✅" : "❓"}
      </label>
      <input
        name="Skill name"
        type="text"
        placeholder="Nextjs..."
        value={skillState.name}
        onChange={({ target }) =>
          setSkillState({ ...skillState, name: target.value })
        }
        className="inputPrimary"
      />
      <label htmlFor="category select">
        Skill category: {skillState.categoryId !== "Select" ? "✅" : "❓"}
      </label>
      <select
        name="category select"
        id="category select"
        className="inputPrimary py-2"
        value={skillState.categoryId}
        onChange={({ target }) =>
          setSkillState({
            ...skillState,
            categoryId: target.value,
          })
        }
      >
        <option>Select...</option>
        {skillCategory.map((category: SkillCategory) => (
          <option key={category.id} value={category.id}>
            {category.id}
          </option>
        ))}
      </select>
      <label htmlFor="Skill image">
        Skill image: {skillState.icon !== "" ? "✅" : "❓"}
      </label>
      <div id="Skill image" className="flex flex-wrap gap-3">
        {techIconsList.map((img: string) => (
          <Image
            src={img}
            width={30}
            height={30}
            alt=""
            key={img}
            onClick={() => setSkillState({ ...skillState, icon: img })}
            className={`w-[30px] aspect-square object-contain cursor-pointer p-1 border-2 ${
              skillState.icon === img
                ? "border-black opacity-100"
                : "border-transparent opacity-50"
            }`}
          />
        ))}
      </div>

      <button onClick={handleNewSkill} className="btnPrimary">
        <IoMdAdd /> Add new skill
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddSkill;
