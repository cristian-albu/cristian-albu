import { ExperienceFull } from "./instanceOfCaseStudy";

export const validationLengthCheck = (
  input: string,
  min: number,
  max: number
) => input.length >= min && input.length <= max;

export const validationIsSlugCheck = (input: string) => {
  return (
    input ===
    input
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  );
};

export const validationImageSrc = (input: string) =>
  input.startsWith("https://res.cloudinary.com/") &&
  /\.(png|jpe?g|svg)$/.test(input);

export const validationEmailPattern = (input: string) =>
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    input
  );

export const validationSimpleText = (input: string) =>
  /^[a-zA-Z0-9_.,-]*$/.test(input);

export const validatePayload = ({
  position,
  atCompany,
  companyLink,
  companyLogo,
  summary,
}: ExperienceFull) => {
  return (
    validationLengthCheck(position, 5, 128) &&
    validationLengthCheck(atCompany, 3, 128) &&
    validationLengthCheck(companyLink, 1, 256) &&
    validationImageSrc(companyLogo) &&
    validationLengthCheck(summary, 10, 64000)
  );
};
