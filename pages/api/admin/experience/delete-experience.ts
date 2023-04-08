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
  if (typeof payload !== "string") {
    return res.status(400).json({ data: "", error: "Wrong payload types" });
  }

  try {
    // Create a new experience in the database using the payload and filtered skill and case study IDs.
    const deletedExperience = await db.experience.delete({
      where: {
        id: payload,
      },
    });

    return res.status(200).json({
      data: `Experience item with the id:${payload} has been deleted.`,
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
