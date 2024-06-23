import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { onLineUser } from "../redux/userSlice";

const Avatar = ({ userInfo }) => {
  const onlineUser = useSelector(onLineUser)

  const isOnLine = onlineUser.includes(userInfo?._id)
  return (
    <div className="w-fit mx-auto mb-2 relative">
      {userInfo?.profile_pic ? (
        <img className="rounded-full" src={userInfo.profile_pic} alt="profile_pic" height={50} width={50}></img>
      ) : (
        <div className="w-fit mx-auto mb-2">
          <FaCircleUser size={80} />
        </div>
      )}
      {(isOnLine && <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full"></div>) ||(userInfo?.online && <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full"></div>) }
    </div>
  );
};

export default Avatar;
