import GlobalPopUp from "./Common/GlobalPopUp";
import { ImCross } from "react-icons/im";
import PrimaryButton from "./Common/PrimaryButton";
import SecondayButton from "./Common/SecondaryButton";
type props = {
  action: Function;
  onClose: Function;
  text: string;
};

const ConfirmPopUp = ({ text, action, onClose }: props) => {
  return (
    <GlobalPopUp onClose={() => onClose()}>
      <div className="w-[500px] h-[280px] bg-white rounded-3xl relative p-[20px]">
        <button
          className="flex items-center justify-center absolute top-5 right-5 hover:rounded-full  hover:bg-gray-300 w-[30px] h-[30px]"
          onClick={() => onClose()}
        >
          <ImCross />
        </button>
        <div className="h-[200px] flex items-center justify-center text-center">
          {text}
        </div>
        <div className="flex gap-3 justify-evenly align-bottom items-center">
          <PrimaryButton
            text={"Confirm"}
            action={() => {
              action();
              onClose();
            }}
          />
          <SecondayButton
            text={"Cancel"}
            action={() => {
              action();
              onClose();
            }}
          />
        </div>
      </div>
    </GlobalPopUp>
  );
};

export default ConfirmPopUp;
