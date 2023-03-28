import {
  HiOutlineHome,
  HiOutlineDesktopComputer,
  HiOutlinePresentationChartBar,
  HiOutlineMailOpen,
} from "react-icons/hi";

import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";

import { MdAlternateEmail } from "react-icons/md";

import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export interface NavData {
  title: string;
  link: string;
  icon?: JSX.Element;
}

export const navData: NavData[] = [
  { title: "Home", link: "/", icon: <HiOutlineHome /> },
  { title: "Projects", link: "/projects", icon: <HiOutlineDesktopComputer /> },
  {
    title: "Experience",
    link: "/experience",
    icon: <HiOutlinePresentationChartBar />,
  },
  { title: "Contact", link: "/contact", icon: <HiOutlineMailOpen /> },
];

export const footerData: NavData[] = [
  { title: "LinkedIn", link: "", icon: <AiFillLinkedin /> },
  { title: "GitHub", link: "", icon: <AiFillGithub /> },
  { title: "Instagram", link: "", icon: <AiFillInstagram /> },
];

export const contactData: NavData[] = [
  {
    title: "Email",
    link: "albucristian95p@gmail.com",
    icon: <MdAlternateEmail />,
  },
  {
    title: "Telegram",
    link: "albucristian95p@gmail.com",
    icon: <FaTelegramPlane />,
  },
  {
    title: "WhatsApp",
    link: "albucristian95p@gmail.com",
    icon: <FaWhatsapp />,
  },
];
