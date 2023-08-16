import { useEffect, useState } from "react";
import Icon from "../components/Common/Icon";
import { useAppSelector } from "../redux/store";
import { useLocation, useParams } from "react-router-dom";
import { User } from "../model/models";
import { visitUserProfile } from "../api/UserApi";
import { AxiosError } from "axios";

type ActiveTab = {
  Tweets: boolean;
  Bookmarks: boolean;
};
const initialState: ActiveTab = {
  Tweets: false,
  Bookmarks: false,
};
const Profile = () => {
  const { user } = useAppSelector((state) => ({ user: state.auth.user }));

  const { user_id } = useParams();
  const [profileUser, setProfileUser] = useState<User | null>();
  const [activeTab, setActiveTab] = useState<ActiveTab>({
    ...initialState,
    Tweets: true,
  });
  const findUserProfile = async (userId: String) => {
    const response = await visitUserProfile(userId);
    console.log(response);
    return response;
  };
  useEffect(() => {
    if (user_id) {
      const response = findUserProfile(user_id);
      if (response instanceof AxiosError) {
        setProfileUser(null);
      }
    } else {
      setProfileUser(user);
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
      <div className="flex items-center gap-3">
        <Icon />
        <div>
          <h1 className="text-xl font-semibold">{profileUser?.username}</h1>
          <p className="text-gray-500">@{profileUser?.id}</p>
        </div>
        <button className="mt-4 bg-sky-500 text-white px-4 py-2 rounded">
          Follow
        </button>
      </div>

      <p className="mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
        ultricies magna. Vivamus luctus varius nunc, ac dignissim orci
        vestibulum id. Phasellus eget lacus velit.
      </p>
      <div className="text-base font-light">Joined at {}</div>
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
    </div>
  );
};

export default Profile;
