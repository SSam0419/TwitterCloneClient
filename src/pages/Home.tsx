import TweetCard from "../components/Cards/TweetCard";
import CreateTweetForm from "../components/Forms/CreateTweetForm";
import { useEffect } from "react";
import { getAllTweets } from "../redux/actions/tweetAction";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Home = () => {
  const dispatch = useAppDispatch();
  const tweets = useAppSelector((state) => state.tweet.allTweets);
  useEffect(() => {
    dispatch(getAllTweets());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllTweets());
  }, []);

  return (
    <div className="">
      <div className="p-4 font-semibold">Home</div>
      <CreateTweetForm />
      <div>
        {tweets?.map((tweet, idx) => {
          return <TweetCard tweet={tweet} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default Home;
