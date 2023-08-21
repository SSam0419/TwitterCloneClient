import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { useAppDispatch } from "../../redux/store";
import PrimaryButton from "../Common/PrimaryButton";
import GlobalPopUp from "../Common/GlobalPopUp";
import { User } from "../../model/models";
import Icon from "../Common/Icon";

type props = {
  user: User | null;
  onClose: Function;
};

const EditProfileForm = ({ user, onClose }: props) => {
  const dispatch = useAppDispatch();
  const [bioContent, setBioContent] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(resizeTextArea, [bioContent]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBioContent(event.target.value);
  };

  const handleSubmitComment = async () => {};

  return (
    <GlobalPopUp onClose={() => onClose()}>
      <div className="w-[500px] h-[500px] bg-white rounded-3xl relative p-[20px]">
        <button
          className="flex items-center justify-center absolute top-5 right-5 hover:rounded-full  hover:bg-gray-300 w-[30px] h-[30px]"
          onClick={() => onClose()}
        >
          <ImCross />
        </button>
        <form
          className="flex gap-5 flex-col items-start justify-around h-[450px] w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (bioContent.trim() !== "") {
              handleSubmitComment();
              onClose();
            }
          }}
        >
          <div className="flex items-center gap-3">
            <Icon />
            <label htmlFor="name">Name:</label>
            <input id="name" placeholder=""></input>
          </div>

          <div
            className={`${
              textAreaRef.current && textAreaRef.current.scrollHeight > 300
                ? "overflow-x-hidden overflow-y-auto"
                : ""
            } h-[300px] w-full `}
          >
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              ref={textAreaRef}
              value={bioContent}
              onChange={handleInputChange}
              placeholder="update your bio"
              className={`w-full h-[280px] outline-none resize-none text-black bg-gray-50 p-4`}
            ></textarea>
          </div>
          <PrimaryButton
            text={"Confirm"}
            action={() => {
              handleSubmitComment();
              onClose();
            }}
          />
        </form>
      </div>
    </GlobalPopUp>
  );
};

export default EditProfileForm;
