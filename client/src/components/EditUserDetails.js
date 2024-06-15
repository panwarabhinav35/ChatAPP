import React, { useState } from "react";
import Avatar from "./Avatar";
import { uploadFile } from "../helper/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { loggedInToken, setUser } from "../redux/userSlice";

const EditUserDetails = ({ setEditUser, userInfo }) => {
  const userToken = useSelector(loggedInToken);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    token: userToken,
    name: userInfo?.name,
    profile_pic: userInfo?.profile_pic,
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    let newData = { ...data };
    newData[name] = value;
    setData(newData);
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    let newData = { ...data };
    newData.profile_pic = uploadPhoto.url;
    setData(newData);
    e.target.value = "";
  };

  const saveUpdate = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/update-user`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      const responseData = await response.json();
      dispatch(setUser(responseData.data));
      setEditUser(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-5 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile details</h2>
        <h2 className="text-sm">Edit User Details</h2>
        <form className="grid gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={(e) => handleOnchange(e)}
              className="w-full py-1 px-2 border-primary border focus:outline-primary border-0.5"
            ></input>
          </div>
          <div>
            <div className="my-1 flex items-center gap-4">
              <label htmlFor="profile_pic">
                Photo
                <Avatar userInfo={data}></Avatar>
                <div className="font-semibold cursor-pointer">Change Photo</div>
              </label>
              <input
                id="profile_pic"
                type="file"
                className="hidden"
                onChange={(e) => handleUploadPhoto(e)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div
              className="border-primary border text-primary px-4 py-1 rounded cursor-pointer"
              onClick={() => setEditUser(false)}
            >
              Cancel
            </div>
            <div
              className="border-primary border bg-primary text-white px-4 py-1 rounded cursor-pointer"
              onClick={() => saveUpdate()}
            >
              Save
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
