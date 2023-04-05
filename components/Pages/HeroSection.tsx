import Image from "next/image";
import React from "react";
import { heroSectionData } from "@/data/homeData";

const styles = {
  constelationStyle: `aspect-square rounded-full  border-[1px] border-transparent  absolute `,
  plaentStyle: `absolute w-[30px] aspect-square rounded-full  bg-black ml-[-15px] p-1 object-contain shadow-lg shadow-black/50`,
};

const HeroSection = () => {
  return (
    <div className=" w-full max-w-full min-h-[100vh] h-full flex justify-center items-center overflow-hidden relative pattern">
      <div className="w-full  flex flex-col justify-center items-center relative z-[50]">
        <div className="w-full max-w-[85%] md:max-w-[70%]  flex justify-between flex-wrap items-center ">
          <div className="w-full md:w-[50%] flex flex-col gap-3 justify-start items-start">
            <h1 className="text-2xl md:text-5xl">{heroSectionData.title}</h1>
            <p>{heroSectionData.desc}</p>
            <button className="bg-black text-white px-3 py-2 rounded-lg">
              {heroSectionData.btn}
            </button>
          </div>
          <div className="w-full md:w-[50%] aspect-square flex justify-center items-center relative">
            <div
              className={`w-[100%] ${styles.constelationStyle}  top-0 left-0 animate-spinning1 border-l-black border-b-black border-r-0`}
            >
              <Image
                src={"/assets/tech-icons/Typescript_logo.png"}
                width={30}
                height={30}
                alt=""
                className={`${styles.plaentStyle} left-[15%] bottom-[82%]  mt-[-15px] animate-antiSpinning1 `}
              />
            </div>
            <div
              className={`w-[82%] ${styles.constelationStyle} top-[9%] left-[9%] animate-spinning2 border-t-black border-r-black border-b-0`}
            >
              <Image
                src={"/assets/tech-icons/React.svg"}
                width={30}
                height={30}
                alt=""
                className={`${styles.plaentStyle} left-[15%] top-[14%]  mt-[-15px] animate-antiSpinning2`}
              />
            </div>
            <div
              className={`w-[65%]  ${styles.constelationStyle}  top-[17.5%] left-[17.5%] animate-spinning3 border-r-black border-t-black border-l-0`}
            >
              <Image
                src={"/assets/tech-icons/nextjs_logo.png"}
                width={30}
                height={30}
                alt=""
                className={`${styles.plaentStyle} left-[85%] bottom-[14%]  mb-[-15px] animate-antiSpinning3`}
              />
            </div>
            <div
              className={`w-[50%]  ${styles.constelationStyle}  top-[25%] left-[25%] animate-spinning2 border-b-black border-l-black border-t-0`}
            >
              <Image
                src={"/assets/tech-icons/tailwindcss_logo.png"}
                width={30}
                height={30}
                alt=""
                className={`${styles.plaentStyle} left-[85%] bottom-[14%]  mb-[-15px] animate-antiSpinning2`}
              />
            </div>
            <Image
              src={"/assets/cristian-albu.png"}
              width={500}
              height={500}
              alt="Cristian Albu"
              className="w-[35%] aspect-square rounded-full object-cover bg-black shadow-[40px_40px_80px_-10px_rgba(0,0,0,0.4)]  "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
