import {
  HiOutlineHome,
  HiOutlineDesktopComputer,
  HiOutlinePresentationChartBar,
  HiOutlineMailOpen,
} from "react-icons/hi";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillInstagram,
  AiOutlineUser,
} from "react-icons/ai";
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
  { title: "About me", link: "/about", icon: <AiOutlineUser /> },
  { title: "Contact", link: "/contact", icon: <HiOutlineMailOpen /> },
];

export const footerData: NavData[] = [
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/cristian-albu-3b7026167/",
    icon: <AiFillLinkedin />,
  },
  {
    title: "GitHub",
    link: "https://github.com/cristian-albu",
    icon: <AiFillGithub />,
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/cristian_albu_kdz",
    icon: <AiFillInstagram />,
  },
];

export const contactData: NavData[] = [
  {
    title: "Email",
    link: "albucristian95p@gmail.com",
    icon: <MdAlternateEmail />,
  },
  {
    title: "Telegram",
    link: "https://t.me/cristianAlbu",
    icon: <FaTelegramPlane />,
  },
  {
    title: "WhatsApp",
    link: "https://wa.me/40734315636",
    icon: <FaWhatsapp />,
  },
];
