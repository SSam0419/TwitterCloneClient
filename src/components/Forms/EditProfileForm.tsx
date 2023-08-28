import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { useAppDispatch } from "../../redux/store";
import PrimaryButton from "../Common/PrimaryButton";
import GlobalPopUp from "../Common/GlobalPopUp";
import { User } from "../../model/models";
import Icon from "../Common/Icon";
import { updateUserProfile } from "../../redux/actions/authAction";
import { uploadImage } from "../../api/FileApi";

type props = {
  user: User | null;
  onClose: Function;
};

const EditProfileForm = ({ user, onClose }: props) => {
  const dispatch = useAppDispatch();
  const [bioContent, setBioContent] = useState<string>("");
  const [uploadedIcon, setUploadedIcon] = useState<File | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(resizeTextArea, [bioContent]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBioContent(event.target.value);
  };

  const handleUpdatedBio = async () => {
    if (user && bioContent.trim() !== "")
      dispatch(updateUserProfile({ userId: user!.id, bio: bioContent }));
  };
  const handleUploadImage = async () => {
    if (user && uploadedIcon) uploadImage(uploadedIcon);
  };

  return (
    <GlobalPopUp onClose={() => onClose()}>
      <div className="w-[500px] h-[500px] bg-white rounded-3xl relative p-[20px]">
        <button
          className="flex items-center justify-center absolute top-5 right-5 hover:rounded-full  hover:bg-gray-300 w-[30px] h-[30px]"
          onClick={() => onClose()}
        >
          <ImCross />
        </button>
        <form
          className="flex gap-5 flex-col items-start justify-around h-[450px] w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (bioContent.trim() !== "") {
              handleUpdatedBio();
              handleUploadImage();
              onClose();
            }
          }}
        >
          <div className="flex items-center justify-start gap-20 w-full">
            <Icon userId={user?.id || ""} />
            <div className=" w-7/12 ">
              <label htmlFor="uploadIcon">
                <div className="w-full border rounded border-gray-800 p-3 hover:cursor-pointer">
                  {uploadedIcon == null ? "Upload Icon" : uploadedIcon.name}
                </div>
                <input
                  id="uploadIcon"
                  type="file"
                  className="hidden"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files && event.target.files.length > 0) {
                      const file = event.target.files[0];
                      setUploadedIcon(file);
                    }
                  }}
                ></input>
              </label>
            </div>
          </div>

          <div
            className={`${
              textAreaRef.current && textAreaRef.current.scrollHeight > 300
                ? "overflow-x-hidden overflow-y-auto"
                : ""
            } h-[300px] w-full `}
          >
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              ref={textAreaRef}
              value={bioContent}
              onChange={handleInputChange}
              placeholder="update your bio"
              className={`w-full h-[280px] outline-none resize-none text-black bg-gray-50 p-4`}
            ></textarea>
          </div>
          <PrimaryButton
            text={"Confirm"}
            action={() => {
              handleUpdatedBio();
              handleUploadImage();
              onClose();
            }}
          />
        </form>
      </div>
    </GlobalPopUp>
  );
};

export default EditProfileForm;
