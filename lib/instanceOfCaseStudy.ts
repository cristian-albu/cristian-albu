import { CaseStudy, Experience } from "@prisma/client";

export function instanceOfCaseStudyData(object: any): object is CaseStudy {
  return (
    "id" &&
    "title" &&
    "slug" &&
    "content" &&
    "mainImage" &&
    "description" in object
  );
}

export function instanceOfExperience(object: any): object is Experience {
  return (
    "id" &&
    "position" &&
    "atCompany" &&
    "companyLogo" &&
    "companyLink" &&
    "startDate" &&
    "endDate" &&
    "summary" in object
  );
}

export interface ExperienceFull extends Experience {
  skills: Array<{ id: number }>;
  caseStudies: Array<{ id: string }>;
}

export function instanceOfExperienceFull(obj: any): obj is ExperienceFull {
  return "skills" in obj && "caseStudies" in obj;
}
