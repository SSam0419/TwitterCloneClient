import { ChangeEvent, useEffect, useRef, useState } from "react";
import { borderColor } from "../../constant/Colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addTweet } from "../../redux/actions/tweetAction";
import Icon from "../Common/Icon";
import PrimaryButton from "../Common/PrimaryButton";

const CreateTweetForm = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));

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
    if (inputText.trim() !== "") {
      await dispatch(addTweet(inputText));
      setInputText("");
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };
  return (
    <div className={`flex flex-col border-t ${borderColor}`}>
      <div className={`border-b flex gap-3 py-5 px-3 ${borderColor}`}>
        <div className=" ">
          <Icon userId={`${user?.id}`} />
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
            <PrimaryButton action={handleSubmit} text={"Tweet"} />
          </form>
          {/* <div>toolbar</div> */}
        </div>
      </div>
    </div>
  );
};

export default CreateTweetForm;
