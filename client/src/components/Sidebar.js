import React, { useContext, useState } from "react";
import { MdOutlineChat } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedInUser, logout } from "../redux/userSlice";
import Avatar from "./Avatar";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";
import { SocketContext } from "../redux/contextStore";

const Sidebar = () => {
  const [selected, setSelected] = useState("chat");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(loggedInUser);
  const {setSocket} = useContext(SocketContext)
  
  const [editUser, setEditUser] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  
  const handleLogout = () => {
    dispatch(logout());
    setSocket(null);
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
            onClick={() => {
              setSelected("chat");
              setOpenSearchUser(false);
            }}
          >
            <MdOutlineChat size={25} />
          </div>
          <div
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
              selected === "user" && "bg-slate-200"
            }`}
            title="Add Friend"
            onClick={() => {
              setSelected("user");
              setOpenSearchUser(!openSearchUser);
            }}
          >
            <FaUserPlus size={25} />
          </div>
        </div>
        <div>
          <div
            title={userInfo?.name}
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded p-2`}
            onClick={() => setEditUser(!editUser)}
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
          <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 ? (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start conversation
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {editUser && (
        <EditUserDetails setEditUser={setEditUser} userInfo={userInfo} />
      )}
      {openSearchUser && <SearchUser setOpenSearchUser={setOpenSearchUser} />}
    </div>
  );
};

export default Sidebar;
