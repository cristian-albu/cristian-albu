import DynHead from "@/components/DynHead";
import HeroSection from "@/components/Pages/HeroSection";
import Section from "@/components/Section";
import Wrapper from "@/components/Wrapper";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";

const Index: NextPage = () => {
  return (
    <>
      <DynHead
        title="Cristian Albu"
        description=""
        image="/assets/cristian-albu.png"
      />
      <HeroSection />
    </>
  );
};

export default Index;
