import React from "react";
import Section from "@/components/Section";
import Wrapper from "@/components/Wrapper";

import Link from "next/link";
import { contactData, footerData, NavDataType, navData } from "@/data/navData";

const Footer = () => {
  return (
    <Section bg="bg-black text-white">
      <Wrapper>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-3 mb-10">
            <p>Quick links:</p>
            {navData.map((item: NavDataType) => (
              <Link
                key={item.title}
                href={item.link}
                className="flex gap-3 items-center"
              >
                {item.icon} {item.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <p>Social media:</p>
            {footerData.map((item: NavDataType) => (
              <a
                key={item.title}
                href={item.link}
                className="flex gap-3 items-center"
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.icon} {item.title}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <p>Contact info:</p>
            {contactData.map((item: NavDataType) => (
              <a
                key={item.title}
                href={item.link}
                className="flex gap-3 items-center"
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.icon} {item.title}
              </a>
            ))}
          </div>
        </div>
      </Wrapper>
    </Section>
  );
};

export default Footer;
