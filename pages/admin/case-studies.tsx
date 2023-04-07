import AddCaseStudy from "@/components/admin/AddCaseStudy";
import Section from "@/components/Section";
import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";

export const CaseStudies = () => {
  return (
    <Section>
      <Wrapper>
        <AddCaseStudy />
      </Wrapper>
    </Section>
  );
};

export default CaseStudies;
