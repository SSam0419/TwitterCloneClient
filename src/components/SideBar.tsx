import { NavLink } from "react-router-dom";

import { SideBarLink, SideBarLinks } from "../utilities/SideBarLinks";
import ProfileCard from "./Cards/ProfileCard";
import { borderColor } from "../constant/Colors";
const SideBar = () => {
  const linkStyles =
    "flex items-center py-4 px-4 text-gray-500 hover:bg-gray-200 gap-2 ";

  return (
    <div
      className={`flex flex-col justify-between items-center border-r ${borderColor} p-2 sticky top-0 h-screen`}
    >
      <div className="flex flex-col justify-center ">
        {SideBarLinks.map((link: SideBarLink) => {
          return (
            <div>
              <NavLink to={link.link} className={linkStyles} key={link.name}>
                <link.icon className="w-5 h-5" />
                <span className="hidden md:block">{link.name}</span>
              </NavLink>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <ProfileCard />
      </div>
    </div>
  );
};

export default SideBar;
