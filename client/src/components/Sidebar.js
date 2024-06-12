import React, { useState } from "react";
import { MdOutlineChat } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedInUser, logout } from "../redux/userSlice";
import Avatar from "./Avatar";

const Sidebar = () => {
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(loggedInUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/email");
  };
  return (
    <div className="h-full w-full">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between">
        <div>
          <div
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
              selected === "chat" && "bg-slate-200"
            }`}
            title="chat"
            onClick={() => setSelected("chat")}
          >
            <MdOutlineChat size={25} />
          </div>
          <div
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
              selected === "user" && "bg-slate-200"
            }`}
            title="Add Friend"
            onClick={() => setSelected("user")}
          >
            <FaUserPlus size={25} />
          </div>
        </div>
        <div>
          <div title={userInfo?.name} className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded p-2`}>
            <Avatar userInfo={userInfo}></Avatar>
          </div>
          <div
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded `}
            title="logout"
            onClick={() => handleLogout()}
          >
            <HiOutlineLogout size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
