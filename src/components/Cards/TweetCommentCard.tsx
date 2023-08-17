import { FC } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import Icon from "../Common/Icon";
import { TweetComment } from "../../model/models";
import { useAppDispatch } from "../../redux/store";
import { likeComment } from "../../redux/actions/tweetAction";

type TweetCommentCardProps = {
  comment: TweetComment;
  tweetId: String;
};

const TweetCommentCard: FC<TweetCommentCardProps> = ({ comment, tweetId }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="border-t flex gap-3 py-5 px-3 hover:bg-gray-200 cursor-pointer">
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
          <div
            className="flex gap-1 items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-sky-500"
            onClick={() => dispatch(likeComment(comment.id))}
          >
            {comment.likes && comment.likes.length}
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
