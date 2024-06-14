import React, { useState } from "react";
import Avatar from "./Avatar";

const EditUserDetails = ({ setEditUser, userInfo }) => {
  const [data, setData] = useState({
    name: userInfo?.name,
    profile_pic: userInfo?.profile_pic,
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    let newData = { ...data };
    newData[name] = value;
    setData(newData);
  };
  console.log(data)
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-5 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile details</h2>
        <h2 className="text-sm">Edit User Details</h2>
        <h2 onClick={() => setEditUser(false)}>Close</h2>
        <form className="grid gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={(e) => handleOnchange(e)}
              className="w-full py-1 px-2 focus:outline-primary border-0.5"
            ></input>
          </div>
          <div>
            <label htmlFor="profile_pic">Photo</label>
            <div className="my-1 flex items-center gap-4">
                <Avatar userInfo={userInfo}></Avatar>
                <div className="font-semibold">Change Photo</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
