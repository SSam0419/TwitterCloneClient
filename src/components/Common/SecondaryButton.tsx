import { FC } from "react";

type SecondayButtonProps = {
  text: string;
  action: Function;
};

const SecondayButton: FC<SecondayButtonProps> = ({ text, action }) => {
  return (
    <button
      className="px-[5px] py-[8px] w-[120px] rounded-[25px] text-black font-semibold text-base bg-white border border-black"
      onClick={() => action}
    >
      {text}
    </button>
  );
};

export default SecondayButton;
