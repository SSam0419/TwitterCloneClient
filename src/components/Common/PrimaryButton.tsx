import React, { FC } from "react";

type PrimaryButtonProps = {
  text: string;
  action: Function;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, action }) => {
  return (
    <button
      className="px-[5px] py-[8px] w-[120px] rounded-[25px] text-white font-semibold text-base bg-sky-500"
      onClick={() => action}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
