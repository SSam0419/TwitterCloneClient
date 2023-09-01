import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { useAppDispatch } from "../../redux/store";
import PrimaryButton from "../Common/PrimaryButton";
import GlobalPopUp from "../Common/GlobalPopUp";
import { editTweet } from "../../redux/actions/tweetAction";
import { TweetType } from "../../redux/reducers/tweetReducer";

type props = {
  tweetId: string;
  tweetContent: string;
  onClose: Function;
  tweetType: TweetType;
};

const EditTweetForm = ({
  tweetId,
  tweetContent,
  onClose,
  tweetType,
}: props) => {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(resizeTextArea, [inputText]);
  useEffect(() => setInputText(tweetContent), []);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmitComment = async () => {
    dispatch(editTweet({ tweetContent: inputText, tweetId, tweetType }));
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
            if (inputText.trim() !== "") {
              handleSubmitComment();
              onClose();
            }
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
              placeholder="update your tweet"
              className={`w-full outline-none resize-none text-black`}
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

export default EditTweetForm;
