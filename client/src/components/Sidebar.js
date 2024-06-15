import React, { useState } from "react";
import { MdOutlineChat } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedInUser, logout } from "../redux/userSlice";
import Avatar from "./Avatar";
import EditUserDetails from "./EditUserDetails";

const Sidebar = () => {
  const [selected, setSelected] = useState("chat");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(loggedInUser);

  const [editUser, setEditUser] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/email");
  };
  return (
    <div className="h-full w-full grid grid-cols-[48px,1fr]">
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
          <div
            title={userInfo?.name}
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded p-2`}
            onClick={()=>setEditUser(!editUser)}
          >
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
      <div className="w-full">
        <div className="h-16 flex items-center justify-center">
          <h2 className="text-xl font-bold p-4 text-slate-800">
            Message
          </h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar"></div>

      </div>
      {editUser && <EditUserDetails setEditUser={setEditUser} userInfo={userInfo}/>}
    </div>
  );
};

export default Sidebar;
