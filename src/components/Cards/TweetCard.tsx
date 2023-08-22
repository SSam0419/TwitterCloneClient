import { FC, useState } from "react";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { Tweet } from "../../model/models";
import Icon from "../Common/Icon";
import CreateCommentForm from "../Forms/CreateCommentForm";
import TweetCommentCard from "./TweetCommentCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { likeTweet, bookmarkTweet } from "../../redux/actions/tweetAction";
import TweetSettingButton from "../TweetSettingButton";
import { TweetType } from "../../redux/reducers/tweetReducer";

type TweetCardProps = {
  tweet: Tweet;
  tweetType: TweetType;
};

const TweetCard: FC<TweetCardProps> = ({ tweet, tweetType }) => {
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));
  const [showCommentForm, setShowCommentForm] = useState(false);
  const dispatch = useAppDispatch();
  const closeCommentForm = () => {
    setShowCommentForm((prev) => !prev);
  };

  return (
    <div className="border-b flex gap-3 py-5 px-3 hover:bg-gray-200 cursor-pointer relative">
      <div className="absolute top-1 right-0 mx-4">
        <TweetSettingButton
          tweetContent={tweet.content}
          tweetId={tweet.tweetId}
          tweetType={tweetType}
        />
      </div>
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
          <div
            className="flex gap-2 items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-sky-500"
            onClick={() => {
              if (user == null) {
                return;
              }
              dispatch(
                likeTweet({
                  tweetId: tweet.tweetId,
                  userId: user!.id,
                  tweetType,
                })
              );
            }}
          >
            {tweet.likes == null ? 0 : tweet.likes.length}

            {user == null ? (
              <AiOutlineHeart />
            ) : tweet.likes.some(({ userId }) => userId === user!.id) ? (
              <AiFillHeart />
            ) : (
              <AiOutlineHeart />
            )}
          </div>
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-sky-500"
            onClick={() => {
              if (user == null) {
                return;
              }
              dispatch(
                bookmarkTweet({
                  tweetId: tweet.tweetId,
                  userId: user!.id,
                  tweetType,
                })
              );
            }}
          >
            {tweet.tweetBookmarks?.length}
            {user == null ? (
              <BsFillBookmarkFill />
            ) : tweet.tweetBookmarks.some(
                ({ userId }) => userId === user!.id
              ) ? (
              <BsFillBookmarkFill />
            ) : (
              <BsBookmark />
            )}
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-400 text-sky-500">
            <IoIosStats />
          </div>
        </div>
        {/* show comments */}
        <div>
          {tweet.comments &&
            tweet.comments.length > 0 &&
            tweet.comments.map((comment, idx) => {
              return (
                <TweetCommentCard
                  comment={comment}
                  userId={user?.id}
                  tweetId={tweet.tweetId}
                  key={idx}
                  tweetType={tweetType}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
