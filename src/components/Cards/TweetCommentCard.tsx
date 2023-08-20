import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import Icon from "../Common/Icon";
import { TweetComment } from "../../model/models";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { likeComment } from "../../redux/actions/tweetAction";
import { TweetType } from "../../redux/reducers/tweetReducer";

type TweetCommentCardProps = {
  comment: TweetComment;
  userId: string | undefined;
  tweetId: string;
  tweetType: TweetType;
};

const TweetCommentCard: FC<TweetCommentCardProps> = ({
  tweetId,
  comment,
  userId,
  tweetType,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));
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
            onClick={() => {
              if (userId) {
                dispatch(
                  likeComment({
                    userId: userId,
                    commentId: comment.id,
                    tweetId: tweetId,
                    tweetType,
                  })
                );
              }
            }}
          >
            {comment.likes && comment.likes.length}
            {user == null ? (
              <AiOutlineHeart />
            ) : comment.likes.some(({ userId }) => userId === user!.id) ? (
              <AiFillHeart />
            ) : (
              <AiOutlineHeart />
            )}
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
