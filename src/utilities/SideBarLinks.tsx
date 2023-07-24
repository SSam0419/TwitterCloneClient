import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BiSolidMessageRounded } from "react-icons/bi";
export type SideBarLink = {
  link: string;
  icon: IconType;
  name: string;
};

export const SideBarLinks: SideBarLink[] = [
  //Home Page display tweets from followed Users
  {
    link: "/",
    icon: FaHome,
    name: "Home",
  },
  //Explore Page display tre
  {
    icon: AiOutlineSearch,
    link: "/explore",
    name: "Explore",
  },
  //Bookmark Page display saved tweets
  {
    link: "/bookmarks",
    icon: BsFillBookmarkFill,
    name: "Bookmarks",
  },
  //My profile page display my profile and my tweets
  {
    link: "/my_profile",
    icon: CgProfile,
    name: "Profile",
  },
  //display message
  {
    link: "/message",
    icon: BiSolidMessageRounded,
    name: "Message",
  },
];
