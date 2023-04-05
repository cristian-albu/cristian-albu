import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { SkillCategory } from "@prisma/client";

interface Response {
  data: string;
  error: string | null;
}

function instanceOfSkillCategory(object: any): object is SkillCategory {
  return "id" in object;
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

  if (!instanceOfSkillCategory(payload)) {
    return res.status(400).json({ data: "", error: "Wrong payload types" });
  }

  try {
    await db.skillCategory.create({
      data: { id: payload.id },
    });

    return res.status(200).json({
      data: `New Skill Category ${payload.id} created`,
      error: null,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ data: "", error: `An error occured: ${error}` });
  }
};

export default handler;
