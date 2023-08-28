import React from "react";
import { DOMAIN } from "../../constant/Url";

const Icon = ({ userId }: { userId: string }) => {
  const domain = DOMAIN + "api/File/image/";
  return (
    <div className="flex justify-center items-cente w-[45px] h-[45px] rounded-full bg-gray-400 border border-black overflow-hidden">
      <img src={`${domain}${userId}`} alt="" />
    </div>
  );
};

export default Icon;
