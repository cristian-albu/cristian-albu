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

  const payload = req.body.payload;

  if (!instanceOfSkill(payload)) {
    return res.status(400).json({ data: "", error: "Wrong payload types" });
  }

  try {
    const existingSkills = await db.skill.findMany();

    const payloadSkillId = existingSkills.findIndex(
      (item: Skill) => item.name === payload.name
    );

    if (payloadSkillId < 0) {
      return res.status(400).json({
        data: "",
        error: `Sent delete request does not match any skills in the database`,
      });
    }

    try {
      await db.skill.delete({ where: { name: payload.name } });

      return res.status(200).json({
        data: `Skill with the id of ${payload.name} has been deleted successfuly`,
        error: null,
      });
    } catch (error) {
      return res.status(400).json({
        data: "",
        error: `An error has occured while deleting the skill item: ${error}`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      data: "",
      error: `An error has occured while verifying the existing skill list: ${error}`,
    });
  }
};

export default handler;
