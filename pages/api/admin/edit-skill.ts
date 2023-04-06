import db from "@/lib/prisma";
import { Skill } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { instanceOfSkill } from "./new-skill";

interface Response {
  data: string;
  error: string | null;
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

  const payload = req.body.payload.values;
  const itemToUpdate = req.body.payload.item;

  if (!instanceOfSkill(payload) || typeof itemToUpdate !== "string") {
    return res.status(400).json({ data: "", error: "Wrong payload types" });
  }

  try {
    await db.skill.update({
      where: { name: itemToUpdate },
      data: {
        name: payload.name,
        categoryId: payload.categoryId,
        icon: payload.icon,
      },
    });
    res.status(200).json({ data: "Ok", error: null });
  } catch (error) {
    return res.status(400).json({
      data: "",
      error: `An error has occured while verifying the existing skill list: ${error}`,
    });
  }
};

export default handler;
