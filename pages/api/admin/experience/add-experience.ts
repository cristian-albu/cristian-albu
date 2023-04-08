import { instanceOfExperienceFull } from "@/lib/instanceOfCaseStudy";
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

  // Retrieve the user session using next-auth.
  const session = await getServerSession(req, res, authOptions);

  // Check that the user is authenticated.
  if (!session) {
    return res.status(400).json({ data: "", error: "Not authenticated" });
  }

  const payload = req.body.payload;

  // Check that the payload matches the expected shape of an experience.
  if (!instanceOfExperienceFull(payload)) {
    return res.status(400).json({ data: "", error: "Wrong payload types" });
  }

  try {
    // Retrieve a list of all skill and case study IDs in the database.
    const skillIdList = await db.skill.findMany({ select: { id: true } });
    const casestudyIdList = await db.caseStudy.findMany({
      select: { id: true },
    });

    // Filter the skills and case studies in the payload to only include those that are already in the database.
    const skillsToAdd = payload.skills.filter((skill: { id: number }) => {
      return skillIdList.some((e: { id: number }) => e.id === skill.id);
    });

    const casestudiesToAdd = payload.caseStudies.filter(
      (skill: { id: String }) => {
        return casestudyIdList.some((e: { id: String }) => e.id === skill.id);
      }
    );

    // Create a new experience in the database using the payload and filtered skill and case study IDs.
    const newExperience = await db.experience.create({
      data: {
        position: payload.position,
        atCompany: payload.atCompany,
        companyLink: payload.companyLink,
        companyLogo: payload.companyLogo,
        startDate: payload.startDate,
        endDate: payload.endDate,
        summary: payload.summary,
        skills: { connect: skillsToAdd },
        caseStudies: {
          connect: casestudiesToAdd,
        },
      },
    });

    return res.status(200).json({
      data: `Case study with the id:${newExperience.id} has been created.`,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      data: "",
      error: `An error has occured while creating a new case study: ${error}`,
    });
  }
};

export default handler;
