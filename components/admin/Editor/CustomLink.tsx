import Link from "next/link";
import React from "react";

const CustomLink = ({ href, children }: any) => {
  const isInternalLink = href && href.startsWith("/");

  if (isInternalLink) {
    return <Link href={href}>{children}</Link>;
  } else {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
};

export default CustomLink;
