import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";

import { BsFillBookmarkFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BiSolidMessageRounded } from "react-icons/bi";
export type SideBarLink = {
  link: String;
  icon: IconType;
  name: String;
};

export const SideBarLinks: SideBarLink[] = [
  //Home Page display tweets from followed Users
  {
    link: "/",
    icon: FaHome,
    name: "Home",
  },
  //Bookmark Page display saved tweets
  {
    link: "/bookmarks",
    icon: BsFillBookmarkFill,
    name: "Bookmarks",
  },
  //My profile page display my profile and my tweets
  {
    link: "/sign_in",
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
