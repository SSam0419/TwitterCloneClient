import { FC, useEffect, useState } from "react";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { Tweet } from "../../model/models";
import Icon from "../Common/Icon";
import CreateCommentForm from "../Forms/CreateCommentForm";
import GlobalPopUp from "../Common/GlobalPopUp";
import TweetCommentCard from "./TweetCommentCard";

type TweetCardProps = {
  tweet: Tweet;
};

const TweetCard: FC<TweetCardProps> = ({ tweet }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const closeCommentForm = () => {
    setShowCommentForm((prev) => !prev);
  };

  return (
    <div className="border-b flex gap-3 py-5 px-3 hover:bg-gray-200 cursor-pointer">
      <Icon />
      <div>
        <div className="flex  ">
          <div>
            <div className="flex gap-3">
              <div className="font-semibold">{tweet.author?.username}</div>
              <div className="font-semibold text-neutral-500">
                @{tweet.author?.id.substring(0, 5)}
              </div>
              <div className="font-semibold text-neutral-500">
                {new Date(tweet.createdAt)
                  .toLocaleDateString()
                  .substring(0, 10)}
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div>{tweet.content}</div>
        {/* footer */}
        <div className="flex gap-1 pt-5">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-sky-500"
            onClick={() => {
              setShowCommentForm(true);
            }}
          >
            <FaRegComment />
          </div>
          {showCommentForm && (
            <CreateCommentForm
              onClose={closeCommentForm}
              tweetId={tweet.tweetId}
            />
          )}
          <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-sky-500">
            <FaRetweet />
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-sky-500">
            <AiOutlineHeart />
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-sky-500">
            <IoIosStats />
          </div>
        </div>
        {/* show comments */}
        <div>
          {tweet.comments?.map((comment, idx) => {
            return <TweetCommentCard comment={comment} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
