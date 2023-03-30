import DynHead from "@/components/DynHead";
import ExperienceTimeline from "@/components/Pages/ExperienceTimeline";
import { NextPage } from "next";
import React from "react";

const Experience: NextPage = () => {
  return (
    <div>
      <DynHead
        title="Experience"
        description=""
        image="/assets/cristian-albu.png"
      />
      <ExperienceTimeline />
    </div>
  );
};

export default Experience;
