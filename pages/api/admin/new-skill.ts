import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Skill, SkillCategory } from "@prisma/client";

interface Response {
  data: string;
  error: string | null;
}

function instanceOfSkill(object: any): object is Skill {
  return "name" && "icon" && "categoryId" in object;
}

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(400).json({ data: "", error: "Not authenticated" });
  }

  if (req.method !== "POST") {
    return res.status(400).json({ data: "", error: "Method not allowed" });
  }

  const payload = req.body.payload;

  if (!instanceOfSkill(payload)) {
    return res.status(400).json({ data: "", error: "Wrong payload types" });
  }

  try {
    const skillCategories = await db.skillCategory.findMany();

    if (
      skillCategories.findIndex(
        (item: SkillCategory) => item.id === payload.categoryId
      ) < 0
    ) {
      return res.status(400).json({ data: "", error: "Wrong category ID" });
    }

    await db.skill.create({
      data: {
        name: payload.name,
        icon: payload.icon,
        categoryId: payload.categoryId,
      },
    });

    return res.status(200).json({
      data: `New Skill ${payload.name} created`,
      error: null,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ data: "", error: `An error occured: ${error}` });
  }
};

export default handler;
