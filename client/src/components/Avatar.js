import React from "react";
import { FaCircleUser } from "react-icons/fa6";

const Avatar = ({ userInfo }) => {
  return (
    <div>
      {userInfo?.profile_pic ? (
        <img className="rounded-full" src={userInfo.profile_pic} alt="profile_pic" height={120} width={120}></img>
      ) : (
        <div className="w-fit mx-auto mb-2">
          <FaCircleUser size={80} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
