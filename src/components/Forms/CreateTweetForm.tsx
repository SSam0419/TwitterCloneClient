import { ChangeEvent, useEffect, useRef, useState } from "react";
import { borderColor } from "../../constant/Colors";
import { useAppDispatch } from "../../redux/store";
import { Tweet } from "../../model/models";
import { addTweet } from "../../redux/actions/tweetAction";
import Icon from "../Common/Icon";

const CreateTweetForm = () => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: Tweet = {
      tweetId: "",
      title: "",
      updatedAt: new Date(Date.now()),
      createdAt: new Date(Date.now()),
      content: inputText,
    };
    await dispatch(addTweet(data));
    setInputText("");
  };
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };
  return (
    <div className={`flex flex-col border-t border-b ${borderColor}`}>
      <div className={`border-b flex gap-3 py-5 px-3 ${borderColor}`}>
        <div className=" ">
          <Icon />
        </div>
        <div>
          <form className="w-11/12" onSubmit={handleSubmit}>
            <textarea
              ref={textAreaRef}
              value={inputText}
              onChange={handleInputChange}
              placeholder="What is happening?"
              className={`w-full outline-none resize-none overflow-hidden`}
            ></textarea>
            <button>Button </button>
          </form>
          <div>toolbar</div>
        </div>
      </div>
    </div>
  );
};

export default CreateTweetForm;
