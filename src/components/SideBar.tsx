import { NavLink, useNavigate, useNavigation } from "react-router-dom";

import { SideBarLink, SideBarLinks } from "../utilities/SideBarLinks";
import ProfileCard from "./Cards/ProfileCard";
import { borderColor } from "../constant/Colors";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logoutUser } from "../redux/actions/authAction";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const linkStyles = "flex items-center py-4 px-4 hover:bg-gray-200 gap-2 ";
  const user = useAppSelector((state) => state.auth.user);
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

      {user !== null ? (
        <div
          className={`flex items-center py-4 px-4 gap-2 hover:bg-gray-200 hover:cursor-pointer`}
          onClick={() => {
            if (user) dispatch(logoutUser(user.id));
          }}
        >
          <BiLogOut className="w-5 h-5" />
          Log Out
          {/* <ProfileCard /> */}
        </div>
      ) : (
        <div
          className={`flex items-center py-4 px-4 gap-2 hover:bg-gray-200 hover:cursor-pointer`}
          onClick={() => {
            navigate("/sign_in");
          }}
        >
          <BiLogIn className="w-5 h-5" />
          Log In
          {/* <ProfileCard /> */}
        </div>
      )}
    </div>
  );
};

export default SideBar;
