import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useRef } from "react";
import EditTweetForm from "./Forms/EditTweetForm";
import { TweetType } from "../redux/reducers/tweetReducer";
import ConfirmPopUp from "./ConfirmPopUp";
import { useAppDispatch } from "../redux/store";
import { deleteTweet } from "../redux/actions/tweetAction";

type props = {
  tweetId: string;
  tweetContent: string;
  tweetType: TweetType;
};

const TweetSettingButton = ({ tweetId, tweetContent, tweetType }: props) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [openEditTweetForm, setOpenEditTweetForm] = useState(false);
  const [openDeleteTweetConfirmation, setOpenDeleteTweetConfirmation] =
    useState(false);

  const settingMenu = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeOpenMenus = (e: MouseEvent) => {
    if (
      settingMenu.current &&
      isOpen &&
      !settingMenu.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => closeOpenMenus(e));

    () => {
      return document.removeEventListener("mousedown", (e) =>
        closeOpenMenus(e)
      );
    };
  }, [settingMenu, isOpen]);

  return (
    <div className="relative inline-block text-left" ref={settingMenu}>
      <button
        type="button"
        className="text-black focus:ring-4 focus:outline-none focus:ring-blue-300 
        font-medium rounded-full h-[20] w-[20]  text-sm px-5 py-2.5 text-center inline-flex 
        items-center hover:bg"
        onClick={toggleDropdown}
      >
        <BsThreeDots />
      </button>
      {openEditTweetForm && (
        <EditTweetForm
          onClose={() => setOpenEditTweetForm(false)}
          tweetContent={tweetContent}
          tweetId={tweetId}
          tweetType={tweetType}
        />
      )}
      {openDeleteTweetConfirmation && (
        <ConfirmPopUp
          text="Are you sure to delete this tweet? You cannot recover it"
          action={() => {
            setOpenDeleteTweetConfirmation(false);
            dispatch(deleteTweet({ tweetId, tweetType }));
          }}
          onClose={() => setOpenDeleteTweetConfirmation(false)}
        />
      )}
      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-44 rounded-lg shadow bg-white divide-y divide-gray-100 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setOpenEditTweetForm(true);
                setIsOpen(false);
              }}
            >
              Edit
            </li>
            <li
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setOpenDeleteTweetConfirmation(true);
                setIsOpen(false);
              }}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TweetSettingButton;
