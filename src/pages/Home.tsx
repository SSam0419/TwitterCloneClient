import TweetCard from "../components/Cards/TweetCard";
import CreateTweetForm from "../components/Forms/CreateTweetForm";
import { useEffect } from "react";
import { getAllTweets } from "../redux/actions/tweetAction";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Home = () => {
  const dispatch = useAppDispatch();
  const tweets = useAppSelector((state) => state.allTweets);
  const loading = useAppSelector((state) => state.loading);
  useEffect(() => {
    dispatch(getAllTweets()).catch((error) => {
      console.log(error);
    });
  }, [dispatch]);
  return (
    <div className="">
      <div>Header</div>
      <div>{loading ?? "tweets[0]?.tweetId"}</div>
      <CreateTweetForm />

      <div>
        {tweets?.map((tweet) => {
          return <TweetCard tweet={tweet} />;
        })}
      </div>
    </div>
  );
};

export default Home;
