import { useAppSelector } from "../redux/store";
import TweetCard from "../components/Cards/TweetCard";
import { TweetType } from "../redux/reducers/tweetReducer";

const Bookmark = () => {
  const { user, bookmarkedTweets } = useAppSelector((state) => ({
    user: state.auth.user,
    bookmarkedTweets: state.tweet.bookmarkedTweets,
  }));

  if (user == null) {
    return (
      <div className="flex flex-col items-center justify-center h-full shadow">
        <p className="text-4xl font-bold mb-4">Login to view your Bookmark</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div>
        <div>
          {bookmarkedTweets?.map((tweet, idx) => {
            return (
              <TweetCard
                tweet={tweet}
                key={idx}
                tweetType={TweetType.ProfileBookmarkedTweet}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
