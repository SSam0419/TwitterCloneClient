import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import GlobalPopUp from "../Common/GlobalPopUp";
import { ImCross } from "react-icons/im";
import { useAppDispatch } from "../../redux/store";
import { addComment } from "../../redux/actions/tweetAction";

type props = {
  tweetId: String;
  onClose: Function;
};

const CreateCommentForm = ({ onClose, tweetId }: props) => {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(resizeTextArea, [inputText]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmitComment = async () => {
    dispatch(addComment({ content: inputText, tweetId: tweetId }));
  };

  return (
    <GlobalPopUp onClose={() => onClose()}>
      <div className="w-[500px] h-[280px] bg-white rounded-3xl relative p-[20px]">
        <button
          className="flex items-center justify-center absolute top-5 right-5 hover:rounded-full  hover:bg-gray-300 w-[30px] h-[30px]"
          onClick={() => onClose()}
        >
          <ImCross />
        </button>
        <form
          className="flex flex-col items-start justify-around h-[230px] w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitComment();
            onClose();
          }}
        >
          <div
            className={`${
              textAreaRef.current && textAreaRef.current.scrollHeight > 150
                ? "overflow-x-hidden overflow-y-auto"
                : ""
            } h-[150px] w-full`}
          >
            <textarea
              ref={textAreaRef}
              value={inputText}
              onChange={handleInputChange}
              placeholder="write your comment"
              className={`w-full outline-none resize-none text-black`}
            ></textarea>
          </div>
          <button
            className="p-[10px] w-[150px] rounded-[25px] text-white font-semibold text-base bg-sky-500"
            type="submit"
          >
            Confirm
          </button>
        </form>
      </div>
    </GlobalPopUp>
  );
};

export default CreateCommentForm;
