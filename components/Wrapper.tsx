import React from "react";

interface Children {
  children: React.ReactElement | React.ReactElement[];
}

const Wrapper = ({ children }: Children) => {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[1100px]">
      {children}
    </div>
  );
};

export default Wrapper;
