import TweetCard from "../components/Cards/TweetCard";
import CreateTweetForm from "../components/Forms/CreateTweetForm";
import { useEffect } from "react";
import { getAllTweets } from "../redux/actions/tweetAction";
import {  useAppSelector, useAppThunkDispatch } from "../redux/store";
 

const Home = () => {
  const dispatch = useAppThunkDispatch(); 
 
  const tweets = useAppSelector((state) => state.tweet.allTweets); 
  
  useEffect(() => {
    dispatch(getAllTweets()) 
  }, [dispatch]);

  return (
    <div className="">
      <div>Header</div> 
      <CreateTweetForm />

      <div>
        {tweets && tweets.map((tweet) => {
          return <TweetCard tweet={tweet} />;
        })}
      </div>
    </div>
  );
};

export default Home;
