import { FC } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import Icon from "../Common/Icon";
import { TweetComment } from "../../model/models";

type TweetCommentCardProps = {
  comment: TweetComment;
};

const TweetCommentCard: FC<TweetCommentCardProps> = ({ comment }) => {
  return (
    <div className="border-b flex gap-3 py-5 px-3 hover:bg-gray-200 cursor-pointer">
      <Icon />
      <div>
        <div className="flex  ">
          <div>
            <div className="flex gap-3">
              <div className="font-semibold">{comment.author?.username}</div>
              <div className="font-semibold text-neutral-500">
                @{comment.author?.id.substring(0, 5)}
              </div>
              <div className="font-semibold text-neutral-500">
                {new Date(comment.createdAt)
                  .toLocaleDateString()
                  .substring(0, 10)}
              </div>
            </div>
          </div>
        </div>

        <div>{comment.content}</div>

        <div className="flex gap-1 pt-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-sky-500">
            <AiOutlineHeart />
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-sky-500">
            <IoIosStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCommentCard;
