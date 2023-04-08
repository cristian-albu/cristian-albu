import { CaseStudy } from "@prisma/client";

export function instanceOfCaseStudyData(object: any): object is CaseStudy {
  return "id" && "title" && "slug" && "content" && "mainImage" in object;
}
