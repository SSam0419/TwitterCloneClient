import { FC } from "react";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { Tweet } from "../../model/models";

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
      <div>ICON</div>
      <div>
        <div className="flex gap-3">
          <div>
            <div className="flex gap-3 font-bold">
              <div>{tweet.author.username}</div>
              <div>{tweet.author.id}</div>
              <div>{tweet.createdAt.toISOString().substring(0, 10)}</div>
            </div>
            <div className="text-gray-900">{tweet.title}</div>
          </div>
        </div>
        {/* content */}
        <div className="py-5">{tweet.content}</div>
        {/* footer */}
        <div className="flex gap-3">
          <div>
            <FaRegComment />
          </div>
          <div>
            <FaRetweet />
          </div>
          <div>
            <AiOutlineHeart />
          </div>
          <div>
            <IoIosStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
