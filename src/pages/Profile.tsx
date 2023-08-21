import { useEffect, useState } from "react";
import Icon from "../components/Common/Icon";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useParams } from "react-router-dom";
import { Tweet, User } from "../model/models";
import { visitUserProfile } from "../api/UserApi";
import { AxiosError } from "axios";
import {
  getBookmarkedTweetsByUserId,
  getTweetsByUserId,
} from "../api/TweetApi";
import TweetCard from "../components/Cards/TweetCard";
import PrimaryButton from "../components/Common/PrimaryButton";
import { TweetType } from "../redux/reducers/tweetReducer";
import {
  getBookmarkedTweets,
  getWroteTweets,
} from "../redux/actions/tweetAction";
import EditProfileForm from "../components/Forms/EditProfileForm";

type ActiveTab = {
  Tweets: boolean;
  Bookmarks: boolean;
};
const initialState: ActiveTab = {
  Tweets: false,
  Bookmarks: false,
};
const Profile = () => {
  const { user, wroteTweets, bookmarkedTweets } = useAppSelector((state) => ({
    user: state.auth.user,
    wroteTweets: state.tweet.wroteTweets,
    bookmarkedTweets: state.tweet.bookmarkedTweets,
  }));
  const dispatch = useAppDispatch();
  const { user_id } = useParams();
  const [profileUser, setProfileUser] = useState<User | null>();
  const [activeTab, setActiveTab] = useState<ActiveTab>({
    ...initialState,
    Tweets: true,
  });
  const [editProfilePopUp, setEditProfilePopUp] = useState(false);

  const findUserProfile = async (userId: string) => {
    const response = await visitUserProfile(userId);
    if (response instanceof AxiosError) {
      setProfileUser(null);
    }
    setProfileUser(response.data);
  };

  const findUserSavedTweetsAndWroteTweets = (userId: string) => {
    dispatch(getWroteTweets(userId));
    dispatch(getBookmarkedTweets(userId));
  };

  useEffect(() => {
    if (user_id) {
      findUserProfile(user_id);
      findUserSavedTweetsAndWroteTweets(user_id);
    } else {
      if (user) {
        setProfileUser(user);
        findUserSavedTweetsAndWroteTweets(user!.id);
      }
    }
  }, [user_id, user]);

  if (profileUser == null) {
    return (
      <div className="flex flex-col items-center justify-center h-full shadow">
        <p className="text-4xl font-bold mb-4">404</p>
        <p className="text-xl">User not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {editProfilePopUp && (
        <EditProfileForm
          onClose={() => setEditProfilePopUp(false)}
          user={user}
        />
      )}
      <div className="flex items-center gap-3">
        <Icon />
        <div>
          <h1 className="text-xl font-semibold">{profileUser?.username}</h1>
          <p className="text-gray-500">@{profileUser?.id}</p>
        </div>
        {user_id ? (
          <PrimaryButton action={() => {}} text={"Follow"} />
        ) : (
          <PrimaryButton
            action={() => {
              setEditProfilePopUp(true);
            }}
            text={"Edit Profile"}
          />
        )}
      </div>

      <p className="mt-4">
        {profileUser?.bio || "Update your profile for bio"}
      </p>
      <div className="text-base ">
        Joined at {profileUser?.createdAt.toLocaleString()}
      </div>
      <div className="mt-4">
        <span className="mr-4">
          <span className="font-semibold">120 </span>
          <span className="font-light">Followings</span>
        </span>
        <span className="mr-4">
          <span className="font-semibold">120 </span>
          <span className="font-light">Followers</span>
        </span>
      </div>
      <div className="my-4 flex items-start hover:cursor-pointer border-b-2 relative">
        <div
          className={`
          ${
            activeTab.Tweets &&
            "translate-x-0 w-[70px] transform transition-transform"
          } 
          ${
            activeTab.Bookmarks &&
            "translate-x-[80px] w-[100px] transform transition-transform"
          } 
          absolute top-[25px]  border-b-2  border-sky-500`}
        ></div>
        <div
          className={`${activeTab.Tweets && "text-sky-500"} w-[70px] mr-[10px]`}
          onClick={() => setActiveTab({ ...initialState, Tweets: true })}
        >
          Tweets
        </div>
        <div
          className={`${activeTab.Bookmarks && "text-sky-500"} w-[100px]`}
          onClick={() => setActiveTab({ ...initialState, Bookmarks: true })}
        >
          Bookmarked
        </div>
      </div>
      {/* my posts */}
      <div>
        <div>
          {activeTab.Tweets &&
            wroteTweets?.map((tweet, idx) => {
              return (
                <TweetCard
                  tweet={tweet}
                  key={idx}
                  tweetType={TweetType.ProfileWroteTweet}
                />
              );
            })}
          {activeTab.Bookmarks &&
            bookmarkedTweets?.map((tweet, idx) => {
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

export default Profile;
