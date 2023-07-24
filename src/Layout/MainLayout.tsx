import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { borderColor } from "../constant/Colors";

const MainLayout = () => {
  return (
    <div className="flex md:px-40 justify-center">
      <SideBar />
      <div className={`md:w-[600px] py-5 border-r ${borderColor}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
