import { FC } from "react";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { Tweet } from "../../model/models";
import Icon from "../Common/Icon";

type TweetCardProps = {
  tweet: Tweet;
};

const TweetCard: FC<TweetCardProps> = ({ tweet }) => {
  return (
    <div className="border-b flex gap-3 py-5 px-3 hover:bg-gray-200 cursor-pointer">
      {/* header (icon, user, title , time) */}
      {/* tweet content */}
      {/* footer (coment retweet likes view share) */}
      {/* viewing comment? */}
      {/* header */}
      <Icon />
      <div>
        <div className="flex  ">
          <div>
            <div className="flex gap-3">
              <div className="font-semibold">{tweet.author?.username}</div>
              <div className="font-light">
                @{tweet.author?.id.substring(0, 5)}
              </div>
              <div className="font-light">
                {new Date(tweet.createdAt)
                  .toLocaleDateString()
                  .substring(0, 10)}
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div className=" ">{tweet.content}</div>
        {/* footer */}
        <div className="flex gap-1 pt-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-blue-500">
            <FaRegComment />
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-blue-500">
            <FaRetweet />
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-blue-500">
            <AiOutlineHeart />
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-blue-500">
            <IoIosStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
