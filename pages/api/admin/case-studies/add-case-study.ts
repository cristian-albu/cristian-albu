import { instanceOfCaseStudyData } from "@/lib/instanceOfCaseStudy";
import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

interface Data {
  data: string;
  error: string | null;
}

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method !== "POST") {
    return res.status(400).json({ data: "", error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(400).json({ data: "", error: "Not authenticated" });
  }

  const payload = req.body.payload;

  if (!instanceOfCaseStudyData(payload)) {
    return res.status(400).json({ data: "", error: "Wrong payload types" });
  }

  try {
    const newCaseStudy = await db.caseStudy.create({
      data: {
        title: payload.title,
        slug: payload.slug,
        mainImage: payload.mainImage,
        content: payload.content,
        description: payload.description,
      },
    });

    return res.status(200).json({
      data: `Case study with the id:${newCaseStudy.id} has been created`,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      data: "",
      error: `An error has occured while creating a new case study: ${error}`,
    });
  }
};

export default handler;
