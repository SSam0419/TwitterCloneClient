import React from "react";
import Icon from "../components/Common/Icon";
import { useAppSelector } from "../redux/store";

const Profile = () => {
  const { user } = useAppSelector((state) => ({ user: state.auth.user }));

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-3">
        <Icon />
        <div>
          <h1 className="text-xl font-bold">{user?.username}</h1>
          <p className="text-gray-500">@{user?.id}</p>
        </div>
      </div>
      <p className="mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
        ultricies magna. Vivamus luctus varius nunc, ac dignissim orci
        vestibulum id. Phasellus eget lacus velit.
      </p>
      <div className="mt-4">
        <span className="mr-4">
          <strong>Followers:</strong> 1000
        </span>
        <span className="mr-4">
          <strong>Following:</strong> 500
        </span>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Follow
      </button>
    </div>
  );
};

export default Profile;
